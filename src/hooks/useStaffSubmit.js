import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router';

import AdminServices from '../services/AdminServices';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';

const useStaffSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const [imageUrl, setImageUrl] = useState('');
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const staffData = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone,
      joiningDate: data.joiningDate,
      country: data.country,
      address: data.address,
    };

    if (id) {
      AdminServices.updateStaff(id, { email: adminInfo.email, data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess('Staff Updated Successfully!');
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      AdminServices.addStaff({ email: adminInfo.email, data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue('name');
      setValue('username');
      setValue('email');
      setValue('password');
      setValue('country');
      setValue('address');
      setValue('phone');
      setValue('joiningDate');
      clearErrors('name');
      clearErrors('username');
      clearErrors('email');
      clearErrors('password');
      clearErrors('country');
      clearErrors('address');
      clearErrors('phone');
      clearErrors('joiningDate');
      return;
    }
    if (id) {
      AdminServices.getStaffById(id, { email: adminInfo.email })
        .then((res) => {
          if (res) {
            setValue('name', res.name);
            setValue('username', res.username);
            setValue('email', res.email);
            setValue('password', res.password);
            setValue('country', res.country);
            setValue('address', res.address);
            setValue('phone', res.phone);
            setValue('joiningDate', res.joiningData);
            setValue('role', res.role);
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen, adminInfo.email]);

  useEffect(() => {
    if (
      location.pathname === '/setting' ||
      (location.pathname === '/edit-profile' && Cookies.get('adminInfo'))
    ) {
      const user = JSON.parse(Cookies.get('adminInfo'));
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('country', user.country);
      setValue('address', user.address);
      setValue('email', user.email);
      setValue('phone', user.phone);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    setImageUrl,
    imageUrl,
  };
};

export default useStaffSubmit;
