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
