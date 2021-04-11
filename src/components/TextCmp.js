import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import themes from '../constants/themes';
import {scaleNumber} from '../utils/scale';

const TextCmp = ({
  children,
  style,
  bold,
  semibold,
  fontSize,
  color,
  regular,
  ...props
}) => {
  return (
    <Text
      style={[
        {fontSize: fontSize ? scaleNumber(fontSize) : scaleNumber(12)},
        styles.regular,
        bold && styles.bold,
        semibold && styles.semibold,

        color && {color},
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default TextCmp;

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold'
  },
  semibold: {
    fontWeight: '500'
  },
  regular: {
    
  },
});
