import React, { ChangeEvent, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { AnimatedUnderlineButton } from '../../components/shared/AnimatedUnderlineBtn';
import { validateEmail, validatePassword } from '../../utils/validators';

const AuthFlow = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [errorPassword, setErrorPassword] = useState<string>('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleBlurEmail = () => {
    if (validateEmail(formData.email)) {
      setError('');
    } else {
      setError('Email не валиден');
    }
  };

  const handleBlurPassword = () => {
    const validationError = validatePassword(formData.password);
    setErrorPassword(validationError);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setFormData((prevState) => ({ ...prevState, password: value }));

    if (errorPassword) {
      setErrorPassword('');
    }
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, email: value }));

    if (error) {
      setError('');
    }
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prevState) => ({ ...prevState, name: value }));

    if (error) {
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="overflow-hidden rounded-lg bg-white shadow-lg"
            >
              <div className="relative">
                <div className="absolute left-0 top-0 p-4">
                  {!isSignIn && (
                    <button
                      onClick={toggleView}
                      className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
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

              <form onSubmit={handleSubmit} className="p-8 pt-0">
                <div className="space-y-4">
                  <AnimatePresence>
                    {!isSignIn && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
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
                          onChange={handleChangeName}
                          placeholder="Enter your name"
                          required={!isSignIn}
                          className="h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500/50"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isSignIn ? 0 : 0.1 }}
                  >
                    <div className="relative space-y-2">
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
                        className="h-12 w-full rounded-md border border-gray-300 px-4 shadow-sm transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500/50"
                      />
                      {error && (
                        <p
                          className="absolute text-xs text-red-500 -bottom-5"
                          id="email-error"
                        >
                          Not a valid email address.
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isSignIn ? 0.1 : 0.2 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between mt-6">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      {isSignIn && (
                        <button
                          type="button"
                          className="text-xs font-normal text-gray-600 hover:text-gray-800 hover:underline"
                        >
                          Forgot password?
                        </button>
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
                        className="h-12 w-full rounded-md border border-gray-300 px-4 pr-10 shadow-sm transition-all duration-200 focus:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500/50"
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
                        <p
                          className="absolute text-xs text-red-500 -bottom-5"
                          id="email-error"
                        >
                          {errorPassword}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: isSignIn ? 0.2 : 0.3 }}
                  >
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-8 flex h-12 w-full items-center justify-center rounded-md bg-gray-900 font-medium text-white shadow-sm transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${
                        isLoading ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      {isSignIn ? 'Sign in' : 'Create account'}
                    </button>
                  </motion.div>
                </div>

                <div className="mt-6 text-center text-sm">
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
