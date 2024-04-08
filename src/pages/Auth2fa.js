import React, { useEffect, useState } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Modal, ModalFooter, ModalBody, Button } from '@windmill/react-ui';
import { useDispatch, useSelector } from 'react-redux';
import { disable2fa, enable2fa, get2fa } from 'store/actions/securityAction';
import { useFormik } from 'formik';
import { FiAlertTriangle, FiActivity } from 'react-icons/fi';

function Auth2FA() {
  const security = useSelector((state) => state.security);
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get2fa());
  }, []);

  const image = security.qr;
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const formikEnable = useFormik({
    initialValues: {
      code: '',
    },
    onSubmit: (values) => {
      dispatch(enable2fa(values.code));
    },
  });

  const formikDisable = useFormik({
    initialValues: {
      code: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(disable2fa(values));
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <PageTitle>2FA Configurations</PageTitle>
      </div>
      <div className="container mx-auto dark:text-gray-300 rounded-lg">
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            'justify-content': 'space-evenly',
          }}
          className="shadow-md bg-white dark:bg-gray-800 dark:text-gray-300 px-3 py-3 "
        >
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            <figure>
              <img alt="2fa" src={image} />
              <figcaption className="mt-2" style={{ 'font-size': '0.8em' }}>
                16-Digit-Key: <b>{security.secret}</b>
              </figcaption>
            </figure>
          </div>
          <div
            style={{
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
            }}
          >
            {!security.auth2fa && (
              <div
                style={{
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                }}
              >
                <div>
                  <form onSubmit={formikEnable.handleSubmit}>
                    <span className="flex justify-center mb-2 mt-2 text-2xl text-gray-500">
                      <FiActivity />
                    </span>
                    <h2 className="text-2xl font-medium mb-1">
                      Enable 2FA authentication now!
                    </h2>
                    <p className="mb-3" style={{ 'text-align': 'center' }}>
                      To active 2FA please scan the QR code above in <br />
                      your Athenticator App and type in the 2FA code.
                    </p>
                    <input
                      id="code"
                      name="code"
                      type="text"
                      onChange={formikEnable.handleChange}
                      value={formikEnable.values.code}
                      placeholder="Enter 2FA Code"
                      className="border rounded h-10 text-sm focus:outline-none bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                    />
                    <Button type="sumbit" className="ml-2 h-10">
                      Activate 2FA
                    </Button>
                  </form>
                </div>
              </div>
            )}
            {security.auth2fa && (
              <div
                style={{
                  display: 'flex',
                  'align-items': 'center',
                  'justify-content': 'center',
                }}
              >
                <div>
                  <span className="flex justify-center mb-2 mt-2 text-2xl text-gray-500">
                    <FiActivity />
                  </span>
                  <h2 className="text-2xl font-medium mb-1">
                    Google Authenticator is enabled.
                  </h2>
                  <Button
                    type="submit"
                    onClick={openModal}
                    className="h-10 w-full"
                  >
                    Disable 2FA
                  </Button>
                </div>
                <Modal isOpen={modalIsOpen} contentLabel="Example Modal">
                  <ModalBody className="text-center custom-modal px-8 pt-6 pb-4">
                    <span className="flex justify-center text-3xl mb-6 text-red-500">
                      <FiAlertTriangle />
                    </span>
                    <h2 className="text-xl font-medium mb-1">
                      Are you sure you want to disable 2FA?
                    </h2>
                    <p>
                      Please confirm by providing your account password and 2FA
                      credentials.
                    </p>
                    <form onSubmit={formikDisable.handleSubmit}>
                      <input
                        id="password"
                        name="password"
                        type="text"
                        onChange={formikDisable.handleChange}
                        value={formikDisable.values.password}
                        placeholder="Enter Password"
                        className="border rounded h-10 text-sm focus:outline-none m-2 bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />
                      <input
                        id="code"
                        name="code"
                        type="text"
                        onChange={formikDisable.handleChange}
                        value={formikDisable.values.code}
                        placeholder="Enter 2FA code"
                        className="border rounded h-10 text-sm focus:outline-none bg-gray-100 dark:bg-gray-700 dark:border-white px-3 focus:bg-white"
                      />
                    </form>
                  </ModalBody>
                  <ModalFooter className="flex-end">
                    <Button
                      type="submit"
                      onClick={formikDisable.handleSubmit}
                      className="h-7 w-42 dark:bg-red-700"
                    >
                      Disable 2FA
                    </Button>
                    <Button
                      type="submit"
                      onClick={closeModal}
                      className="h-7 bg-gray-100 dark:bg-gray-700 focus:bg-white dark:border-white"
                    >
                      Cancel
                    </Button>
                  </ModalFooter>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth2FA;
