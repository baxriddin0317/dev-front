/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@windmill/react-ui';

import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LabelArea from '../components/form/LabelArea';
import ImageLight from '../assets/img/create-account-office.jpeg';
import ImageDark from '../assets/img/create-account-dark.png';
import { handleSignup } from '../store/actions/authAction';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is a required field')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
  confirmpassword: Yup.string()
    .required('Confirm Password is required')
    .when('password', {
      is: (val) => !!(val && val.length > 0),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same'
      ),
    }),
});

function SignUp() {
  const auth = useSelector((state) => state.auth);
  const { loading } = auth;
  const { refcode } = useParams();
  const dispatch = useDispatch();
  const readonly = (id) => {
    document.getElementById(id).removeAttribute('readonly');
  };
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
                Create Account
              </h1>
              <Formik
                validationSchema={schema}
                initialValues={{
                  username: '',
                  name: '',
                  email: '',
                  password: '',
                  confirmpassword: '',
                  refcode,
                }}
                onSubmit={(values) => {
                  dispatch(handleSignup(values));
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
                        <LabelArea label="Name" />
                        <input
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => readonly('name')}
                          value={values.name}
                          placeholder="Enter your name"
                          id="name"
                          readOnly
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <p className="text-red-400 text-sm mt-2">
                          {errors.email && touched.email && errors.email}
                        </p>

                        <LabelArea label="Username" />
                        <input
                          type="text"
                          name="username"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => readonly('username')}
                          value={values.username}
                          placeholder="Enter your username"
                          id="username"
                          readOnly
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <p className="text-red-400 text-sm mt-2">
                          {errors.username &&
                            touched.username &&
                            errors.username}
                        </p>

                        <LabelArea label="Email" />
                        <input
                          type="email"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          onFocus={() => readonly('email')}
                          value={values.email}
                          placeholder="Enter email id "
                          id="email"
                          readOnly
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
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
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <p className="text-red-400 text-sm mt-2">
                          {errors.password &&
                            touched.password &&
                            errors.password}
                        </p>

                        <LabelArea label="Confirm Password" />
                        <input
                          type="password"
                          name="confirmpassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmpassword}
                          placeholder="Confirm Password"
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <div className="mt-6" />
                        <LabelArea label="Referral Code" />
                        <input
                          type="text"
                          name="refcode"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.refcode}
                          placeholder="Referral Code"
                          className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        />

                        <p className="text-red-400 text-sm mt-2">
                          {errors.confirmpassword &&
                            touched.confirmpassword &&
                            errors.confirmpassword}
                        </p>

                        <Button
                          type="submit"
                          disabled={loading}
                          className="mt-4 h-12 w-full bg-3bc48d hover:bg-[#3bc48d] active:bg-[#3bc48d]"
                          to="/dashboard"
                        >
                          SignUp
                        </Button>
                      </form>
                    </div>
                  </div>
                )}
              </Formik>
              <hr className="my-10" />
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-3bc48d dark:text-3bc48d hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
          {/* <main className="flex items-center justify-center p-6 sm:p-12 md:w-full">
            <div id="disableregistartion">
              <h1 className="text-center mb-1 text-2xl font-semibold text-gray-500 dark:text-gray-300">
                Registartion is currently <br /> disabled.
              </h1>
              <p className="text-center text-gray-400 mb-10">
                Please try again later
              </p>
              <Link
                to="/login"
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-3 rounded-lg text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-full"
              >
                Home
              </Link>
            </div>
          </main> */}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
