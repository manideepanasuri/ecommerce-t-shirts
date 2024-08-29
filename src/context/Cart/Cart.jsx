import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export const cartContext = createContext(null);

export default function CartContextProvider(props) {
  const headers = {
    token: localStorage.getItem('authToken'),
  };

  function getProducts() {
    const config = {
      method: 'get',
      url: 'https://ecommerce.routemisr.com/api/v1/cart',
      headers: headers,
    };

    return axios(config)
      .then((response) => response.data.data.products)
      .catch((error) => {
        throw error;
      });
  }

  function addProduct(id) {
    const data = { productId: id };

    const config = {
      method: 'post',
      url: 'https://ecommerce.routemisr.com/api/v1/cart',
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Adding product...',
        success: 'Product added successfully!',
        error: 'Error adding product',
      }
    );
  }

  function deleteProduct(id) {
    let config = {
      method: 'delete',
      url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      headers: headers,
    };

    return toast.promise(
      axios
        .request(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Deleting product...',
        success: 'Product deleted successfully!',
        error: 'Error deleting product',
      }
    );
  }

  function updateProductQuantity(id, quantity) {
    let data = { count: quantity };

    let config = {
      method: 'put',
      url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      headers: headers,
      data: data,
    };

    return toast.promise(
      axios(config)
        .then((response) => response.data)
        .catch((error) => {
          throw error;
        }),
      {
        loading: 'Updating product quantity...',
        success: 'Product quantity updated successfully!',
        error: 'Error updating product quantity',
      }
    );
  }

  return (
    <cartContext.Provider
      value={{ getProducts, addProduct, deleteProduct, updateProductQuantity }}
    >
      {props.children}
    </cartContext.Provider>
  );
}
