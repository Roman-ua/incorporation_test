export const validatePassword = (password: string): string => {
  if (password.length < 8) {
    return 'Minimum number of characters 8';
  }
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return 'The password must contain letters and numbers';
  }
  return '';
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
