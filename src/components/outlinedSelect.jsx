import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Animated, ViewPropTypes, Picker } from 'react-native';
import { colors } from '@src/colors';

const AnimatedText = Animated.createAnimatedComponent(Text);
const FONT_SIZE = 16;
const CHANGED_FONT_SIZE = 12;


class OutlinedSelect extends React.PureComponent {
  constructor(props) {
    super(props);
    const { selectedValue } = props;

    this.state = {
      value: selectedValue,
    }
  }

  topOffset = () => {
    const { input: { paddingVertical } } = styles;

    return FONT_SIZE + paddingVertical;
  }

  labelStyle = () => {
    const {
      input: { marginHorizontal: inputMarginHorizontal } ,
      label: { paddingHorizontal: lablePaddingHorizontal },
    } = styles;
    const positionLeft = inputMarginHorizontal - lablePaddingHorizontal;

    return {
      color: colors.inactive,
      transform: [
        {
          translateY: 0,
        },
        {
          translateX: positionLeft - 14,
        },
        {
          scale: CHANGED_FONT_SIZE / FONT_SIZE,
        },
      ],
    };
  }

  render() {
    const { label, style,  ...props } = this.props;
    return (
      <View style={styles.container}>
        <View pointerEvents="none" style={styles.outline} />
        <AnimatedText style={[styles.label, this.labelStyle()]} numberOfLines={1} >
          { label }
        </AnimatedText>
        <Picker
          {...props}
          style={[style, styles.input]}
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
    marginHorizontal: 24,
    paddingVertical: 18,
  },
  label: {
    backgroundColor: colors.background,
    fontSize: FONT_SIZE,
    paddingHorizontal: 4,
    position: 'absolute',
  },
  outline: {
    borderColor: colors.inputBorder,
    borderRadius: 4,
    borderWidth: 1,
    height: '100%',
    position: 'absolute',
    top: 13,
    width: '100%',
  },
});

OutlinedSelect.propTypes = {
  label: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  selectedValue: PropTypes.string,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onChangeText: PropTypes.func,
};

OutlinedSelect.defaultProps = {
  selectedValue: '',
  style: {},
  editable: true,
  disabled: false,
  onBlur: undefined,
  onFocus: undefined,
  onChangeText: undefined,
};

export default OutlinedSelect;
