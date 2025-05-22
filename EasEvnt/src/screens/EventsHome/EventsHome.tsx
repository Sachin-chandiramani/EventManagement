import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../constants/screens';
import {useDispatch, useSelector} from 'react-redux';
import {setAuthState} from '../../redux/authSlice';
import CalendarModule from './components/CalendarModule';
import CreateEventButton from './components/CreateEventButton';
import CreateEventModal from './components/CreateEventModal';
// import {AuthContext} from '../../context/authContext';

const EventsHome = () => {
  const navigation = useNavigation();
  // const [userState] = useContext(AuthContext);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const userData = useSelector(state => state.auth.user);
  const userToken = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(
      setAuthState({
        user: null,
        token: null,
      }),
    );
    navigation.replace(Screens.Login);
  };
  console.log(userToken, 'userToken');

  return (
    <>
      {/* <Text>{JSON.stringify(userState)}</Text> */}
      {/* <Text>{JSON.stringify(userData)}</Text> */}
      <CalendarModule />
      <CreateEventButton setShowCreateModal={setShowCreateModal} />
      <CreateEventModal
        createModalState={[showCreateModal, setShowCreateModal]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    width: '40%',
    padding: 7,
    backgroundColor: 'orange',
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default EventsHome;
