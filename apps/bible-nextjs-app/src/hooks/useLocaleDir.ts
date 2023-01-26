import { useIntl } from 'react-intl';

import { isRtlLang } from 'rtl-detect';

export const useLocaleDir = () => {
  const intl = useIntl();
  return isRtlLang(intl.locale) ? 'rtl' : 'ltr';
};
