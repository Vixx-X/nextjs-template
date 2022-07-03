import { _authStore } from "@stores/AuthStore";
import { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export function _makeFetchOptions(
  options: AxiosRequestConfig = {},
  auth: string | null = null
) {
  const ret: AxiosRequestConfig = {
    withCredentials: true,
    ...options,
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  if (options?.headers) {
    ret.headers = {
      ...ret.headers,
      ...options.headers,
    } as AxiosRequestHeaders;
  }

  if (auth) {
    ret.headers = {
      ...ret.headers,
      Authorization: `Bearer ${auth}`,
    };
  }

  return ret;
}

export function makeAuthFetchOptions(options: AxiosRequestConfig = {}) {
  const Tokens = _authStore.getState();
  return _makeFetchOptions(options, Tokens.getAccessToken());
}

export default function makeFetchOptions(options: AxiosRequestConfig = {}) {
  return _makeFetchOptions(options);
}
