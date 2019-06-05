import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Paragraph } from 'react-native-paper';

const EmptyList = ({ message }) => (
  <View style={styles.container}>
    <Paragraph>{message}</Paragraph>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

EmptyList.propTypes = {
  message: PropTypes.string.isRequired,
}

export default EmptyList;
