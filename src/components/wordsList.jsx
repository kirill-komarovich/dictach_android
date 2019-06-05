import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Loader from '@components/loader';
import { List } from 'react-native-paper';
import { fetchAllWordsByLetter } from '@src/actions/WordsActions';
import { colors } from '@src/colors';
import { capitalize } from '@src/utils';

class WordsList extends React.Component {
  state = {
    expanded: false,
    loaded: false,
    loading: false,
  }

  componentDidUpdate() {
    const { expanded, loaded, loading } = this.state;
    const {
      letter,
      actions: { fetchAllWordsByLetter },
      dictionaryId,
    } = this.props;
    if (expanded && !loaded && !loading) {
      this.setState({ loading: true }, () => {
        fetchAllWordsByLetter(dictionaryId, letter).then(() => {
          this.setState({ loaded: true, loading: false });
        });
      });
    }
  }

  handlePress = () => {
    this.setState(({ expanded }) => ({ expanded: !expanded }));
  }

  onItemPress = (id) => () => {
    const { componentId } = this.props;
    Navigation.push(componentId, {
      component: {
        name: 'dictach.navigation.word',
        passProps: {
          wordId: id,
        },
      },
    })
  }

  render() {
    const { words, letter } = this.props;
    const { expanded, loading, loaded } = this.state;

    return (
      <View style={styles.container}>
        <List.Accordion
          style={styles.accordion}
          title={capitalize(letter)}
          expanded={expanded}
          onPress={this.handlePress}
        >
          {
            expanded && !loaded || loading ? (
              <Loader styleAttr="Horizontal" />
            ) : words.map(({ id, title }) => (
              <List.Item key={id} title={title} onPress={this.onItemPress(id)} />
            ))
          }
        </List.Accordion>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: colors.whiteSmoke,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

WordsList.propTypes = {
};

function mapStateToProps( { words, dictionary: { id } }, { letter }) {
  return {
    words: words[letter] || [],
    dictionaryId: id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllWordsByLetter }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordsList);
