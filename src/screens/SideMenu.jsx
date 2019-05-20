import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from '@components/listItem';
import { colors } from '@src/colors';

class SideMenu extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      choosenId: 1,
    };
  }

  renderListItem = ({ item: { id, title } }) => (
    <ListItem style={{ backgroundColor: this.state.choosenId === id ? colors.selectedListItem 
      : colors.background }} title={title}
     onPress={() => this.listItemPressed(id)} />
  )

  listItemPressed = (id) => {
    this.setState({ choosenId: id });
  }

  render() {
    const { optionTitles } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={optionTitles}
          renderItem={this.renderListItem}
          extraData={this.state}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
});

SideMenu.propTypes = {
  optionTitles: PropTypes.any.isRequired
};

export default (SideMenu);
