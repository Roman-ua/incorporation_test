import React, { type ChangeEvent, useState } from 'react';
import logo from '../../images/shared/bluelogo.svg';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { validateEmail } from '../../utils/validators';
import { classNames } from '../../utils/helpers';
import { AnimatedUnderlineButton } from '../../components/shared/AnimatedUnderlineBtn';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/navigation/routes';

const RecoverPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const navigate = useNavigate();

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const isValid = form.checkValidity();

    if (!isValid) {
      setError('Please enter a valid email address.');
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
              <h2 className="text-2xl font-medium text-gray-900">Success!</h2>
              <p className="text-center text-gray-500">
                Your request successfully sent
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              className="overflow-hidden rounded-lg bg-white shadow-[0_0_15px_rgba(0,0,0,0.1)]"
            >
              <div className="relative">
                <div className="p-8 pt-12 text-center">
                  <h1 className="text-2xl font-medium text-gray-900">
                    Forgot your password?
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    We will help you to create new!
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-8 pt-0" noValidate>
                <div className="space-y-8">
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
                  <motion.div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`mt-8 flex h-12 w-full items-center justify-center rounded-md bg-gray-900 font-medium text-white shadow-sm transition-all duration-200 focus:outline-none ${
                        isLoading ? 'cursor-not-allowed opacity-70' : ''
                      }`}
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : null}
                      Reset Password
                    </button>
                  </motion.div>
                  <div className="mt-8 text-center text-sm">
                    <p className="text-gray-500">
                      Think you remember your password?
                      <AnimatedUnderlineButton
                        onClick={() => navigate(ROUTES.LOGIN)}
                        className="ml-1"
                      >
                        Sign in
                      </AnimatedUnderlineButton>
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecoverPasswordPage;
