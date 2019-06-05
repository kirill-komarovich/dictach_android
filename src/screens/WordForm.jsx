import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextInput, Button } from 'react-native-paper';
import Loader from '@components/loader';
import { createWord } from '@src/actions/WordsActions';
import { colors } from '@src/colors';

class WordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
    }
  }

  onCancel = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  }

  onSubmit = () => {
    const { dictionaryId, actions: { createWord } } = this.props;
    const { title } = this.state;

    createWord(dictionaryId, { title }).then(() => {
      const { errors, afterSubmit } = this.props;
      if (!errors) {
        afterSubmit();
        this.onCancel();
      }
    })
  }

  onChangeField = key => value => this.setState({ [key]: value })

  render() {
    const { loading } = this.props;
    const { title } = this.state;

    return loading ? (
      <View style={styles.loader}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <TouchableWithoutFeedback style={styles.touchable} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.fieldset}>
            <View style={styles.fieldsetContainer}>
              <TextInput
                mode="outlined"
                style={styles.input}
                label="Title"
                autoCapitalize="none"
                onChangeText={this.onChangeField('title')}
                value={title}
                autoFocus
              />
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              style={styles.button}
              color={colors.black}
              onPress={this.onCancel}
            >
              Cancel
            </Button>
            <Button
              mode="contained"
              style={styles.button}
              color={colors.primary}
              titleColor={colors.primaryText}
              onPress={this.onSubmit}
            >
              Submit
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginHorizontal: 40,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
  fieldset: {
    flexDirection: 'row',
  },
  fieldsetContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  input: {
    backgroundColor: colors.background,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
})

WordForm.propTypes = {
  componentId: PropTypes.string.isRequired,
  title: PropTypes.string,
  edit: PropTypes.bool,
  errors: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  afterSubmit: PropTypes.func,
  actions: PropTypes.shape({
    createWord: PropTypes.func.isRequired,
  }).isRequired,
};

WordForm.defaultProps = {
  title: '',
  edit: false,
  afterSubmit: () => null,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createWord }, dispatch)
  };
}

function mapStateToProps({ word: { errors, loading } }) {
  return {
    errors,
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
