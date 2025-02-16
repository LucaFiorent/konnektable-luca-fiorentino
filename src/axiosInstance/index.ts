import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { baseUrl } from "./constants";

// create the Axios configuration with
const config: AxiosRequestConfig = { baseURL: baseUrl };

// create an axios instance
export const axiosInstance = axios.create(config);

// Add an interceptor to handle responses and errors
axiosInstance.interceptors.response.use(
  (response) => response, // if the response is successful, return the response
  (error: AxiosError) => {
    let customErrorMessage = "Unknown Error"; // default error message

    // check if the error is an Axios error
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
      console.error("Status:", error.response?.status);
      console.error("Data:", error.response?.data);

      // check if there is a response from the server
      if (error.response) {
        // handle error status codes
        switch (error.response.status) {
          case 400:
            customErrorMessage = "Bad Request. Please check your input.";
            break;
          case 404:
            customErrorMessage = "Resource not Found";
            break;
          case 500:
            customErrorMessage = "Server error. Please try again later.";
            break;
          default:
            customErrorMessage = "Something went wrong try again later";
        }
      } else {
        console.error("something went wrong", error.message); // Log a general error message
      }
    } else {
      console.error("Unexpected error", error); // Handle non axios errors
    }

    // determine the final error message to return
    const finalErrorMessage = error.message
      ? error.message
      : customErrorMessage;

    // reject a promise with a error object
    return Promise.reject({
      message: finalErrorMessage,
      status: error.response?.status,
      originalError: error,
    });
  }
);
