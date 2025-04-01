import React, { type ChangeEvent, useState } from 'react';
import logo from '../../images/shared/bluelogo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AnimatedUnderlineButton } from '../../components/shared/AnimatedUnderlineBtn';
import { validateEmail, validatePassword } from '../../utils/validators';
import { classNames } from '../../utils/helpers';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const AuthFlow = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [error, setError] = useState('');
  const [nameError, setNameError] = useState(false);
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleBlurPassword = () => {
    const validationError = validatePassword(formData.password);
    setErrorPassword(isSignIn ? 'Incorrect password.' : validationError);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setFormData((prevState) => ({ ...prevState, password: value }));

    if (errorPassword) {
      setErrorPassword('');
    }
  };

  const handleBlurEmail = () => {
    if (validateEmail(formData.email)) {
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, email: value }));

    if (error) {
      setError('');
    }
  };

  const handleBlurName = () => {
    if (!formData.name.length) {
      setNameError(true);
    }
  };
  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, name: value }));

    if (nameError) {
      setNameError(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validatePassword(formData.password);
    if (validationError) {
      setErrorPassword(isSignIn ? 'Incorrect password.' : validationError);
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
    }
    if (!formData.name.length) {
      setNameError(true);
    }

    const form = e.currentTarget;
    const isValid = form.checkValidity();

    if (!isValid) {
      console.log('form is not valid');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setSuccess(true);

    // Reset success state after showing success animation
    setTimeout(() => {
      setSuccess(false);
      setFormData({ email: '', password: '', name: '' });
    }, 2000);
  };

  const toggleView = () => {
    setIsSignIn(!isSignIn);
    setFormData({ email: '', password: '', name: '' });
    setError('');
    setNameError(false);
    setErrorPassword('');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 overflow-hidden">
      <div className="w-full max-w-md">
        <div className="w-full flex items-center justify-center mb-8">
          <img src={logo || '/placeholder.svg'} alt="logo" className="w-52" />
        </div>
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-white p-8 shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900">
                {isSignIn ? 'Welcome back!' : 'Account created!'}
              </h2>
              <p className="text-center text-gray-500">
                {isSignIn
                  ? 'You have successfully signed in.'
                  : 'Your account has been created successfully.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="overflow-hidden rounded-lg bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            >
              <div className="relative">
                <div className="absolute left-0 top-0 p-4">
                  {!isSignIn && (
                    <button
                      onClick={toggleView}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </button>
                  )}
                </div>
                <div className="p-8 pt-12 text-center">
                  <h1 className="text-2xl font-medium text-gray-900">
                    {isSignIn ? 'Sign in' : 'Create account'}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    {isSignIn
                      ? 'Sign in to access your account'
                      : 'Sign up to get started with our service'}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 pt-0" noValidate>
                <div>
                  <AnimatePresence>
                    {!isSignIn && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 relative"
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          value={formData.name}
                          onBlur={handleBlurName}
                          onChange={handleChangeName}
                          placeholder="Enter your name"
                          required={!isSignIn}
                          className={classNames(
                            nameError
                              ? 'border-red-400 border-2 focus:border-red-500 focus:ring-red-500 focus:outline-red-500'
                              : 'border-gray-300 focus:border-gray-500  focus:ring-black focus:outline-black',
                            'h-12 w-full rounded-md border px-4 shadow-sm'
                          )}
                        />
                        {nameError && (
                          <p
                            className="absolute font-medium text-sm text-red-700 -bottom-6"
                            id="email-error"
                          >
                            Please provide your first and last name.
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div className="relative space-y-2 mt-8">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onBlur={handleBlurEmail}
                      value={formData.email}
                      onChange={handleChangeEmail}
                      placeholder="Enter your email"
                      required
                      className={classNames(
                        error
                          ? 'border-red-400 border-2 focus:border-red-500 focus:ring-transparent'
                          : 'border-gray-300 focus:border-gray-500  focus:ring-black',
                        'h-12 w-full rounded-md border px-4 shadow-sm'
                      )}
                    />
                    {error && (
                      <p
                        className="absolute font-medium text-sm text-red-700 -bottom-6"
                        id="email-error"
                      >
                        {error}
                      </p>
                    )}
                  </div>
                  <motion.div className="space-y-2 mt-8">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      {isSignIn && (
                        <Link
                          to={ROUTES.RECOVERY_PASS}
                          className="text-xs font-normal text-gray-600 hover:text-gray-800 hover:underline"
                        >
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onBlur={handleBlurPassword}
                        onChange={handleChangePassword}
                        placeholder="Enter your password"
                        required
                        className={classNames(
                          errorPassword
                            ? 'border-red-400 border-2 focus:border-red-500 focus:ring-transparent'
                            : 'border-gray-300 focus:border-gray-500  focus:ring-black',
                          'h-12 w-full rounded-md border px-4 shadow-sm'
                        )}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-0 top-0 flex h-full items-center px-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                        <span className="sr-only">
                          {showPassword ? 'Hide password' : 'Show password'}
                        </span>
                      </button>
                      {errorPassword && (
                        <motion.div
                          className={classNames(
                            'absolute font-medium text-sm text-red-700',
                            isSignIn ? '-bottom-6' : '-bottom-11'
                          )}
                          id="pass-error"
                        >
                          {errorPassword}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                  <motion.div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={classNames(
                        'flex h-12 w-full items-center justify-center rounded-md bg-gray-900 font-medium text-white shadow-sm transition-all duration-200 focus:outline-none',
                        !isSignIn && errorPassword ? 'mt-14 ' : 'mt-8',
                        isLoading ? 'cursor-not-allowed opacity-70' : ''
                      )}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {isSignIn ? 'Sign in' : 'Create account'}
                    </button>
                  </motion.div>
                  {!isSignIn && (
                    <motion.div className="last:mt-4">
                      <div className="text-xs text-gray-500 text-center">
                        By continuing, you agree to the
                        <a
                          className="font-medium hover:text-gray-600 transition-all ease-in-out duration-150 mx-1"
                          rel="noreferrer"
                          href="https://incorporatenow.com/terms"
                          target="_blank"
                        >
                          Terms
                        </a>
                        and
                        <a
                          className="font-medium hover:text-gray-600 transition-all ease-in-out duration-150 ml-1"
                          rel="noreferrer"
                          href="https://incorporatenow.com/privacy-policy"
                          target="_blank"
                        >
                          Privacy Policy
                        </a>
                        .
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 text-center text-sm">
                  <p className="text-gray-500">
                    {isSignIn
                      ? "Don't have an account?"
                      : 'Already have an account?'}
                    <AnimatedUnderlineButton
                      onClick={toggleView}
                      className="ml-1"
                    >
                      {isSignIn ? 'Sign up' : 'Sign in'}
                    </AnimatedUnderlineButton>
                  </p>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthFlow;
