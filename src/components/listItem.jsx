import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '@src/colors';

function ListItem({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
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
    flex: 1,
    fontSize: 16,
  }
})

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
}

ListItem.defaultProps = {
  onPress: () => null,
};

export default ListItem;
