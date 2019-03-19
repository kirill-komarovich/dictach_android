import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { RaisedTextButton } from 'react-native-material-buttons';
import { colors } from '@src/colors';
import OutlinedInput from '@components/outlinedInput';
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
    const { email, password } = this.state;
    return (
      <TouchableWithoutFeedback style={styles.touchable} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.fieldset}>
            <View style={styles.fieldsetContainer}>
              <OutlinedInput
                style={styles.input}
                label="Email"
                autoCapitalize="none"
                onChangeText={(value) => this.onChangeText('email', value)}
                value={email}
                autoFocus
              />
              <OutlinedInput
                style={styles.input}
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
            title='Sign In'
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
  input: {
    flexGrow: 1,
    width: 'auto',
  },
  touchable: {
    flex: 1,
  }
})

SignIn.propTypes = {
  actions: PropTypes.shape({
    signInUser: PropTypes.func.isRequired,
  }).isRequired,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ signInUser }, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(SignIn);
