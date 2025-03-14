import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'sm:w-36 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
  };

  const navigate = useNavigate();

  function handleLogin(data) {
    setIsLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_HOST}/auth/login/`, data)
      .then((dat) => {
        setUserToken(dat.data.data.access);
        localStorage.setItem('authToken', dat.data.data.access);
        setErr(null);
        setIsLoading(false);
        if (dat.data.success) {
          navigate('/');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.message);
      });
  }

  

  const validate = Yup.object({
    phone: Yup.string().required('phone number is requried').matches(/^\d{10}$/, 'Must be 10 digits'),

    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      phone: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <div className="container">
        <form
          method="post"
          className="max-w-md mx-auto md:mt-12 mt-0"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-2xl text-gray-500 mb-5 font-bold">Login Now</h1>
          {err && <div className="bg-red-300 py-1 mb-4 font-light">{err}</div>}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="string"
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
              Phone
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.phone}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full group">
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
          <Link
            to="/forgotPassword"
            className="text-green-800 text-sm underline block my-3"
          >
            Forgot password?
          </Link>
          <div className="flex space-x-2">
            {isLoading ? (
              <button {...buttonProps} disabled>
                <i className="fa-solid fa-spinner animate-spin"></i>
              </button>
            ) : (
              <button {...buttonProps}>Login</button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
