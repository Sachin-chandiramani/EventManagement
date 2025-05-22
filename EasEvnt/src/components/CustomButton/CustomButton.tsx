import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CustomButton = ({title, titleStyle, style, ...buttonProps}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: '#FD7942',
          width: '50%',
          alignItems: 'center',
          paddingVertical: 8,
          marginVertical: 10,
          alignSelf: 'center',
          borderRadius: 10,
        },
        style,
      ]}
      {...buttonProps}>
      <Text style={titleStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
