import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, Picker, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';
import OutlinedInput from '@components/outlinedInput';
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
    }
  }

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

  onChangeField = (key, value) => this.setState({ [key]: value })

  render() {
    const { edit, loading } = this.props;
    const { title, language } = this.state;
    return loading ? (
      <View style={styles.loader}>
        <Loader styleAttr="Large" />
      </View>
    ) : (
      <TouchableWithoutFeedback style={styles.touchable} onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.fieldset}>
            <View style={styles.fieldsetContainer}>
              <OutlinedInput
                label="Title"
                autoCapitalize="none"
                onChangeText={(value) => this.onChangeField('title', value)}
                value={title}
                autoFocus
              />
              {
                !edit && (
                  <OutlinedSelect
                    label="Language"
                    selectedValue={language}
                    style={styles.picker}
                    onValueChange={(value) => this.onChangeField('language', value)}
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
            <TextButton
              style={styles.button}
              title="Cancel"
              color={colors.background}
              titleColor={colors.black}
              onPress={this.onCancel}
            />
            <RaisedTextButton
              style={styles.button}
              title="Submit"
              color={colors.primary}
              titleColor={colors.primaryText}
              onPress={this.onSubmit}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  button: {
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
