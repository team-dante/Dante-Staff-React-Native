import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, DeviceEventEmitter, FlatList, Alert} from 'react-native';
import Beacons from 'react-native-beacons-manager';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from 'firebase';
import { ScrollView } from 'react-native-gesture-handler';

export default class beacons extends Component {
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
      count: 0,
      currRoom: '',
      major1: [],
      major2: [],
      major3: []
    };
  }

  componentWillMount() {
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
    // records a queue of 10 distances for each beacon
    let roomDict = {1: [], 2: [], 3:[]};
    // map beacon major to the real clinic room
    const majorToRoom = { 1: "exam1", 2: "CTRoom", 3: "femaleWaitingRoom" };
    // map beacon major to its corresponding cutoff value (1m)
    const cutoff = { 1: 1, 2: 1, 3: 1};
    // after 10 rounds, perform stats analysis
    const threshold = 10;

    // get first part before @email.com
    let user = firebase.auth().currentUser;
    console.log(user);
    let phoneNumber = user.email.split('@')[0];

    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        console.log(data.beacons);

        // sort all beacons; from nearest distance to the furthest distance
        data.beacons.sort(function(first, second){
          return first.accuracy - second.accuracy;
        });

        let localCount = this.state.count;
        if (localCount < threshold) {
          localCount++;
          this.setState({count: localCount});
          // push beacon distance; if undefined or -1, push 0
          for (let beacon of data.beacons) {

            // debugging purposes
            if (beacon["major"] == 1) {
              this.setState({major1: roomDict[beacon["major"]]})
            } 
            else if (beacon["major"] == 2) {
              this.setState({major2: roomDict[beacon["major"]]})
            }
            else if (beacon["major"] == 3) {
              this.setState({major3: roomDict[beacon["major"]]})
            } 
            // undefined or -1 will skew the distance to 999m
            if (beacon["accuracy"] != undefined && beacon["accuracy"] != -1)
              roomDict[ beacon["major"] ].push(beacon["accuracy"])
            else
              roomDict[ beacon["major"] ].push(999)
          }
        }
        // after 10 rounds
        else {
          let avgList = []
          for (let beacon of data.beacons) {
            // if there are less than 10 collected distances in the array, ignore it (aka. not detected at all)
            if (roomDict[ beacon["major"] ].length >= threshold) {
              const total = (roomDict[ beacon["major"] ].reduce((acc, c) => acc + c, 0));
              avgList.push([ beacon["major"], total/(threshold * 1.0)])
            }
            roomDict[ beacon["major"] ] = []
          }
          // avgList = [[major, avg distance], ...] (e.g. avgList = [[1, 1.0], [2, 1.4], [3, 2.0]])
          // sort by avg distance (closest beacon will come first)
          avgList.sort(function(first, second) {
            return first[1] - second[1];
          });
          // if the avg distance of the cloest beacon is greater than the cutoff, then in "Private" mode
          // else set the current cloest clinic room
          if (avgList[0][1] >= cutoff[avgList[0][0]])
            this.setState({currRoom: 'Private'});
          else
            this.setState({currRoom: majorToRoom[avgList[0][0]]})

          this.updateDoctorLocation(phoneNumber, this.state.currRoom);
          this.setState({count: 0})
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons)
        });
        // update the room val to Firebase; change dots on the map
      }
    );
  }

  updateDoctorLocation(phoneNumber, roomId) {
    firebase.database().ref('/DoctorLocation/' + phoneNumber).update({
        room: roomId
    });
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
    const { dataSource, count, currRoom, major1, major2, major3 } =  this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headline}>
          All beacons in the area will be displayed
        </Text>
        <Text style={{fontWeight: 'bold'}}>Major 1:</Text>
        {
          major1.map((item, key)=>(
            <Text key={key}> {item.toFixed(2)} </Text>
          ))
        }
        <Text style={{fontWeight: 'bold'}}>Major 2:</Text>
        {
          major2.map((item, key)=>(
            <Text key={key}> {item.toFixed(2)} </Text>
          ))
        }
        <Text style={{fontWeight: 'bold'}}>Major 3:</Text>
        {
          major3.map((item, key)=>(
            <Text key={key}> {item.toFixed(2)} </Text>
          ))
        }
        <Text style={{fontWeight: 'bold'}}>Count: {count} </Text> 
        <Text style={{fontWeight: 'bold', color: 'blue'}}> You are now in Room {currRoom} </Text>
        <ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={this.renderRow}
        />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
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