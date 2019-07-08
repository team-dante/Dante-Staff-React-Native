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
      roomDict: {}
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
    let roomDict = {1: [], 2: [], 3:[]};
    // map beacon major to the real clinic room
    const majorToRoom = { 1: "exam1", 2: "CTRoom", 3: "femaleWaitingRoom" };
    // map beacon major to its corresponding cutoff value (1m)
    const cutoff = { 1: 1, 2: 1, 3: 1};

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
        if (localCount < 10) {
          localCount++;
          this.setState({count: localCount});
        }

        // take a closer look at the cloest beacon (aka first elem after sorting data.beacons)
        // if accurancy of the closest beacon is less than the cutoff, push 1; otherwise push 0
        // 1 means in-range; 0 means out-of-range
        if (data.beacons[0]["accuracy"] <= cutoff[ data.beacons[0]["major"] ]) {
          roomDict[ data.beacons[0]["major"] ].push(1)
        }
        else {
          roomDict[ data.beacons[0]["major"] ].push(0)
        }
        // for any other beacons which is not the closest, push 0 (out-of-range)
        for (let i = 1; i < data.beacons.length; i++) {
          roomDict[ data.beacons[i]["major"] ].push(0)
        }
        // after 10 rounds, implement FIFO
        if (localCount >= 10) {
          // pop out the oldest beacon data at front of the array
          for (let beacon of data.beacons) {
            roomDict[ beacon["major"] ].shift()
          }
          let hasAllOnes = false;
          // check which beacon major's array has all 1's (in-range the whole time)
          // set the currRoom; hasAllOnes = true
          for (let beacon of data.beacons) {
            if (roomDict[ beacon["major"] ].every((val) => val === 1)) {
              this.setState({currRoom: majorToRoom[ beacon["major"] ]});
              hasAllOnes = true;
              break;
            }
          }
          // if no array has all 1's, set currRoom to Private
          if (!hasAllOnes) {
            this.setState({currRoom: 'Private'});
          }
        }

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.beacons),
          roomDict: roomDict
        });
        // update the room val to Firebase; change dots on the map
        this.updateDoctorLocation(phoneNumber, this.state.currRoom);
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
    const { bluetoothState, dataSource, count, currRoom, roomDict } =  this.state;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headline}>
          All beacons in the area will be displayed
        </Text>
        <Text>{roomDict[1]}</Text>
        <Text>{roomDict[2]}</Text>
        <Text>{roomDict[3]}</Text>
        
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
