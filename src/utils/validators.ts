export const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'Password must be 8+ characters';
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'With letters, numbers, and special character.';
  }
  return '';
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
