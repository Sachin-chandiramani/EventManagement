import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';

const CreateEventButton = props => {
  const {setShowCreateModal} = props;
  return (
    <TouchableOpacity
      onPress={() => setShowCreateModal(true)}
      style={styles.buttonContainer}>
      <Feather name="plus" size={32} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 8,
    backgroundColor: 'orange',
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 15,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default CreateEventButton;
