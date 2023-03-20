import axios, { AxiosPromise, Cancel } from 'axios';
import { ApiError } from './api.types';
import { DEBUG_API } from '@/config/environment';

export const didAbort = (
  error: unknown
): error is Cancel & { aborted: boolean } => axios.isCancel(error);

const withLogger = async <T>(promise: AxiosPromise<T>) =>
  promise.catch((error: ApiError) => {
    /*
        Always log errors in dev environment
        if (process.env.NODE_ENV !== 'development') throw error      
    */

    // Log error only if REACT_APP_DEBUG_API env is set to true
    if (!DEBUG_API) throw error;

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest
      // in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

    console.log(error.config);

    throw error;
  });

export default withLogger;
