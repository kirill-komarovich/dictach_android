import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet } from 'react-native'
import { RaisedTextButton } from 'react-native-material-buttons';
import { signOutUser } from '../actions/SessionActions';

class Home extends React.Component {
  static get options() {
    return {
      topBar: {
        title: {
          text: 'Home'
        },
      }
    };
  }

  signOut = () => {
    const { actions: { signOutUser } } = this.props;
    signOutUser();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home screen.</Text>
        <RaisedTextButton
          onPress={this.signOut}
          title="Sign Out"
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
})

Home.propTypes = {
  actions: PropTypes.shape({
    signOutUser: PropTypes.func.isRequired,
  }).isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signOutUser }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Home);
