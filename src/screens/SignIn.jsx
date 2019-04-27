import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { colors } from '@src/colors';
import OutlinedInput from '@components/outlinedInput';
import Loader from '@components/loader';
import { signInUser } from '@src/actions/SessionActions';

class SignIn extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChangeText = (key, value) => this.setState({ [key]: value })

  handleSubmit = () => {
    const { actions: { signInUser } } = this.props;
    const { email, password } = this.state
    signInUser({ email, password });
  }

  render() {
    const { loading } = this.props;
    const { email, password } = this.state;
    return loading ? (
      <View style={styles.loader}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <TouchableWithoutFeedback style={styles.touchable} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.fieldset}>
            <View style={styles.fieldsetContainer}>
              <OutlinedInput
                label="Email"
                autoCapitalize="none"
                onChangeText={(value) => this.onChangeText('email', value)}
                value={email}
                autoFocus
              />
              <OutlinedInput
                label="Password"
                autoCapitalize="none"
                secureTextEntry
                onChangeText={(value) => this.onChangeText('password', value)}
                value={password}
              />
            </View>
          </View>
          <RaisedTextButton
            style={styles.button}
            title="Sign In"
            color={colors.primary}
            titleColor={colors.primaryText}
            onPress={this.handleSubmit}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    elevation: 0,
    margin: 8,
  },
  container: {
    alignItems: 'flex-end',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  fieldset: {
    flexDirection: 'row',
  },
  fieldsetContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  touchable: {
    flex: 1,
  }
})

SignIn.propTypes = {
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    signInUser: PropTypes.func.isRequired,
  }).isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signInUser }, dispatch)
  };
}

function mapStateToProps({ session: { loading } }) {
  return {
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
