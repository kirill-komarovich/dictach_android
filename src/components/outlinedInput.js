import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../colors';

const AnimatedText = Animated.createAnimatedComponent(Text);
const FONT_SIZE = 16;
const CHANGED_FONT_SIZE = 12;
const ANIMATION_DURATION = 150;


class OutlinedInput extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      animatedIsFocused: new Animated.Value(this.props.value === '' ? 0 : 1),
      focused: false,
      value: props.value,
    }
  }

  componentDidUpdate() {
    const { animatedIsFocused, focused, value } = this.state;

    Animated.timing(animatedIsFocused, {
      toValue: (focused || value !== '') ? 1 : 0,
      duration: ANIMATION_DURATION,
    }).start();
  }

  handleFocus = (event) => {
    const { onFocus, disabled } = this.props;

    if (disabled) {
      return;
    }
    this.setState({ focused: true });
    onFocus && onFocus(event);
  }

  handleBlur = (event) => {
    const { onBlur, disabled } = this.props;

    if (disabled) {
      return;
    }
    this.setState({ focused: false });
    onBlur && onBlur(event);
  }

  handleChangeText = (value) => {
    const { editable, onChangeText } = this.props;
    if (!editable) {
      return;
    }

    this.setState({ value });
    onChangeText && onChangeText(value);
  }

  topOffset = () => {
    const { input: { paddingVertical } } = styles;

    return FONT_SIZE + paddingVertical;
  }

  labelStyle = () => {
    const { input: { paddingHorizontal } } = styles;
    const { animatedIsFocused, focused } = this.state;

    return {
      left: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [paddingHorizontal, paddingHorizontal - 14],
      }),
      top: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [this.topOffset(), 0],
      }),
      color: focused ? colors.primary : colors.inactive,
      paddingHorizontal: animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 4],
      }),
      transform: [
        {
          scale: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [1, CHANGED_FONT_SIZE / FONT_SIZE],
          }),
        },
      ],
    };
  }

  outlineStyle = () => {
    const { focused } = this.state;

    return {
      borderRadius: 4,
      borderWidth: focused ? 2 : 1,
      borderColor: focused ? colors.primary : colors.inputBorder,
    }
  }

  render() {
    const { label, ...props } = this.props;
    return (
      <View style={styles.container}>
        <View
          pointerEvents="none"
          style={[
            this.outlineStyle(),
            styles.outline,
          ]}
        />
        <AnimatedText style={[styles.label, this.labelStyle()]} numberOfLines={1} >
          { label }
        </AnimatedText>
        <TextInput
          {...props}
          style={[...props.style, styles.input]}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChangeText={this.handleChangeText}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    paddingTop: CHANGED_FONT_SIZE,
  },
  label: {
    position: 'absolute',
    backgroundColor: colors.background,
    fontSize: FONT_SIZE,
  },
  outline: {
    position: 'absolute',
    top: 13,
    height: '100%',
    width: '100%',
  },
  input: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    fontSize: FONT_SIZE,
  },
})


OutlinedInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,
};

OutlinedInput.defaultProps = {
  value: '',
  editable: true,
  disabled: false,
  onBlur: undefined,
  onFocus: undefined,
  onChangeText: undefined,
};

export default OutlinedInput;
