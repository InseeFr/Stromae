import { getLang } from 'i18n/build-dictionary';
import { fr, enUS } from 'date-fns/locale';

export const buildBuidings = variables =>
  variables.reduce((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});

export const dateFnsLocal = getLang() === 'fr' ? fr : enUS;

export const formatLocal =
  getLang() === 'fr' ? 'dd/MM/yyyy à HH:mm' : 'dd/MM/yyyy HH:mm a';
