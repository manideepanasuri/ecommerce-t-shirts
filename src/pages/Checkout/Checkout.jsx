import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { useActionData, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/Cart/Cart';
import { authContext } from '../../context/Auth/Auth';
import toast from 'react-hot-toast';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { emptyCart } = useContext(cartContext);
  const { userToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'sm:w-36 w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 select-none',
  };


  const navigate=useNavigate();

  function handleCheckout(data) {
    setIsLoading(true);

    const config = {
      method: 'post',
      url: `${import.meta.env.VITE_BACKEND_HOST}/orders/shipping-address/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data:data
    };
    
    axios.request(config).then((response) => {
      setIsLoading(false);
      toast.success('Order Placed successfully')
      
      navigate('/orders')
    }).catch((resp)=>{
      setIsLoading(false);
      toast.error(resp.response.data.message)
      
    })
    ;
  }

  const validate = Yup.object({
    full_name:Yup.string().required("Full Name is Requried"),

    address_line_1: Yup.string().required("address_line_1 is requried"),
    address_line_2:Yup.string(),
    city:Yup.string().required("City is required"),
    state:Yup.string().required("State is Requied"),
    pin_code:Yup.string().required("pincode is requied"),
    phone_number: Yup.string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Must be 10 digits'),
    email:Yup.string().email("Not a valid Email").required("Email is Required")
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      address_line_1: '',
      address_line_2: '',
      city: '',
      state: '',
      pin_code: '',
      phone_number: '',
      email: ''
    },
    onSubmit: handleCheckout,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>Checkout</title>
      </Helmet>

      <div className="container">
        <form
          method="post"
          className="max-w-md mx-auto"
          onSubmit={formik.handleSubmit}
        >
          <h1 className="text-2xl text-gray-500 mb-5 font-bold">Checkout</h1>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="full_name"
              id="full_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.full_name}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="full_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
            {formik.errors.full_name && formik.touched.full_name && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.full_name}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address_line_1"
              id="address_line_1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address_line_1}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="address_line_1"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address Line 1
            </label>
            {formik.errors.address_line_1 && formik.touched.address_line_1 && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.address_line_1}
              </span>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="address_line_2"
              id="address_line_2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address_line_2}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="address_line_2"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address Line 2
            </label>
            {formik.errors.address_line_2 && formik.touched.address_line_2 && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.address_line_2}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="city"
              id="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="city"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              City
            </label>
            {formik.errors.city && formik.touched.city && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.city}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="state"
              id="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="state"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              State
            </label>
            {formik.errors.state && formik.touched.state && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.state}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="pin_code"
              id="pin_code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pin_code}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="pin_code"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pin code
            </label>
            {formik.errors.pin_code && formik.touched.pin_code && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.pin_code}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone_number"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone Number
            </label>
            {formik.errors.phone_number && formik.touched.phone_number && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.phone_number}
              </span>
            )}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-600 font-light text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>

          {isLoading ? (
            <button {...buttonProps} disabled>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </button>
          ) : (
            <button {...buttonProps}>Checkout</button>
          )}
        </form>
      </div>
    </>
  );
}
