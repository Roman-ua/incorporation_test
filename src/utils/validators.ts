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
  return value.startsWith('https://www.linkedin.com/in');
};

export const isValidFacebookUrl = (value: string): boolean => {
  return value.startsWith('https://www.facebook.com');
};

export const isValidXUrl = (value: string): boolean => {
  return value.startsWith('https://x.com');
};

// export const isValidTelegramUrl = (value: string): boolean => {
//   return value.startsWith('https://t.me');
// };
