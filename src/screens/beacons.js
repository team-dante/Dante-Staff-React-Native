import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, DeviceEventEmitter, FlatList} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {};
export default class beacons extends Component<Props> {
  constructor(props) {
    super(props);
    // Create our dataSource which will be displayed in the ListView
    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2 }
    );
    this.state = {
      bluetoothState: '',
      // region information
      identifier: 'GemTot for iOS',
      uuid: 'f7826da6-4fa2-4e98-8024-bc5b71e0893e',
      // React Native ListView datasource initialization
      dataSource: ds.cloneWithRows([]),
      major1: [],
      major2: [],
      total1: 0,
      total2: 0,
      average1: 0,
      average2: 0,
      count: 0
    };
  }

  componentWillMount(){
    // Request for authorization while the app is open
    Beacons.requestWhenInUseAuthorization();
    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid
    };
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region);
    // Beacons.startUpdatingLocation();
  }

  componentDidMount() {
    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log(data.beacons);
        data.beacons.sort(function(first, second){
          return first.major - second.minor;
        })
        let localCount = this.state.count
        let localMajor1 = this.state.major1;
        let localMajor2 = this.state.major2;
        let localTotal1 = this.state.total1;
        let localTotal2 = this.state.total2;

        if (localCount < 10) {
          localCount++;

          // major 1 is either in element 0 or 1
          if (data.beacons[0] !== undefined && data.beacons[0]["major"] == 1 && data.beacons[0]["accuracy"] !== undefined && data.beacons[0]["accuracy"] != -1)
          {
            localMajor1.push(data.beacons[0]["accuracy"])
            localTotal1++;
          }  
          else if (data.beacons[1] !== undefined && data.beacons[1]["major"] == 1 && data.beacons[1]["accuracy"] !== undefined && data.beacons[1]["accuracy"] != -1)
          {
            localMajor1.push(data.beacons[1]["accuracy"])
            localTotal1++;
          }  
          else
            localMajor1.push(0)

          // major 2 is either in element 0 or 1
          if (data.beacons[0] !== undefined && data.beacons[0]["major"] == 2 && data.beacons[0]["accuracy"] !== undefined && data.beacons[0]["accuracy"] != -1 )
          {
            localMajor2.push(data.beacons[0]["accuracy"])
            localTotal2++;
          }
          else if (data.beacons[1] !== undefined && data.beacons[1]["major"] == 2 && data.beacons[1]["accuracy"] !== undefined && data.beacons[1]["accuracy"] != -1 )
          {
            localMajor2.push(data.beacons[1]["accuracy"])
            localTotal2++;
          }
          else
            localMajor2.push(0)

          this.setState({count: localCount, major1: localMajor1, major2: localMajor2, total1: localTotal1, total2: localTotal2 })
        }
        else {
          let localAverage1 = 0;
          let localAverage2 = 0;

          if (localTotal1 == 0)
            localAverage1 = 0;
          else
            localAverage1 = localMajor1.reduce((a, b) => a + b, 0) / localTotal1;

          if (localTotal2 == 0)
            localAverage2 = 0;
          else
            localAverage2 = localMajor2.reduce((a, b) => a + b, 0) / localTotal2;

          this.setState({count: 0, major1: [], major2: [], total1: 0, total2: 0, average1: localAverage1, average2: localAverage2});
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
      }
    );
  }

  componentWillUnMount(){
    this.beaconsDidRange = null;
  }

  renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>
          RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
        </Text>
        <Text>
          Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
        </Text>
        <Text>
          Distance: {rowData.accuracy ? rowData.accuracy.toFixed(2) : 'NA'}m
        </Text>
      </View>
    );
  }

  render() {
    const { bluetoothState, dataSource, major1, major2, count, total1, total2, average1, average2 } =  this.state;
    // console.log(major1);
    // console.log(major2);
    // console.log(total1);
    // console.log(total2);
    // console.log(average1);
    // console.log(average2);

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>
          All beacons in the area will be displayed
        </Text>
        <Text style={{fontWeight: 'bold'}}>Major 1:</Text>
        {
          major1.map((item, key)=>(
            <Text key={key}> {item} </Text>
          ))
        }
        <Text style={{fontWeight: 'bold'}}>Major 2:</Text>
        {
          major2.map((item, key)=>(
            <Text key={key}> {item} </Text>
          ))
        }
        <Text style={{fontWeight: 'bold'}}>Count: {count} </Text> 
        <Text style={{fontWeight: 'bold'}}> Average distance of major 1: {average1} </Text>
        <Text style={{fontWeight: 'bold'}}> Average distance of major 2: {average2} </Text>
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={this.renderRow}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btleConnectionStatus: {
    fontSize: 20,
    paddingTop: 20
  },
  headline: {
    fontSize: 20,
    paddingTop: 20
  },
  row: {
    padding: 8,
    paddingBottom: 16
  },
    smallText: {
    fontSize: 11
  }
});
