import axios from 'axios';
import { createContext, useContext } from 'react';
import { toast } from 'react-hot-toast';
import { authContext } from '../Auth/Auth';

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  const { userToken } = useContext(authContext);

  const headers = {
    Authorization: `Bearer ${userToken}`,
  };
  const URL = `${import.meta.env.VITE_BACKEND_HOST}/orders/cart/`;

  function getProducts() {
    const config = {
      method: 'get',
      url: URL,
      headers: headers,
    };

    return axios(config)
      .then((response) =>{
        return response.data})
      .catch((error) => {
        throw error;
      });
  }

  function addProduct(id) {
    const data = { product_variation_id: id };

    const config = {
      method: 'post',
      url: URL,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response?.data?.message || error.message || 'Error adding product';
        }),
      {
        loading: 'Adding product...',
        success: 'Product added successfully!',
        error: (errMsg) => `${errMsg}`,
      }
    );
  }

  function deleteProduct(id) {
    let config = {
      method: 'delete',
      url: `${URL}`,
      headers: headers,
      data:{
        product_variation_id:id
      }
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response?.data?.message || error.message || 'Error deleting product';
        }),
      {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: (errMsg) => `${errMsg}`,
      }
    );
  }

  function updateProductQuantity(id, quantity) {
    let data = { quantity: quantity,product_variation_id:id };

    let config = {
      method: 'put',
      url: `${URL}`,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error.response?.data?.message || error.message || 'Error updating';
        }),
      {
        loading: 'Updating product quantity...',
        success: 'Product quantity updated successfully!',
        error: (errMsg) => `${errMsg}`,
      }
    );
  }

  function emptyCart() {
    let config = {
      method: 'delete',
      url: URL,
      headers: headers,
    };

    return axios
      .request(config)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  return (
    <cartContext.Provider
      value={{
        getProducts,
        addProduct,
        deleteProduct,
        updateProductQuantity,
        emptyCart,
      }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
