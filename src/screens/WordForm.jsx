import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextInput, Button } from 'react-native-paper';
import Swipeout from 'react-native-swipeout';
import Loader from '@components/loader';
import DescriptionForm from '@components/descriptionForm';
import { resetLoading } from '@src/actions/WordsActions';
import { colors } from '@src/colors';
import { PARTS_OF_SPEECH } from '@src/constants';

const DEFAULT_DESCRIPTION = {
  id: null,
  body: '',
  part_of_speech: '',
  _destroy: false,
};

class WordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      descriptions: props.descriptions,
    };

    props.actions.resetLoading();
  }

  onCancel = () => {
    const { componentId } = this.props;
    Keyboard.dismiss();
    Navigation.dismissModal(componentId);
  }

  onSubmit = () => {
    const { dictionaryId, onSubmit } = this.props;
    const { title, descriptions } = this.state;

    const word = { title, descriptions_attributes: descriptions };
    onSubmit(dictionaryId, word).then(() => {
      const { errors, afterSubmit } = this.props;
      Keyboard.dismiss();
      if (!errors) {
        afterSubmit();
        this.onCancel();
      }
    })
  }

  onChangeField = key => value => this.setState({ [key]: value })

  addDescription = () => {
    const { language } = this.props;
    const { descriptions } = this.state;

    const updatedDescriptions = [
      ...descriptions,
      { ...DEFAULT_DESCRIPTION, part_of_speech: PARTS_OF_SPEECH[language][0]}
    ]

    this.setState({ descriptions: updatedDescriptions });
  }

  onDescriptionFieldChange = (index) => (type) => (value) => {
    const { descriptions } = this.state;

    const updatedDescription = { ...descriptions[index] };
    updatedDescription[type] = value;

    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = updatedDescription;

    this.setState({ descriptions: updatedDescriptions });
  }

  onDescriptionDelete = (key) => () => {
    const { descriptions } = this.state;

    const description = { ...descriptions[key] };
    description._destroy = true;
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[key] = description;
    this.setState({ descriptions: updatedDescriptions });
  }

  getSwipeoutButtons = (key) => [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: this.onDescriptionDelete(key),
    }
  ]

  renderDescriptions = () => {
    const { language } = this.props;
    const { descriptions } = this.state;
    return descriptions.length > 0 && (
      <View style={styles.descriptions}>
        {
          descriptions.map(({ body, part_of_speech, _destroy }, key) => !_destroy && (
            <Swipeout
              key={key}
              right={this.getSwipeoutButtons(key)}
              autoClose={true}
              backgroundColor="transparent"
            >
              <DescriptionForm
                language={language}
                body={body}
                part_of_speech={part_of_speech}
                onChangeField={this.onDescriptionFieldChange(key)}
              />
            </Swipeout>
          ))
        }
      </View>
    )
  }

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
          <ScrollView>
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
              { this.renderDescriptions() }
            <Button onPress={this.addDescription}>
              Add Description
            </Button>
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
          </ScrollView>
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
    marginBottom: 40,
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'flex-start',
  },
  descriptions: {
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
    marginBottom: 20,
    marginHorizontal: 10,
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
})

WordForm.propTypes = {
  componentId: PropTypes.string.isRequired,
  title: PropTypes.string,
  errors: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  afterSubmit: PropTypes.func,
  actions: PropTypes.shape({
    createWord: PropTypes.func.isRequired,
  }).isRequired,
};

WordForm.defaultProps = {
  title: '',
  descriptions: [],
  afterSubmit: () => null,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ resetLoading }, dispatch)
  };
}

function mapStateToProps({ word: { errors, loading } }) {
  return {
    errors,
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
