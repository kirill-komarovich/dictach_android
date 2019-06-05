import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { List, FAB } from 'react-native-paper';
import EmptyList from '@components/emptyList';
import ListFooter from '@components/listFooter';
import Loader from '@components/loader';
import { fetchAllDictionaries, refreshAllDictionaries } from '@src/actions/DictionariesActions';
import { colors } from '@src/colors';
import { openModal } from '@src/navigation';

const END_REACHED_THRESHOLD = 0.1;

class Dictionaries extends React.Component {
  state = {
    direction: 'asc',
    order: 'id',
    rowsPerPage: 17,
    page: 1,
    refreshing: false,
  }

  componentDidMount() {
    this.refreshDictionaries();
  }

  loadDictionaries = () => {
    const { actions: { fetchAllDictionaries } } = this.props;
    const { direction, order, rowsPerPage, page } = this.state;

    fetchAllDictionaries(page, rowsPerPage, order, direction);
  }

  refreshDictionaries = () => {
    const { actions: { refreshAllDictionaries } } = this.props;
    const { direction, order, rowsPerPage, page } = this.state;

    refreshAllDictionaries(page, rowsPerPage, order, direction).then(() => {
      this.setState({ refreshing: false });
    });
  }

  handleRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true,
    }, () => {
      this.refreshDictionaries();
    })
  }

  handleLoadMore = () => {
    const { dictionaries: { pages } } = this.props;
    const { page } = this.state;

    if (page + 1 <= pages) {
      this.setState(({ page }) => ({ page: page + 1 }), () => {
        this.loadDictionaries();
      })
    }
  }

  openFormModal = () => {
    openModal(
      'dictach.modal.dictionaryForm', {
      topBar: {
          title: {
            text: 'Add Dictionary',
          }
        }
      },
      { afterSubmit: this.handleRefresh, },
    )
  }

  renderListItem = ({ item: { id, title } }) => (
    <List.Item title={title} onPress={this.onItemPress(id)} />
  )

  onItemPress = (id) => () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: 'dictach.navigation.dictionary',
        passProps: {
          dictionaryId: id,
          onDeleteCallback: this.handleRefresh,
        },
      },
    })
  }

  render() {
    const { dictionaries: { all: dictionaries, loading } } = this.props;
    const { refreshing } = this.state;
    return refreshing ? (
      <View style={styles.container}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <View style={styles.container}>
        <FlatList
          data={dictionaries}
          renderItem={this.renderListItem}
          keyExtractor={({ id }) => id.toString()}
          ListEmptyComponent={
            <EmptyList message="You don`t have any dictionaries yet" />
          }
          ListFooterComponent={
            <ListFooter loading={loading} />
          }
          refreshing={refreshing}
          onRefresh={this.handleRefresh}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={END_REACHED_THRESHOLD}
        />
        <FAB style={styles.fab} icon="add" onPress={this.openFormModal} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  fab: {
    backgroundColor: colors.floatButtonBackground,
    bottom: 10,
    position: 'absolute',
    right: 20,
  },
});

Dictionaries.propTypes = {
  componentId: PropTypes.string.isRequired,
  dictionaries: PropTypes.shape({
    all: PropTypes.array.isRequired,
    pages: PropTypes.number.isRequired,
    records: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    fetchAllDictionaries: PropTypes.func.isRequired,
    refreshAllDictionaries: PropTypes.func.isRequired,
  }).isRequired,
}

function mapStateToProps({ dictionaries: { all, pages, records, loading } }) {
  return {
    dictionaries: { all, records, pages, loading },
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ fetchAllDictionaries, refreshAllDictionaries }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionaries);
