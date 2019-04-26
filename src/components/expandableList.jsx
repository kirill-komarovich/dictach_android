import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';
import { colors } from '@src/colors';

const AnimatedView = Animated.createAnimatedComponent(View);
const EXPANDABLE_DEFAULT_HEIGHT = 39;

class ExpandableList extends React.PureComponent {
  state = {
    expanded: true,
    animationHeight: new Animated.Value(EXPANDABLE_DEFAULT_HEIGHT),
  };

  setMaxHeight = ({ nativeEvent: { layout: { height } } }) => {
    this.setState({ maxHeight: height });
  }

  setMinHeight = ({ nativeEvent: { layout: { height } } }) => {
    this.setState({ minHeight: height });
  }

  toggle = () => {
    const { expanded, maxHeight, minHeight, animationHeight } = this.state;
    const initialValue = expanded ? maxHeight + minHeight : minHeight
    const finalValue = expanded ? minHeight : maxHeight + minHeight;

    this.setState(({ expanded }) => ({ expanded: !expanded }));

    animationHeight.setValue(initialValue); 
    Animated.spring( 
      animationHeight,
      { toValue: finalValue },
    ).start(); 
  }

  render() {
      const { children, title } = this.props;
      const { animationHeight } = this.state;
      const expandableStyle = { height: animationHeight };
      return ( 
        <AnimatedView style={[styles.container, expandableStyle]}>
          <View style={styles.titleContainer} onLayout={this.setMinHeight}>
            <TouchableHighlight style={styles.button} onPress={this.toggle} underlayColor="#f1f1f1">
              <Text style={styles.title}>
                { title }
              </Text>
            </TouchableHighlight>
          </View>
          <View style={styles.body} onLayout={this.setMaxHeight}>
            { children }
          </View>
        </AnimatedView>
      );
    }
  }

const styles = StyleSheet.create({
  body: {
    padding: 10,
    paddingTop: 0,
  },
  button: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 2,
    overflow: 'hidden',
  },
  title: {
    backgroundColor: colors.expandableListTitleBackground,
    color: colors.expandableListTitle,
    fontWeight: 'bold',
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
});

ExpandableList.propTypes = {
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
};

export default ExpandableList;
