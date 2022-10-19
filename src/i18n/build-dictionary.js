/**
 * Based on the locale passed as a paremeter, this function will return
 * the corresponding dictionary.
 *
 * @param {string} lang the lang of the user
 */
export const createDictionary = (lang) => (dico) =>
  Object.keys(dico).reduce((_, k) => {
    _[k] = dico[k][lang];
    return _;
  }, {});

/**
 * This function will return only the lang part of a locale
 * For example, with fr-FR, will return fr
 * If the lang is not fr, will return en
 * @param {string} lang the lang of the user
 */
//TODO Support EN mode (translate everything in the App including the survey)
export const getLang = (defaultLang) => 'fr';
// (defaultLang || navigator.language || navigator.browserLanguage).split(
//   '-'
// )[0] === 'fr'
//   ? 'fr'
//   : 'en';
