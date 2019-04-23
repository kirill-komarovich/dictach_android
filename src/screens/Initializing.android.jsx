import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet } from 'react-native';
import Loader from '@components/loader';
import { startDictionariesApp, startAuthenticationApp } from '@src/navigation';
import { checkAuthentication } from '@src/actions/SessionActions';

class Initialising extends React.Component {
  async componentDidMount() {
    const { actions: { checkAuthentication } } = this.props;
    await checkAuthentication();
    await this.redirectToScreen();
  }

  redirectToScreen = async () => {
    const { session: { authenticated } } = this.props;
    if (authenticated) {
      await startDictionariesApp();
    } else {
      await startAuthenticationApp();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader styleAttr="LargeInverse" />
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

Initialising.propTypes = {
  session: PropTypes.shape({
    authenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    checkAuthentication: PropTypes.func.isRequired,
  }).isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ checkAuthentication }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Initialising);
