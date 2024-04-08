import React, { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  // getCreateBotSettings,
  updateCreateBotSettings,
} from 'store/actions/userSettingsAction';
import { useDispatch, useSelector } from 'react-redux';
import 'styles/botSettings.scss';
// Creating schema
const schema = Yup.object().shape({
  lot: Yup.string().required('Lot is a required field'),
  stepPercentage: Yup.string().required('Step Percentage is a required field'),
  startPricePercentage: Yup.string().required(
    'Start Price Percentage is a required field'
  ),
  option: Yup.string().required('Step Percentage is a required field'),
});

function CreateBotSettings() {
  const dispatch = useDispatch();
  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{
          lot: '',
          stepPercentage: '',
          startPricePercentage: '',
          option: '',
          amount: '',
        }}
        onSubmit={(values) => {
          dispatch(updateCreateBotSettings(values));
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
          const { botSettings } = useSelector((state) => state.settings);

          useEffect(() => {
            // dispatch(getCreateBotSettings());
            setFieldValue('lot', botSettings.lot, false);
            setFieldValue('stepPercentage', botSettings.stepPercentage, false);
            setFieldValue(
              'startPricePercentage',
              botSettings.startPricePercentage,
              false
            );
            setFieldValue('option', botSettings.option, false);
          }, [botSettings.lot]);
          return (
            <div className="">
              <div className="py-5">
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  // id="botsettings"
                  className="flex items-end"
                >
                  <div className="grid grid-cols-2 gap-[0.7rem] md:grid-cols-6 ">
                    <div className="relative">
                      {/* <label htmlFor="lot">Lot</label> */}
                      <label
                        htmlFor="name"
                        className="absolute bg-gray-100 md:text-[10px] text-[6px] -top-2 left-2 inline-block  dark:bg-gray-800 dark:text-white leading-4 font-medium text-gray-900"
                      >
                        Lot
                      </label>
                      <input
                        type="text"
                        name="lot"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lot}
                        // placeholder="Lot"
                        // className="border h-6 text-sm focus:outline-none block w-2/6 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                        className="block w-full h-8 text-sm rounded-md text-[#00e5a5] border-0 pl-3 py-1 bg-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                        id="lot"
                      />
                      <p className="error">
                        {errors.lot && touched.lot && errors.lot}
                      </p>
                    </div>
                    <div className="relative">
                      {/* <label htmlFor="stepPercentage">Step Percentage</label> */}
                      <label
                        htmlFor="name"
                        className="absolute md:text-[10px] text-[6px] -top-2 left-2 inline-block bg-gray-100 dark:bg-gray-800 dark:text-white leading-4 font-medium text-gray-900"
                      >
                        Step %
                      </label>
                      <input
                        type="text"
                        name="stepPercentage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.stepPercentage}
                        // placeholder="Step Percentage"
                        // className="border h-6 text-sm focus:outline-none block w-2/6 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                        className="block w-full h-8  text-sm rounded-md text-[#00e5a5] border-0 pl-3 py-1 bg-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                      />

                      <p className="error">
                        {errors.stepPercentage &&
                          touched.stepPercentage &&
                          errors.stepPercentage}
                      </p>
                    </div>
                    <div className="relative">
                      {/* <label htmlFor="startPricePercentage">
                        Start Price Percentage
                      </label> */}
                      <label
                        htmlFor="name"
                        className="absolute md:text-[10px] text-[6px] -top-2 left-2 inline-block bg-gray-100 dark:bg-gray-800 dark:text-white leading-4 font-medium text-gray-900"
                      >
                        Start Price %
                      </label>
                      <input
                        type="text"
                        name="startPricePercentage"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.startPricePercentage}
                        // placeholder="Start Price Percentage"
                        // className="border h-6 text-sm focus:outline-none block w-2/6 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                        className="block w-full h-8  text-sm rounded-md text-[#00e5a5] border-0 pl-3 py-1 bg-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                      />

                      <p className="error">
                        {errors.startPricePercentage &&
                          touched.startPricePercentage &&
                          errors.startPricePercentage}
                      </p>
                    </div>
                    <div className="relative">
                      {/* <label htmlFor="option">Option</label> */}
                      <label
                        htmlFor="name"
                        className="absolute md:text-[10px] text-[6px] -top-2 left-2 inline-block bg-gray-100 dark:bg-gray-800 dark:text-white leading-4 font-medium text-gray-900"
                      >
                        Option
                      </label>
                      <input
                        type="text"
                        name="option"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.option}
                        // placeholder="Option"
                        // className="border h-6 text-sm focus:outline-none block w-2/6 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                        className="block w-full h-8 text-sm rounded-md text-[#00e5a5] border-0 pl-3 py-1 bg-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                      />

                      <p className="error">
                        {errors.option && touched.option && errors.option}
                      </p>
                    </div>
                    <div className="relative">
                      {/* <label htmlFor="option">Option</label> */}
                      <label
                        htmlFor="name"
                        className="absolute md:text-[10px] text-[6px] -top-2 left-2 inline-block bg-gray-100 dark:bg-gray-800 dark:text-white leading-4 font-medium text-gray-900"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        name="amount"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // value={values.amount}
                        // placeholder="Option"
                        // className="border h-6 text-sm focus:outline-none block w-2/6 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                        className="block w-full h-8 text-sm rounded-md text-[#00e5a5] border-0 pl-3 py-1 bg-gray-100 dark:bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset sm:text-sm sm:leading-7"
                      />

                      <p className="error">
                        {errors.option && touched.option && errors.option}
                      </p>
                    </div>
                  </div>

                  <button
                    className="h-6 md:text-[16px] text-[11px] align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-3 rounded-lg text-white bg-3bc48d border border-transparent active:bg-[#3bc48d] hover:bg-[#3bc48d] focus:ring focus:ring-purple-300 w-1/6"
                    type="submit"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Formik>
    </>
  );
}

export default CreateBotSettings;
