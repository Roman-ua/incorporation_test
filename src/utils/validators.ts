export const validatePassword = (password: string): string => {
  // if (password.length < 8) {
  //   return 'Password must be 8+ characters';
  // }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'Password must be 8+ characters with uppercase, lowercase, number, and special character.';
  }
  return '';
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isLatin = (text: string): boolean => {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(text);
};

export const isValidLinkedinUrl = (value: string): boolean => {
  return /(^|\b)(linkedin\.com\/(in\/)?[a-zA-Z0-9-_]+)/i.test(value);
};

export const isValidFacebookUrl = (value: string): boolean => {
  return /(^|\b)(facebook\.com\/[a-zA-Z0-9.]+)/i.test(value);
};

export const isValidXUrl = (value: string): boolean => {
  return /(^|\b)(x\.com\/[a-zA-Z0-9_]+)/i.test(value);
};

export const isValidTwitterUrl = (value: string): boolean => {
  return /(^|\b)(twitter\.com\/[a-zA-Z0-9_]+)/i.test(value);
};

export const isValidUrl = (value: string): boolean => {
  // return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
  //   value
  // );

  return value.startsWith('https://') || value.startsWith('http://');
};

// export const isValidTelegramUrl = (value: string): boolean => {
//   return value.startsWith('https://t.me');
// };
