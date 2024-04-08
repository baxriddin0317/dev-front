import React, { useEffect, useContext } from 'react';
import { Button, WindmillContext } from '@windmill/react-ui';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import LabelArea from '../components/form/LabelArea';
import PageTitle from '../components/Typography/PageTitle';
import { updateProfile, getNFTHolder } from '../store/actions/userAction';
import CountryList from '../utils/countryList';
import userimg from '../assets/img/user.png';

// Creating schema
const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name Required'),
  email: Yup.string().email('Invalid email format').required(),
  username: Yup.string(),
  wallet: Yup.string().matches(/^T(.*)/, 'Must start with letter T'),
  phone: Yup.string(),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
  ),
});

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    width: state.selectProps.width,
    color: 'black',
    padding: 10,
  }),
  control: () => ({
    display: 'flex',
    border: '1px solid white',
    borderRadius: '0.25rem',
    // padding: 6,
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const { mode } = useContext(WindmillContext);
    const transition = 'opacity 300ms';
    const color = mode === 'dark' ? '#fff' : '#000';

    return { ...provided, opacity, transition, color };
  },
};

function EditProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { NFT } = user;

  useEffect(() => {
    dispatch(getNFTHolder());
  }, []);

  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        email: '',
        name: '',
        username: '',
        phone: '',
        wallet: '',
        country: '',
        address: '',
      }}
      onSubmit={(values) => {
        dispatch(updateProfile(values));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
      }) => {
        useEffect(() => {
          const adminInfo = JSON.parse(localStorage.getItem('user_detail'));

          setFieldValue('name', adminInfo.name, false);
          setFieldValue('wallet', adminInfo.wallet, false);
          setFieldValue('email', adminInfo.email, false);
          setFieldValue('phone', adminInfo.phone, false);
          setFieldValue('country', adminInfo.country, false);
          setFieldValue('address', adminInfo.address, false);
          setFieldValue('username', adminInfo.username, false);
        }, []);
        return (
          <>
            <div className="flex items-center justify-between">
              <PageTitle>Edit Profile</PageTitle>
              <Button
                type="submit"
                onClick={handleSubmit}
                className="h-12 w-44"
              >
                Update Profile
              </Button>
            </div>
            <div className="container mx-auto dark:text-gray-300 rounded-lg">
              <form
                noValidate
                className="shadow-md bg-white dark:bg-gray-800 dark:text-gray-300 px-3 py-3 "
              >
                <div className="grid lg:grid-cols-12 sm:grid-cols-1 gap-6 mb-6">
                  <div className="col-span-6 dark:bg-gray-800 px-3 py-3">
                    <div className="userbg w-36 mx-auto my-0 text-center pb-6 relative">
                      <img src={userimg} alt="" className="w-36 inline" />
                      <input
                        type="file"
                        className="absolute left-0 top-0 z-10 w-full h-full"
                        accept="image/*"
                      />
                    </div>
                    <LabelArea label="Name" />
                    <div className="col-span-12 sm:col-span-12">
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        placeholder="Your Name"
                        id="name"
                        className="border rounded h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />

                      <p className="text-red-400 text-sm mt-3">
                        {errors.name && touched.name && errors.name}
                      </p>
                    </div>

                    <LabelArea label="Email" />
                    <div className="col-span-8 sm:col-span-4">
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        disabled
                        placeholder="Enter email"
                        id="email"
                        className="border rounded h-12 text-sm focus:outline-none block w-full bg-gray-300 dark:bg-gray-500 dark:border-white px-3 focus:bg-white"
                      />

                      <p className="text-red-400 text-sm mt-3">
                        {errors.email && touched.email && errors.email}
                      </p>
                    </div>
                    <LabelArea label="Username" />
                    <div className="col-span-8 sm:col-span-4">
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Enter username / nickname"
                        id="username"
                        className="border rounded h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />

                      <p className="text-red-400 text-sm mt-3">
                        {errors.username && touched.username && errors.username}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-6 dark:bg-gray-800 px-3 py-3">
                    <LabelArea label="Phone Number" />
                    <div className="col-span-8 sm:col-span-4">
                      <input
                        type="text"
                        name="phone"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phone}
                        placeholder="Your phone"
                        id="phone"
                        className="border rounded h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />

                      <p className="text-red-400 text-sm mt-3">
                        {errors.phone && touched.phone && errors.phone}
                      </p>
                    </div>

                    <LabelArea label="Wallet Address" />
                    <div className="col-span-8 sm:col-span-4">
                      <input
                        type="text"
                        name="wallet"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.wallet}
                        placeholder="*********************************"
                        id="wallet"
                        className="border rounded h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />

                      <p className="text-red-400 text-sm mt-3">
                        {errors.wallet && touched.wallet && errors.wallet}
                      </p>
                    </div>
                    {NFT !== undefined && (
                      <>
                        <LabelArea label="Personal NFTS" />
                        <div className="col-span-8 sm:col-span-4">
                          {NFT.length > 0 &&
                            NFT.map((sub) => (
                              <div
                                style={{
                                  display: 'flex',
                                  'justify-content': 'space-around',
                                }}
                              >
                                <div>
                                  <b>{sub.balance}x</b> Metronix
                                  {sub.holder_type == 'VIP'
                                    ? ' VIP Club'
                                    : ' Trading Club'}
                                </div>
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                    <LabelArea label="Country" />
                    <div className="col-span-8 sm:col-span-4  mb-3 rounded">
                      <Select
                        name="country"
                        styles={customStyles}
                        className="dark:bg-gray-800 rounded border border-solid border-[#ccc] "
                        id="country"
                        placeholder="Select Country"
                        options={CountryList}
                        value={values.country}
                        onChange={(selectedOption) => {
                          setFieldValue('country', selectedOption, false);
                        }}
                        onBlur={() => {
                          handleBlur({ target: { name: 'country' } });
                        }}
                      />
                      <p className="text-red-400 text-sm mt-3">
                        {errors.country && touched.country && errors.country}
                      </p>
                    </div>
                    <LabelArea label="Address" />
                    <div className="col-span-8 sm:col-span-4">
                      <textarea
                        id="address"
                        name="address"
                        rows="4"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className="border rounded h-30 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />
                      <p className="text-red-400 text-sm mt-3">
                        {errors.address && touched.address && errors.address}
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        );
      }}
    </Formik>
  );
}

export default EditProfile;
