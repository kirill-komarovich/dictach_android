import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View, Text, StyleSheet, Animated, ViewPropTypes } from 'react-native';
import { colors } from '../colors';

const AnimatedText = Animated.createAnimatedComponent(Text);
const FONT_SIZE = 16;
const CHANGED_FONT_SIZE = 12;
const ANIMATION_DURATION = 130;


class OutlinedInput extends React.PureComponent {

  constructor(props) {
    super(props);
    const { value } = this.props;

    this.state = {
      animatedIsFocused: new Animated.Value(value === '' ? 0 : 1),
      focused: false,
      value: value,
    }
  }

  componentDidUpdate() {
    const { animatedIsFocused, focused, value } = this.state;

    Animated.timing(animatedIsFocused, {
      toValue: (focused || value !== '') ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
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

    this.setState({ value }, () => {
      onChangeText && onChangeText(value);
    });
  }

  topOffset = () => {
    const { input: { paddingVertical } } = styles;

    return FONT_SIZE + paddingVertical;
  }

  labelStyle = () => {
    const {
      input: { paddingHorizontal: inputPaddingHorizontal } ,
      label: { paddingHorizontal: lablePaddingHorizontal },
    } = styles;
    const { animatedIsFocused, focused } = this.state;
    const positionLeft = inputPaddingHorizontal - lablePaddingHorizontal;

    return {
      color: focused ? colors.primary : colors.inactive,
      transform: [
        {
          translateY: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [this.topOffset(), 0],
          }),
        },
        {
          translateX: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [positionLeft, positionLeft - 14],
          }),
        },
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
    const { label, style,  ...props } = this.props;
    return (
      <View style={styles.container}>
        <View pointerEvents="none" style={[this.outlineStyle(), styles.outline]} />
        <AnimatedText style={[styles.label, this.labelStyle()]} numberOfLines={1} >
          { label }
        </AnimatedText>
        <TextInput
          {...props}
          style={[style, styles.input]}
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
  input: {
    fontSize: FONT_SIZE,
    paddingHorizontal: 24,
    paddingVertical: 18,
  },
  label: {
    backgroundColor: colors.background,
    fontSize: FONT_SIZE,
    paddingHorizontal: 4,
    position: 'absolute',
  },
  outline: {
    height: '100%',
    position: 'absolute',
    top: 13,
    width: '100%',
  },
});

OutlinedInput.propTypes = {
  label: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  value: PropTypes.string,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,
};

OutlinedInput.defaultProps = {
  value: '',
  style: {},
  editable: true,
  disabled: false,
  onBlur: undefined,
  onFocus: undefined,
  onChangeText: undefined,
};

export { OutlinedInput as default, AnimatedText };
