import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {LabelledInput} from '../../components/LabelledInput';
import {CustomButton} from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../constants/screens';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../context/authContext';
import {useDispatch} from 'react-redux';
import {setAuthState} from '../../redux/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [setUserState] = useContext(AuthContext);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const getUserData = async () => {
    const userData = await AsyncStorage.getItem('@authUser');
  };

  useEffect(() => {
    getUserData();
  }, []);

  // const parsedUserData = JSON.parse(userData)
  const onLogin = async () => {
    if (email === '' || password === '') {
      return Alert.alert('Please enter all the details');
    }
    await axios
      .post('http://localhost:8080/api/v1/auth/login', {
        email,
        password,
      })
      .then(async data => {
        console.log(data.data);
        // setUserState(data.data);
        dispatch(setAuthState(data.data));
        navigation.navigate(Screens.HomeTabs);
        await AsyncStorage.setItem('@authUser', JSON.stringify(data.data));
      })
      .catch(err => {
        Alert.alert(err.message);
      });
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.infoContainer}>
        <LabelledInput
          textInputProps={{
            placeholder: 'Enter Email',
            value: email,
            onChangeText: txt => setEmail(txt),
          }}
          inputIcon={<Fontisto name="email" color="#ccc" size={20} />}
        />
        <LabelledInput
          textInputProps={{
            placeholder: 'Enter Password',
            value: password,
            onChangeText: txt => setPassword(txt),
            secureTextEntry: true,
          }}
          inputIcon={<Feather name="lock" color="#ccc" size={20} />}
        />
        <CustomButton
          style={{}}
          title="Login"
          titleStyle={{color: '#fff'}}
          onPress={onLogin}
        />
        <Text style={{color: '#999', alignSelf: 'center'}}>
          Don't have an account?{' '}
          <Text
            style={{color: '#FD7942'}}
            onPress={() => navigation.navigate(Screens.Register)}>
            Register here!
          </Text>
        </Text>
      </View>
      {/* <Text>{userData}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#111',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
  },
});

export default Login;
