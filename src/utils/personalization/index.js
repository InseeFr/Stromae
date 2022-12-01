import { getLang } from 'i18n/build-dictionary';
import { fr, enUS } from 'date-fns/locale';

export const buildBuidings = (variables) => {
  if (Array.isArray(variables)) {
    return variables.reduce((acc, { name, value }) => {
      acc[name] = value;
      return acc;
    }, {});
  }
  return {};
};

export const buildDefaultBindings = (bindingDependencies) => {
  if (Array.isArray(bindingDependencies)) {
    return bindingDependencies.reduce((acc, name) => {
      acc[name] = null;
      return acc;
    }, {});
  }
  return {};
};

export const dateFnsLocal = getLang() === 'fr' ? fr : enUS;

export const formatLocal =
  getLang() === 'fr' ? 'dd/MM/yyyy à HH:mm' : 'dd/MM/yyyy HH:mm a';
