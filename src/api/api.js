import axios from "axios";
import { message } from "antd";
import { get_token } from "../@helper/localstorage";

const baseUrl = "http://localhost:8080/";

axios.defaults.validateStatus = function (status) {
  return status < 500; // Accept all responses with status less than 500
};

export const fetchData = async (url) => {
  try {
    let token = get_token();
    const response = await axios.get(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (err) {
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};

//postdata with token authorisation
export const postDatawithtoken = async (url, data) => {
  try {
    const token = localStorage.getItem("TOKEN");
    const response = await axios.post(baseUrl + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err) {
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};

//create data
export const postData = async (url, data, config) => {
  try {
    const token = localStorage.getItem("TOKEN");
    const response = await axios.post(baseUrl + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("getting out from here" + err.response);
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};

//update data
export const updateData = async (url, data, config) => {
  try {
    const token = localStorage.getItem("TOKEN");
    const response = await axios.put(baseUrl + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};

//delete data
export const deleteData = async (url, config) => {
  try {
    const token = localStorage.getItem("TOKEN");
    const response = await axios.delete(baseUrl + url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};

export const multipartPostData = async (url, data) => {
  try {
    const token = localStorage.getItem("TOKEN");
    const response = await axios.post(baseUrl + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (err) {
    message.error(
      err.response ? err.response.data.message : "Something went wrong"
    );
  }
};
