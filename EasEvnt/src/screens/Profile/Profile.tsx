import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {setAuthState} from '../../redux/authSlice';
import {useNavigation} from '@react-navigation/native';
import {Screens} from '../../constants/screens';

const Profile = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const [name, setName] = useState(userData?.name);
  const [password, setPassword] = useState(userData?.password);
  const [email, setEmail] = useState(userData?.email);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateProfile = async () => {
    try {
      setLoading(true);
      const {data} = await axios.put(
        `http://localhost:8080/api/v1/auth/update-profile`,
        {
          name,
          password,
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLoading(false);
      dispatch(
        setAuthState({
          user: null,
          token: null,
        }),
      );
      alert(data && data.message);
      navigation.replace(Screens.Login);
      console.log(data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <View style={styles.screenContainer}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png',
            }}
            style={{height: 200, width: 200}}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={txt => setName(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry={true}
            onChangeText={txt => setPassword(txt)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Role</Text>
          <TextInput
            style={styles.inputBox}
            value={userData?.role}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={{alignItems: 'center', marginTop: 40}}>
          <TouchableOpacity onPress={updateProfile} style={styles.submitButton}>
            <Text style={{fontWeight: 'bold', color: '#fff'}}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    margin: 8,
  },
  inputContainer: {
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontWeight: 'bold',
    width: 70,
    color: 'darkgray',
  },
  inputBox: {
    width: 240,
    backgroundColor: 'white',
    marginLeft: 10,
    fontSize: 16,
    paddingLeft: 20,
    borderRadius: 5,
    height: 40,
  },
  submitButton: {
    backgroundColor: '#000',
    height: 40,
    width: 240,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
});

export default Profile;
