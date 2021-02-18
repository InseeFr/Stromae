import { createDictionary, getLang } from './build-dictionary';
import dictionary from './dictionary';
import errorMessage from './errorMessage';
import buttonMessage from './buttonMessage';
import visualizeMessage from './visualizeMessage';
import {
  getWelcomePageMessage,
  getValidationPageMessage,
} from './genericPages';

export const errorDictionary = createDictionary(getLang())(errorMessage);
export const buttonDictionary = createDictionary(getLang())(buttonMessage);
export const visualizeDictionary = createDictionary(getLang())(
  visualizeMessage
);
export const defaultDictionary = createDictionary(getLang())(dictionary);

export const welcomePageDictionary = inseeContext =>
  createDictionary(getLang())(getWelcomePageMessage(inseeContext));

export const validationPageDictionary = inseeContext =>
  createDictionary(getLang())(getValidationPageMessage(inseeContext));
