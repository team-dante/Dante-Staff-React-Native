import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { PieChart } from 'react-native-svg-charts';
import firebase from 'firebase';
import { Text as SvgText } from 'react-native-svg';

// Draw each room label; simplify code
const RoomLabels = ({room, color}) => {
    return (
        <View style={[styles.labelCard, {borderLeftColor: color}]}>
            <Text style={styles.roomLabel}>{room}</Text>
        </View>  
    );
}

// Charts is an extension of VisitHistory.js; if segmentedControl index = 1, then render this component
class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {graphData: []}
        // waiting room, treatment room 1
        this.colors = ['#B8E653', '#53ACE6', '#E653B8', '#E68153', '#536FE6'];
    }

    componentWillMount() {
        var self = this;
        firebase.database().ref(`/PatientVisitsByDates`).once('value', function(snapshot) {
            self.setState({graphData: self.convertToGraphList(snapshot.val())});
        });
    }

    // for prove of principle, assume patients only go to waiting room and treatment room 1
    convertToGraphList(data) {

        let wr_cnt = 0;
        let wr_all = 0;
        let tr1_cnt = 0;
        let tr1_all = 0;
        let ct_cnt = 0;
        let ct_all = 0;

        for (d in data) {
            for (i in data[d]) {
                for (j in data[d][i]) {
                    if (j == 'Waiting Room') {
                        wr_cnt += 1
                        wr_all += data[d][i][j]["diffTime"]
                    }
                    else if (j == 'Treatment Room 1') {
                        tr1_cnt += 1
                        tr1_all += data[d][i][j]["diffTime"]
                    }
                    else if (j == 'CT Room') {
                        ct_cnt += 1
                        ct_all += data[d][i][j]["diffTime"]
                    }
                }
            }
        }
        
        let wr_avg = wr_all / wr_cnt;
        let tr1_avg = tr1_all / tr1_cnt;
        let ct_avg = ct_all / ct_cnt;

        let overal_avg = wr_avg + tr1_avg + ct_avg;
        return [(wr_avg/overal_avg*100).toFixed(2), (tr1_avg/overal_avg*100).toFixed(2), (ct_avg/overal_avg*100).toFixed(2)];
    }

    drawGraph(data_points) {
        // API from pieChart example of react-native-svg-charts to draw labels
        const Labels = ({ slices }) => {
            return slices.map((slice, index) => {
                const { pieCentroid } = slice;
                return (
                    <SvgText
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'white'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={18}
                    >
                        {data_points[index]}
                    </SvgText>
                )
            })
        }

        // map the data to graph
        const pieData = data_points
            .filter(value => value > 0)
            .map((value, index) => ({
                value,
                svg: {
                    fill: this.colors[index], // get the corresponding color from history
                    onPress: () => console.log('press', index),
                },
                key: `pie-${index}`,
            }))

        return (
            <PieChart
                style={ { height: 300 } }
                data={ pieData }
            >
            <Labels />
            </PieChart>
        );
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.text}>Across all patients, they have spent... %</Text>
                    {this.drawGraph(this.state.graphData)}
                </View>
                <View style={styles.labelRow}>
                    <View style={styles.labelColumn}>
                        <RoomLabels room={'Waiting Rm'} color={'#B8E653'}/>
                        <RoomLabels room={'Treatment Rm 1'} color={'#53ACE6'}/>
                        <RoomLabels room={'Treatment Rm 2'} color={'#E653B8'}/>
                    </View>
                    <View style={styles.labelColumn}>
                        <RoomLabels room={'Exam Rm'} color={'#E68153'}/>
                        <RoomLabels room={'CT Rm'} color={'#536FE6'}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fcfcfc",
        padding: hp('1%')
    },
    dates: {
        fontSize: wp('5%'),
    },
    text: {
        fontSize: wp('4%'),
        paddingVertical: hp('1.5%'),
        fontFamily: 'Poppins-Bold'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        margin: wp('3%'),
        padding: hp('2%'),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 3,
        elevation: 11,
    },
    labelRow: {
        bottom: 0,
        height: hp('20%'),
        width: wp('100%'),
        backgroundColor: '#fff',
        position: 'absolute',
        flexDirection: 'row'
    },
    labelColumn: {
        flexDirection: 'column',
        width: wp('50%')
    },
    labelCard: {
        borderColor: '#fff',
        borderBottomColor: '#dddddd',
        borderTopColor: '#dddddd',
        borderWidth: 0.5,
        borderLeftWidth: wp('3%'),
        borderLeftColor: '#0060a4',
        paddingVertical: hp('1%')
    },
    roomLabel: {
        fontSize: hp('1.6%'),
        paddingLeft: wp('4%')
    }
});

export default Charts;