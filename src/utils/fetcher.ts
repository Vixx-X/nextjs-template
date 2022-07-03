import { API_BASE_URL } from "@config";
import { _authStore } from "@stores/AuthStore";
import { _assertApiError } from "@utils/assertApiError";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

let isAlreadyFetchingAccessToken = false;

// This is the list of waiting requests that will retry after the JWT refresh complete
let subscribers: any[] = [];

const Axios = axios.create({
  baseURL: API_BASE_URL,
});
Axios.interceptors.response.use(
  function (response: AxiosResponse) {
    // If the request succeeds, we don't have to do anything and just return the response
    return response;
  },
  function (error) {
    const errorResponse = error.response;
    if (isTokenExpiredError(errorResponse)) {
      return resetTokenAndReattemptRequest(error);
    }
    // If the error is due to other reasons, we just throw it back to axios
    return Promise.reject(error);
  }
);

async function resetTokenAndReattemptRequest(error: any) {
  const Tokens = _authStore.getState();
  try {
    const { response: errorResponse } = error;
    /*
     * Proceed to the token refresh procedure
     * We create a new Promise that will retry the request,
     * clone all the request configuration from the failed
     * request in the error object.
     */
    const retryOriginalRequest = new Promise((resolve) => {
      /* We need to add the request retry to the queue
       * since there another request that already attempt to
       * refresh the token
       */
      addSubscriber((access_token: string) => {
        errorResponse.config.headers.Authorization = `Bearer ${access_token}`;
        resolve(axios(errorResponse.config));
      });
    });
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;
      const newTokens = await Tokens.refresh();
      if (newTokens === null) {
        Tokens.logout();
        return Promise.reject(error);
      }
      isAlreadyFetchingAccessToken = false;
      onAccessTokenFetched(newTokens.access);
    }
    return retryOriginalRequest;
  } catch (err) {
    return Promise.reject(err);
  }
}

function onAccessTokenFetched(access_token: string) {
  /* When the refresh is successful, we start retrying the requests one by one
   * and empty the queue
   */
  subscribers.forEach((callback) => callback(access_token));
  subscribers = [];
}

function addSubscriber(callback: Function) {
  subscribers.push(callback);
}

function isTokenExpiredError(errorResponse: Response) {
  // Determine if the error is due to JWT token expired
  const status = errorResponse?.status;
  if (!status) return false;
  return status === 401;
}

const okResp = (response: AxiosResponse) => {
  const { data, status } = response;
  return { data, status, url: response.request.uri };
};

const errResp = (error: AxiosError) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
  } else {
    // Something happened in setting up the request that triggered an Error
    // THIS SHOULD NEVER HAPPEN IF YOU CODE OK
    console.log("Error >:(", error.message);
  }
  return {
    data: error?.response?.data,
    status: error?.response?.status,
    url: error?.request?.uri,
  };
};

export const fetcher = {
  get: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.get(url, config).then(okResp).catch(errResp);
  },
  delete: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.delete(url, config).then(okResp).catch(errResp);
  },
  head: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.head(url, config).then(okResp).catch(errResp);
  },
  options: async (url: string, config: AxiosRequestConfig) => {
    return await Axios.options(url, config).then(okResp).catch(errResp);
  },
  post: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.post(url, data, config).then(okResp).catch(errResp);
  },
  put: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.put(url, data, config).then(okResp).catch(errResp);
  },
  patch: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await Axios.patch(url, data, config).then(okResp).catch(errResp);
  },
};

const RawAxios = axios.create();
export const rawFetcher = {
  get: async (url: string, config: AxiosRequestConfig) => {
    return await RawAxios.get(url, config).then(okResp).catch(errResp);
  },
  delete: async (url: string, config: AxiosRequestConfig) => {
    return await RawAxios.delete(url, config).then(okResp).catch(errResp);
  },
  head: async (url: string, config: AxiosRequestConfig) => {
    return await RawAxios.head(url, config).then(okResp).catch(errResp);
  },
  options: async (url: string, config: AxiosRequestConfig) => {
    return await RawAxios.options(url, config).then(okResp).catch(errResp);
  },
  post: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await RawAxios.post(url, data, config).then(okResp).catch(errResp);
  },
  put: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await RawAxios.put(url, data, config).then(okResp).catch(errResp);
  },
  patch: async (url: string, data: any, config: AxiosRequestConfig) => {
    return await RawAxios.patch(url, data, config).then(okResp).catch(errResp);
  },
};

export default fetcher;
