import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, RefreshControl, FlatList, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Loader from '@components/loader';
import EmptyList from '@components/emptyList';
import ListFooter from '@components/listFooter';
import Description from '@components/description';
import { fetchWord, destroyWord } from '@src/actions/WordsActions';
import { fetchDictionary } from '@src/actions/DictionariesActions';
import { colors } from '@src/colors';
import { DEFAULT_RIGHT_BUTTONS_OPTIONS } from '@src/constants';


class Word extends React.Component {
  static options() {
    return {
      topBar: DEFAULT_RIGHT_BUTTONS_OPTIONS,
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
    };

    Navigation.events().bindComponent(this);
  }

  navigationButtonPressed({ buttonId }) {
    switch(buttonId) {
      case 'delete':
        this.handleDelete();
        break;
      case 'edit':
        this.handleEdit();
        break;
    }
  }

  componentDidMount() {
    this.fetchWord(() => {
      const { componentId, dictionaryTitle, word: { title } } = this.props;
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: `${dictionaryTitle} / ${title}`,
          },
        },
      })
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchWord(() => this.setState({ refreshing: false }));
    })
  }

  fetchWord = (callback = () => null ) => {
    const { actions: { fetchWord }, dictionaryId, wordId } = this.props;
    fetchWord(dictionaryId, wordId).then(callback);
  }

  handleDelete = () => {
    const {
      componentId,
      dictionaryId,
      wordId,
      actions: { destroyWord, fetchDictionary }
    } = this.props;

    destroyWord(dictionaryId, wordId).then(() => {
      fetchDictionary(dictionaryId);
      Navigation.pop(componentId);
    });
  }

  renderListItem = ({ item, index }) => {
    return ( <Description index={index} {...item} />)
  }

  render() {
    const { loading, word: { descriptions } } = this.props;
    const { refreshing } = this.state;

    return loading ? (
      <View style={styles.loader}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <RefreshControl style={styles.container} refreshing={refreshing} onRefresh={this.onRefresh}>
        <ScrollView>
          <FlatList
            data={descriptions}
            renderItem={this.renderListItem}
            keyExtractor={({ id }) => id.toString()}
            ListHeaderComponent={
              <Text style={styles.descriptions}>Descriptions</Text>
            }
            ListEmptyComponent={
              <EmptyList message="You don`t have any descriptions yet" />
            }
            ListFooterComponent={<ListFooter />}
          />
        </ScrollView>
      </RefreshControl>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
  descriptions: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

Word.propTypes = {
  componentId: PropTypes.string.isRequired,
  dictionaryId: PropTypes.number.isRequired,
  wordId: PropTypes.number.isRequired,
  word: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    descriptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    fetchWord: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps( { word: { loading, ...word }, dictionary: { id, title } }) {
  return {
    word,
    loading,
    dictionaryId: id,
    dictionaryTitle: title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchWord, destroyWord, fetchDictionary }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Word);
