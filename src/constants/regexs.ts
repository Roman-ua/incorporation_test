export const VALIDATORS = {
  NAME: /^[a-zA-Z0-9.,\s-]+$/,
  COMPANY_NUMBER: /^[a-zA-Z0-9-]+$/,
  ZIP_CODE: /^[a-zA-Z0-9 ]{0,5}(-?[a-zA-Z0-9 ]{0,4})?$/,
  POSTAL_CODE: /^[a-zA-Z0-9 -]*$/, // eslint-disable-next-line no-control-regex
  LANGUAGE: /^[a-zA-Z0-9\s!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]*$/,
  NO_CYRILLIC: /^[^\u0400-\u04FF]*$/,
};
