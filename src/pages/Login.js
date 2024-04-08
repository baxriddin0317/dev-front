import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@windmill/react-ui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import LabelArea from '../components/form/LabelArea';
import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { handleLogin } from '../store/actions/authAction';

// Creating schema
function Login() {
  const auth = useSelector((state) => state.auth);
  const { loading } = auth;
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    email: Yup.string()
      .required('Email is a required field')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Password is a required field')
      .min(8, 'Password must be at least 8 characters'),
  });

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                Login
              </h1>

              <Formik
                validationSchema={schema}
                initialValues={{ email: '', password: '', code: '' }}
                onSubmit={(values) => {
                  dispatch(handleLogin(values));
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <div className="login">
                    <div className="form">
                      <form noValidate onSubmit={handleSubmit}>
                        <LabelArea label="Email" />

                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          placeholder="Enter email id"
                          id="email"
                          className="border h-12 text-sm block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <p className="text-red-400 text-sm mt-2">
                          {errors.email && touched.email && errors.email}
                        </p>

                        <div className="mt-6" />
                        <LabelArea label="Password" />
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          placeholder="Enter password"
                          className="border h-12 text-sm block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        {auth.auth2fa && (
                          <div>
                            <div className="mt-6" />
                            <LabelArea label="2FA" />
                            <input
                              type="text"
                              name="code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.code}
                              placeholder="Enter Authenticator Code"
                              className="border h-12 text-sm block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                            />
                          </div>
                        )}

                        <p className="text-red-400 text-sm mt-2">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 duration-150 font-medium  px-4 py-2 rounded-lg text-sm text-white bg-3bc48d border border-transparent active:bg-[#3bc48d] hover:bg-[#3bc48d] mt-4 h-12 w-full"
                          to="/dashboard"
                        >
                          Log in
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-3bc48d dark:text-3bc48d hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-3bc48d dark:text-3bc48d hover:underline"
                  to="/signup"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
