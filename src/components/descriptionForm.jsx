import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Picker } from 'react-native';
import { TextInput } from 'react-native-paper';
import OutlinedSelect from '@components/outlinedSelect';
import { colors } from '@src/colors';
import { PARTS_OF_SPEECH } from '@src/constants';
import { capitalize } from '@src/utils';

const DescriptionForm = ({
  id,
  language,
  body,
  part_of_speech,
  onChangeField,
}) => (
  <View style={styles.container}>
    <View style={styles.fieldset}>
      <View style={styles.fieldsetContainer}>
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Description"
          autoCapitalize="none"
          onChangeText={onChangeField('body')}
          value={body}
        />
        <OutlinedSelect
          label="Part of speech"
          selectedValue={part_of_speech}
          style={styles.picker}
          onValueChange={onChangeField('part_of_speech')}
        >
          {
            PARTS_OF_SPEECH[language].map((partOfSpeech) => (
              <Picker.Item key={partOfSpeech} label={capitalize(partOfSpeech)} value={partOfSpeech} />
            ))
          }
        </OutlinedSelect>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.listItemBorder,
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
});

DescriptionForm.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.number,
  body: PropTypes.string,
  part_of_speech: PropTypes.string,
  onChangeField: PropTypes.func.isRequired,
};

DescriptionForm.defaultProps = {
  id: 0,
  body: '',
  part_of_speech: '',
};

export default DescriptionForm;
