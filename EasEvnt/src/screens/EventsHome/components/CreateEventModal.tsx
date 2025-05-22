import {
  View,
  Text,
  Modal,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {LabelledInput} from '../../../components/LabelledInput';
import Feather from 'react-native-vector-icons/Feather';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import {useSelector} from 'react-redux';
const CreateEventModal = props => {
  const {createModalState} = props;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showCreateModal, setShowCreateModal] = createModalState;
  const userToken = useSelector(state => state.auth.token);
  const handleEvent = async () => {
    try {
      if (!title || !description) {
        alert('PLease provide all the fields');
      }
      const {data} = await axios.post(
        'http://localhost:8080/api/v1/event/create-event',
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal visible={showCreateModal} transparent animationType="slide">
      <View style={styles.parentView}>
        <View style={styles.bottomChildView}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerTitle}>Enter Event Details</Text>
            <Feather
              name="x"
              onPress={() => setShowCreateModal(false)}
              size={24}
              color="orange"
              style={{position: 'absolute', right: 0, marginRight: 20}}
            />
          </View>
          <LabelledInput
            containerStyles={{marginHorizontal: 24, marginTop: 20}}
            inputIcon={<Feather name="briefcase" size={18} />}
            textInputProps={{
              placeholder: 'Enter Title',
              value: title,
              onChangeText: txt => setTitle(txt),
            }}
          />
          <LabelledInput
            containerStyles={{marginHorizontal: 24, marginTop: 20}}
            inputIcon={<Feather name="tag" size={18} />}
            textInputProps={{
              placeholder: 'Enter Description',
              value: description,
              onChangeText: txt => setDescription(txt),
            }}
          />
          <TouchableOpacity
            onPress={() => setShowCalendar(true)}
            style={styles.buttonContainer}>
            <Text style={{color: '#999'}}>
              {selectedDate ? selectedDate : 'Choose date'}
            </Text>
          </TouchableOpacity>
          {showCalendar ? (
            <Calendar
              onDayPress={day => {
                console.log(day);
                setSelectedDate(day.dateString);
                setShowCalendar(false);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  disableTouchEvent: true,
                  selectedDotColor: 'orange',
                },
              }}
            />
          ) : null}

          <TouchableOpacity
            onPress={handleEvent}
            style={[
              styles.buttonContainer,
              {backgroundColor: 'orange', width: '90%', alignSelf: 'center'},
            ]}>
            <Text style={{color: '#fff'}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bottomChildView: {
    paddingBottom: 20,
    width: '100%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: '#fff',
    marginTop: 'auto',
    overflow: 'hidden',
  },
  modalHeader: {
    width: '100%',
    height: 60,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: 'orange',
    fontWeight: 'bold',
  },
  buttonContainer: {
    padding: 10,
    borderColor: 'orange',
    borderWidth: 2,
    width: '40%',
    borderRadius: 25,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateEventModal;
