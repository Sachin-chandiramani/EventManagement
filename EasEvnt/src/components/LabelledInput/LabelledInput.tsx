import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import React from 'react';

interface LabelledInputProps {
  textInputProps: TextInputProps;
  inputIcon: any;
  containerStyles?: ViewStyle;
}

const LabelledInput = ({
  textInputProps,
  inputIcon,
  containerStyles,
}: LabelledInputProps) => {
  return (
    <View style={[styles.labelledInputContainer, {...containerStyles}]}>
      {inputIcon}
      {/* <Fontisto name="email" color="#ccc" size={20} style={{marginRight: 10}} /> */}
      <TextInput
        placeholder="Enter Email"
        style={{
          color: '#ccc',
          fontSize: 18,
          marginLeft: 10,
        }}
        placeholderTextColor={'#ccc'}
        {...textInputProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelledInputContainer: {
    marginHorizontal: 10,
    marginVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
  },
});

export default LabelledInput;
