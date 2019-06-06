import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { signOutUser } from '@src/actions/SessionActions';
import { colors } from '@src/colors';

const SideMenu = ({ actions: { signOutUser } }) => (
  <View style={styles.container}>
    <Button style={styles.button} onPress={signOutUser}>Sign out</Button>
  </View>
);

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
});

SideMenu.propTypes = {
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ signOutUser }, dispatch)
})

export default connect(null, mapDispatchToProps)(SideMenu);
