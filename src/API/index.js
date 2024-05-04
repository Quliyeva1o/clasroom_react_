import axios from "axios";
import { BASE_URL } from "./constants.js";

//requests

//get all
export async function getAll(endpoint) {
  let result = { data: null, error: null };
  await axios
    .get(BASE_URL + endpoint)
    .then((res) => {
      result = { ...result, data: res.data };
    })
    .catch((err) => {
      result = { ...result, error: err };
    });

  return result;
}

//get one
export async function getOne(endpoint, id) {
    let result = { data: null, error: null };
    await axios
      .get(BASE_URL + endpoint + `/${id}`)
      .then((res) => {
        result = { ...result, data: res.data };
      })
      .catch((err) => {
        result = { ...result, error: err };
      });
  
    return result;
}

//delete
export async function deleteOne(endpoint, id) {
    let result = { data: null, error: null };
    await axios
      .delete(BASE_URL + endpoint + `/${id}`)
      .then((res) => {
        result = { ...result, data: res.data };
      })
      .catch((err) => {
        result = { ...result, error: err };
      });
  
    return result;
}

//post
export async function post(endpoint, payload) {
  try {
    const response = await axios.post(BASE_URL + endpoint, payload);
    return { data: response.data, error: null };
  } catch (error) {
    // Extract meaningful error information
    let errorMessage = 'An error occurred while processing your request';
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = `HTTP Error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'No response received from the server';
    } else {
      // Something happened in setting up the request that triggered an error
      errorMessage = `Request setup error: ${error.message}`;
    }
    return { data: null, error: errorMessage };
  }
}

//put
export async function putOne(endpoint, id, payload) {
    let result = { data: null, error: null };
    await axios
      .put(BASE_URL + endpoint + `/${id}`, payload)
      .then((res) => {
        result = { ...result, data: res.data };
      })
      .catch((err) => {
        result = { ...result, error: err };
      });
  
    return result;
}

//patch
export async function patchOne(endpoint, id, payload) {
    let result = { data: null, error: null };
    await axios
      .patch(BASE_URL + endpoint + `/${id}`, payload)
      .then((res) => {
        result = { ...result, data: res.data };
      })
      .catch((err) => {
        result = { ...result, error: err };
      });
  
    return result;
}
