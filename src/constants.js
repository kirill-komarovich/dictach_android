import { colors } from '@src/colors';

export const PARTS_OF_SPEECH = {
  en: [
    'noun',
    'verb',
    'adjective',
    'numeral',
    'pronoun',
    'adverb',
    'article',
    'preposition',
    'conjunction',
    'interjection',
  ],
  ru: [
    'noun',
    'verb',
    'adjective',
    'numeral',
    'pronoun',
    'participle',
    'verbal_adverb',
    'adverb',
    'preposition',
    'conjunction',
    'particle',
    'interjection',
  ],
};

export const DEFAULT_RIGHT_BUTTONS_OPTIONS = {
  rightButtonColor: colors.white,
  rightButtons: [
    {
      id: 'delete',
      text: 'Delete',
      showAsAction: 'never',
    },
    {
      id: 'edit',
      text: 'Edit',
      showAsAction: 'never',
    },
  ],
};
