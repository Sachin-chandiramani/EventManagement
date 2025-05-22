import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import {LabelledInput} from '../../components/LabelledInput';
import {CustomButton} from '../../components/CustomButton';
import {Screens} from '../../constants/screens';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const onRegister = async () => {
    if (email === '' || password === '' || name === '') {
      return Alert.alert('Please enter all the details');
    }
    await axios
      .post('http://localhost:8080/api/v1/auth/register', {
        email,
        password,
        name,
      })
      .then(data => {
        console.log(data);
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
            placeholder: 'Enter Your Name',
            value: name,
            onChangeText: txt => setName(txt),
          }}
          inputIcon={<Feather name="user" color="#ccc" size={20} />}
        />
        <LabelledInput
          textInputProps={{
            placeholder: 'Enter Password',
            value: password,
            onChangeText: txt => setPassword(txt),
          }}
          inputIcon={<Feather name="lock" color="#ccc" size={20} />}
        />
        <CustomButton
          style={{}}
          title="Register"
          titleStyle={{color: '#fff'}}
          onPress={onRegister}
        />
        <Text style={{color: '#999', alignSelf: 'center'}}>
          Already have an account?{' '}
          <Text
            style={{color: '#FD7942'}}
            onPress={() => navigation.navigate(Screens.Login)}>
            Login here!
          </Text>
        </Text>
      </View>
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

export default Register;
