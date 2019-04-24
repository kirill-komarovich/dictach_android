import React from 'react';
import PropTypes from 'prop-types';
import { ProgressBarAndroid, View, ViewPropTypes } from 'react-native';
import { colors } from '@src/colors';

function Loader({ style, styleAttr }) {
  return (
    <View>
      <ProgressBarAndroid
        style={style}
        color={colors.primary}
        styleAttr={styleAttr}
      />
    </View>
  )
}

Loader.propTypes = {
  style: ViewPropTypes.style,
  styleAttr: PropTypes.string.isRequired,
};

Loader.defaultProps = {
  style: {},
}
export default Loader;
