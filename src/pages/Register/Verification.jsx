import {useContext, useState} from 'react'
import { authContext } from '../../context/Auth/Auth';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Verification() {
   const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUserToken } = useContext(authContext);
    const buttonProps = {
      type: 'submit',
      className:
        'sm:w-36 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
    };

    const navigate=useNavigate();

    function sendOtp(){
        setIsLoading(true);
        let number=formik.values.phone;
        let data={
          phone:number
        }
        axios.post(`${import.meta.env.VITE_BACKEND_HOST}/auth/send-otp/`, data)
        .then(res=>{
          setIsLoading(false);
          toast.success(res.data.message)
        })
        .catch(err=>{
          toast.error(err.response.data.message)
          setErr(err.response.data.message);
          setIsLoading(false);
          throw err;
        })
      }

    function handleVerification(data) {
      setIsLoading(true)
      axios.post(`${import.meta.env.VITE_BACKEND_HOST}/auth/verify/`, data)
      .then(resp=>{
        localStorage.setItem('authToken', resp.data.data.access)
        setUserToken(resp.data.data.access)
        toast.success(resp.data.message)
        navigate('/login');
        setIsLoading(false);
      })
      .catch(err=>{
        setIsLoading(false);
        toast.error(err.response.data.message)
        throw err
      })
    }
    const validate = Yup.object({
        phone: Yup.string().required('Phone number is requried').matches(/^\d{10}$/, 'Must be 10 digits'),
    
        otp: Yup.string().min(4,"Otp should be 4 digits").required("Otp is requried"),
      });

    const formik = useFormik({
        initialValues: {
          phone: '',
          otp: '',
        },
        onSubmit: handleVerification,
        validationSchema: validate,
      });
    
  return (
    <>
      <Helmet>
        <title>Verify</title>
      </Helmet>
      <div className="container">
              <form
                method="post"
                className="max-w-md mx-auto md:mt-12 mt-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-2xl text-gray-500 mb-5 font-bold">Verify</h1>
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
                {isLoading ? (
                    <button {...buttonProps} disabled>
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    </button>
                  ) :
                (<button type='button' className={buttonProps.className+' mt-2 mb-6'} onClick={sendOtp}>Send otp</button>)}

                <div className="relative z-0 w-full group">
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
                <Link
                  to="/register"
                  className="text-green-800 text-sm underline block my-3"
                >
                  Register
                </Link>
                <div className="flex space-x-2">
                  {isLoading ? (
                    <button {...buttonProps} disabled>
                      <i className="fa-solid fa-spinner animate-spin"></i>
                    </button>
                  ) : (
                    <button {...buttonProps}>Verify</button>
                  )}
                </div>
              </form>
            </div>
    </>

  )
}
