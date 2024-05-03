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
    let result = { data: null, error: null };
    await axios
      .post(BASE_URL + endpoint, payload)
      .then((res) => {
        result = { ...result, data: res.data };
      })
      .catch((err) => {
        result = { ...result, error: err };
      });
  
    return result;
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
