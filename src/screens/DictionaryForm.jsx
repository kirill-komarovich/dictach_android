import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  View,
  StyleSheet,
  Picker,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextInput, Button } from 'react-native-paper';
import OutlinedSelect from '@components/outlinedSelect';
import Loader from '@components/loader';
import { createDictionary } from '@src/actions/DictionariesActions';
import { colors } from '@src/colors';

const LANGUAGES = ['en', 'ru'];

class DictionaryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      language: props.language,
      menuVisible: false,
    }
  }

  languageInputRef = React.createRef()

  onCancel = () => {
    const { componentId } = this.props;
    Navigation.dismissModal(componentId);
  }

  onSubmit = () => {
    const { actions: { createDictionary } } = this.props;
    const { title, language } = this.state;
    createDictionary({ title, language }).then(() => {
      const { errors, afterSubmit } = this.props;
      if (!errors) {
        afterSubmit();
        this.onCancel();
      }
    })
  }

  openMenu = () => {
    this.languageInputRef.current.blur();
    this.setState({ menuVisible: true });
  }

  closeMenu = () => this.setState({ menuVisible: false })

  onChangeField = key => value => this.setState({ [key]: value })

  render() {
    const { edit, loading } = this.props;
    const { title, language, menuVisible } = this.state;
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
              {
                !edit && (
                  <OutlinedSelect
                    label="Language"
                    selectedValue={language}
                    style={styles.picker}
                    onValueChange={this.onChangeField('language')}
                  >
                    {
                      LANGUAGES.map((language) => (
                        <Picker.Item key={language} label={language} value={language} />
                      ))
                    }
                  </OutlinedSelect>
                )
              }
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

DictionaryForm.propTypes = {
  componentId: PropTypes.string.isRequired,
  title: PropTypes.string,
  language: PropTypes.oneOf(LANGUAGES),
  edit: PropTypes.bool,
  errors: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  afterSubmit: PropTypes.func,
  actions: PropTypes.shape({
    createDictionary: PropTypes.func.isRequired,
  }).isRequired,
};

DictionaryForm.defaultProps = {
  title: '',
  language: 'en',
  edit: false,
  afterSubmit: () => null,
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ createDictionary }, dispatch)
  };
}

function mapStateToProps({ dictionary: { errors, loading } }) {
  return {
    errors,
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryForm);
