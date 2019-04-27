import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, TouchableHighlight, Animated, Easing } from 'react-native';
import { colors } from '@src/colors';

const AnimatedView = Animated.createAnimatedComponent(View);
const ANIMATION_DURATION = 100;

class ExpandableList extends React.PureComponent {
  state = {
    expanded: false,
    animationHeight: new Animated.Value(0),
    maxHeight: 0,
  };

  componentDidUpdate() {
    const { expanded, animationHeight } = this.state;

    Animated.timing(animationHeight, {
      toValue: expanded ? 1 : 0,
      duration: ANIMATION_DURATION,
      easing: Easing.linear,
    }).start();
  }

  setMaxHeight = ({ nativeEvent: { layout: { height } } }) => {
    this.setState({ maxHeight: height });
  }

  toggleExpanded = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  }

  expandedContainerStyle = () => {
    const { animationHeight, expanded } = this.state;
    return {
      marginVertical: animationHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20],
      }),
      evaluating: expanded ? 8 : 0,
    };
  }

  expandedBodyStyle = () => {
    const { animationHeight, maxHeight } = this.state;
    return {
      height: animationHeight.interpolate({
        inputRange: [0, 1],
        outputRange: [0, maxHeight],
      }),
    };
  }

  render() {
      const { children, title } = this.props;
      return (
        <AnimatedView style={[styles.container, this.expandedContainerStyle()]}>
          <View style={styles.titleContainer}>
            <TouchableHighlight
              style={styles.button}
              onPress={this.toggleExpanded}
              underlayColor="transparent"
            >
              <Text style={styles.title}>
                { title }
              </Text>
            </TouchableHighlight>
          </View>
          <AnimatedView style={this.expandedBodyStyle()}>
            <View style={styles.body} onLayout={this.setMaxHeight}>
              { children }
            </View>
          </AnimatedView>
        </AnimatedView>
      );
    }
  }

const styles = StyleSheet.create({
  body: {
    minHeight: 0,
    padding: 20,
  },
  button: {
    flex: 1,
  },
  container: {
    backgroundColor: colors.background,
    borderColor: colors.listItemBorder,
    borderRadius: 2,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 2,
    marginHorizontal: 5,
    overflow: 'hidden',
  },
  title: {
    backgroundColor: colors.background,
    color: colors.expandableListTitle,
    fontSize: 18,
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
