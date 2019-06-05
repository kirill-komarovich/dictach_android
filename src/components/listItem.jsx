import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity, ViewPropTypes } from 'react-native';
import { colors } from '@src/colors';

function ListItem({ title, onPress, style }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, style]}>
        <Text style={styles.title}>
          { title }
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.listItemBorder,
    padding: 20,
  },
  title: {
    color: colors.listItemTitle,
    fontSize: 16,
  }
})

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
}

ListItem.defaultProps = {
  onPress: () => null,
  style: {},
};

export default ListItem;
