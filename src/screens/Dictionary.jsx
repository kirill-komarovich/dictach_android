import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, RefreshControl, FlatList, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { FAB } from 'react-native-paper';
import Loader from '@components/loader';
import WordsList from '@components/wordsList';
import EmptyList from '@components/emptyList';
import ListFooter from '@components/listFooter';
import { fetchDictionary, destroyDictionary, updateDictionary } from '@src/actions/DictionariesActions';
import { createWord } from '@src/actions/WordsActions';
import { colors } from '@src/colors';
import { openModal } from '@src/navigation';
import { DEFAULT_RIGHT_BUTTONS_OPTIONS } from '@src/constants';

class Dictionary extends React.Component {
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

  updateNavigationTitle = () => {
    const { componentId, dictionary: { title } } = this.props;
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: title,
        },
      },
    })
  }

  componentDidMount() {
    this.fetchDictionary(this.updateNavigationTitle);
  }

  onRefresh = (callback = () => null) => {
    this.setState({ refreshing: true }, () => {
      this.fetchDictionary(() => {
        callback();
        this.setState({ refreshing: false })
      });
    })
  }

  fetchDictionary = (callback = () => null ) => {
    const { actions: { fetchDictionary }, dictionaryId } = this.props;
    fetchDictionary(dictionaryId).then(callback);
  }

  openFormModal = () => {
    const { dictionaryId, dictionary: { language }, actions: { createWord } } = this.props;

    openModal(
      'dictach.modal.wordForm',
      {
        topBar: {
          title: {
            text: 'Add Word',
          }
        }
      },
      {
        dictionaryId,
        language,
        afterSubmit: this.onRefresh,
        onSubmit: createWord,
      },
    );
  }

  handleAfterUpdate = () => {
    const { onUpdateCallback } = this.props;
    onUpdateCallback();
    this.onRefresh(this.updateNavigationTitle)
  }

  handleEdit = () => {
    const { dictionary: { id, title }, actions: { updateDictionary } } = this.props;
    openModal(
      'dictach.modal.dictionaryForm', {
        topBar: {
          title: {
            text: `Edit ${title}`,
          }
        }
      },
      {
        title,
        edit: true,
        afterSubmit: this.handleAfterUpdate,
        onSubmit: (dictionary) => updateDictionary(id, dictionary),
      },
    )
  }

  handleDelete = () => {
    const {
      componentId,
      dictionaryId,
      onDeleteCallback,
      actions: { destroyDictionary }
    } = this.props;

    destroyDictionary(dictionaryId).then(() => {
      onDeleteCallback();
      Navigation.pop(componentId);
    });
  }

  renderListItem = ({ item: letter }) => {
    const { componentId } = this.props;
    return (
      <WordsList
        key={letter}
        letter={letter}
        componentId={componentId}
      />)
  }

  render() {
    const { loading, dictionary: { alphabeth, language } } = this.props;
    const { refreshing } = this.state;
    return loading ? (
      <View style={styles.loader}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <RefreshControl style={styles.container} refreshing={refreshing} onRefresh={this.onRefresh}>
        <ScrollView>
          <Text style={styles.language}>Language: { language }</Text>
          <Text>Words</Text>
          <FlatList
            data={alphabeth}
            renderItem={this.renderListItem}
            keyExtractor={(letter) => letter}
            ListEmptyComponent={
              <EmptyList message="You don`t have any words yet" />
            }
            ListFooterComponent={<ListFooter />}
          />
        </ScrollView>
        <FAB style={styles.fab} icon="add" onPress={this.openFormModal} />
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
  fab: {
    backgroundColor: colors.floatButtonBackground,
    bottom: 10,
    position: 'absolute',
    right: 20,
  },
  language: {
    color: colors.black,
    fontSize: 18,
    paddingHorizontal: 4,
    paddingVertical: 20,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});

Dictionary.propTypes = {
  componentId: PropTypes.string.isRequired,
  dictionaryId: PropTypes.number.isRequired,
  dictionary: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    alphabeth: PropTypes.arrayOf(PropTypes.string).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    fetchDictionary: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps( { dictionary: { loading, ...dictionary} }) {
  return {
    dictionary,
    loading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchDictionary,
      destroyDictionary,
      updateDictionary,
      createWord,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
