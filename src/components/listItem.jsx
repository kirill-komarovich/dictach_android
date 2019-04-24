import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import { colors } from '@src/colors';

function ListItem({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        { title }
      </Text>
    </View>
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
}

export default ListItem;
