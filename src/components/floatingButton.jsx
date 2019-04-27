import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '@src/colors';

function FloatingButton({ name, size, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Icon name={name} size={size} color={colors.floatButtonIcon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.floatButtonBackground,
    borderRadius: 30,
    bottom: 10,
    elevation: 3,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    width: 60,
  },
})

FloatingButton.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
};

FloatingButton.defaultProps = {
  size: 25,
  onPress: () => null,
  style: {},
};


export default FloatingButton;
