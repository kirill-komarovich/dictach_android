import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Loader from '@components/loader';

const ListFooter = ({ loading }) => (
  loading ? (
    <Loader style={styles.loader} styleAttr="Normal" />
  ) : (
    <View style={styles.container} />
  )
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 80,
  },
  loader: {
    marginVertical: 10,
  },
});

ListFooter.propTypes = {
  loading: PropTypes.bool,
}

ListFooter.defaultProps = {
  loading: false,
}

export default ListFooter;
