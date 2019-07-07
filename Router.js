import React, { Component } from 'react';
import { Scene, Router, Actions, ActionConst } from 'react-native-router-flux';
import { Alert } from 'react-native';
import firebase from 'firebase';
import StaffLogin from './src/screens/staffLoginScreen';
import StaffWelcome from './src/screens/staffWelcomeScreen';
import GeneratePatientAccount from './src/screens/generatePatientAccount';
import LookupPatientAccount from './src/screens/lookupPatientAccount';
import ShowPatientAccount from './src/screens/showPatientAccount';
import QrScanner from './src/screens/qrScanner';
import Charts from './src/screens/charts';
import Beacons from './src/screens/beacons'

class RouterComponent extends Component {
    logOut() {
        Alert.alert(
            'Warning',
            'Signing out will disable Face/Touch ID for future login. You will have to type credentials manually to sign in.',
            [
                {
                    text: "Sign me out", onPress: () => {
                        firebase.auth().signOut()
                            .then(() => { console.log("sign out successfully."); })
                            .catch((error) => {
                                console.log(error);
                            })
                        Actions.auth();
                    }
                },
                { text: "Don't sign me out", onDismiss: () => { } }
            ]
        );
    }

    render() {
        return (
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth" hideNavBar type={ActionConst.RESET}>
                        <Scene key="login" component={StaffLogin}
                            title="Please Login" initial />
                    </Scene>
                    <Scene key="main" type={ActionConst.RESET}>
                        <Scene
                            rightTitle="Scan QR"
                            onRight={() => { Actions.qrScanner() }}
                            key="StaffWelcome"
                            component={StaffWelcome}
                            title="Home"
                        />
                        <Scene key="qrScanner" component={QrScanner} title="QR Scanner" back={true} backTitle={'Back'} />
                        <Scene key="generatePatientAccount" component={GeneratePatientAccount}
                            title="Generate Account" />
                        <Scene key="lookupPatientAccount" component={LookupPatientAccount}
                            title="Lookup Account" />
                        <Scene key="charts" component={Charts} title="Patient Stats" back={true} backTitle={'Back'} />
                        <Scene key="beacons" component={Beacons} title="Display All Beacons" back={true} backTitle={'Back'} />
                    </Scene>
                    <Scene key="showAcct" type={ActionConst.RESET}>
                        <Scene key="showPatientAccount" component={ShowPatientAccount}
                            title="Show Account" />
                    </Scene>
                </Scene>
            </Router>
        );
    }
};

export default RouterComponent;