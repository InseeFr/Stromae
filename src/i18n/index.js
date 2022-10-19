import { createDictionary, getLang } from './build-dictionary';
import dictionary from './dictionary';
import errorMessage from './errorMessage';
import buttonMessage from './buttonMessage';
import burgerMessage from './burgerMenu';
import visualizeMessage from './visualizeMessage';
import {
	getWelcomePageMessage,
	getValidationPageMessage,
	getEndPageMessage,
} from './genericPages';
import { getConfirmationMessage } from './confirmationMessage';

export const errorDictionary = createDictionary(getLang())(errorMessage);
export const buttonDictionary = createDictionary(getLang())(buttonMessage);
export const visualizeDictionary = createDictionary(getLang())(
	visualizeMessage
);
export const defaultDictionary = createDictionary(getLang())(dictionary);

export const burgerDictionary = createDictionary(getLang())(burgerMessage);

export const welcomePageDictionary = (inseeContext) =>
	createDictionary(getLang())(getWelcomePageMessage(inseeContext));

export const validationPageDictionary = (inseeContext) =>
	createDictionary(getLang())(getValidationPageMessage(inseeContext));

export const endPageDictionary = (inseeContext) =>
	createDictionary(getLang())(getEndPageMessage(inseeContext));

export const confirmationDictionary = (inseeContext) =>
	createDictionary(getLang())(getConfirmationMessage(inseeContext));
