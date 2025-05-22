import {View, Text, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Agenda, AgendaEntry, DateData} from 'react-native-calendars';

const CalendarModule = () => {
  const [items, setItems] = useState(undefined);

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? 'black' : '#43515c';

    return (
      <TouchableOpacity
        // testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: reservation.height}]}
        onPress={() => Alert.alert(reservation.name)}>
        <Text style={{fontSize, color}}>{reservation.name}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const loadItems = (day: DateData) => {
    const localItems = items || {};
    console.log(new Date(day.timestamp).toISOString().split('T')[0]);

    const customDates = {
      [new Date(day.timestamp).toISOString().split('T')[0]]: [
        {
          name: 'custom item',
          height: Math.max(50, Math.floor(Math.random() * 150)),
          day: new Date(day.timestamp).toISOString().split('T')[0],
        },
      ],
    };

    setItems({
      ...localItems,
      ...customDates,
    });
  };

  return (
    <Agenda
      // testID={testIDs.agenda.CONTAINER}
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2017-05-16'}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      // rowHasChanged={this.rowHasChanged}
      showClosingKnob={true}
      // markingType={'period'}
      // markedDates={{
      //    '2017-05-08': {textColor: '#43515c'},
      //    '2017-05-09': {textColor: '#43515c'},
      //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
      //    '2017-05-21': {startingDay: true, color: 'blue'},
      //    '2017-05-22': {endingDay: true, color: 'gray'},
      //    '2017-05-24': {startingDay: true, color: 'gray'},
      //    '2017-05-25': {color: 'gray'},
      //    '2017-05-26': {endingDay: true, color: 'gray'}}}
      // monthFormat={'yyyy'}
      // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
      // renderDay={this.renderDay}
      // hideExtraDays={false}
      // showOnlySelectedDayItems
      // reservationsKeyExtractor={this.reservationsKeyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green',
  },
  dayItem: {
    marginLeft: 34,
  },
});

export default CalendarModule;
