import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyleSheet, View, Text, RefreshControl } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Loader from '@components/loader';
import ExpandableList from '@components/expandableList';
import { fetchDictionary } from '@src/actions/DictionariesActions';
import { colors } from '@src/colors';

class Dictionary extends React.Component {
  state = {
    refreshing: false,
  }

  componentDidMount() {
    this.fetchDictionary(() => {
      const { componentId, dictionary: { title } } = this.props;
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: title,
          },
        },
      })
    });
  }

  onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.fetchDictionary(() => this.setState({ refreshing: false }));
    })
  }

  fetchDictionary = (callback = () => null ) => {
    const { actions: { fetchDictionary }, dictionaryId } = this.props;
    fetchDictionary(dictionaryId).then(callback);
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
        <Text style={styles.language}>Language: { language }</Text>
        {
          alphabeth.map((letter) => (
            <ExpandableList key={letter} title={letter}>
              <Text>Words</Text>
            </ExpandableList>
          ))
        }
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
    actions: bindActionCreators({ fetchDictionary }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);
