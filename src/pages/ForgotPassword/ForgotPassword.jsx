import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { authContext } from '../../context/Auth/Auth';

export default function ForgotPassword() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {setUserToken}=useContext(authContext)
  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  };

  const navigate = useNavigate();

  function sendOtp() {
    setIsLoading(true);
    let number = formik.values.phone;
    let data = {
      phone: number,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/auth/send-otp/`, data)
      .then((res) => {
        setIsLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setErr(err.response.data.message);
        setIsLoading(false);
        throw err;
      });
  }

  function handleForgotPassword(data) {
    setIsLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/auth/password-reset/`, data)
      .then((res) => {
        setErr(null);
        toast.success(res.data.message);
        setIsLoading(false);
        localStorage.setItem('authToken', res.data.data.access)
        setUserToken(res.data.data.access);
        navigate('/login');
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error(err.response.data.message)
        setErr(err.response.data.message);
        throw err;
      });
  }

  const validate = Yup.object({
    phone: Yup.string()
      .required('phone number is requried')
      .matches(/^\d{10}$/, 'Must be 10 digits'),
    otp: Yup.string().min(4).max(4).required('Otp is requried'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),

    rePassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: handleForgotPassword,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Fogot Password</title>
      </Helmet>

      <form
        method="post"
        className="max-w-md mx-auto"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-2xl text-gray-500 mb-5 font-bold">
          Enter Following Details:
        </h1>
        {err && <div className="bg-red-300 py-1 mb-4 font-light">{err}</div>}

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number
          </label>
          {formik.errors.phone && formik.touched.phone && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.phone}
            </span>
          )}
        </div>
        {isLoading ? (
          <button {...buttonProps} disabled>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </button>
        ) : (
          <button
            type="button"
            className={buttonProps.className + ' mt-2 mb-6'}
            onClick={sendOtp}
          >
            Send otp
          </button>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="otp"
            id="otp"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.otp}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="otp"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Otp
          </label>
          {formik.errors.otp && formik.touched.otp && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.otp}
            </span>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.password}
            </span>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <span className="text-red-600 font-light text-sm">
              {formik.errors.rePassword}
            </span>
          )}
        </div>

        <Link
          to="/login"
          className="text-green-800 text-sm underline block my-3"
        >
          Continue to Login
        </Link>
        {isLoading ? (
          <button {...buttonProps} disabled>
            <i className="fa-solid fa-spinner animate-spin"></i>
          </button>
        ) : (
          <button {...buttonProps}>Reset Password</button>
        )}
      </form>
    </>
  );
}
