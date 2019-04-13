import * as React from "react";
import {StyleSheet, TextInput, TextInputProps} from "react-native";
import colors from "../config/colors";

// what does this mean?
type Props = TextInputProps;

class CustomizedFormTextInput extends React.Component<Props> {
    render() {
        const {style, ...otherProps} = this.props;
        return (
            <TextInput selectionColor={colors.DODGER_BLUE}
            // add externally specified style to our own custom style
            style={[styles.textInput, style]}
            // ...and then spread all the other props 
            {...otherProps}
            />
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        borderColor: colors.SILVER,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20
    }
});

export default CustomizedFormTextInput; 