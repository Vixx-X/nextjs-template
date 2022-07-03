import { API_URLS } from '@config';

import assertApiError from '@utils/assertApiError';
import fetcher from '@utils/fetcher';
import makeFetchOptions, {
  makeAuthFetchOptions,
} from '@utils/makeFetchOptions';
import { makeUrl } from '@utils/makeUrl';

export const getUser = async () => {
  const resp = await fetcher.get(
    API_URLS.URL_USER_PROFILE,
    makeAuthFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export const postRegisterUser = async (data: any) => {
  const resp = await fetcher.post(
    API_URLS.URL_USER_REGISTER,
    data,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export const postOTPRequest = async (data: any) => {
  const resp = await fetcher.post(
    API_URLS.URL_OTP_REQUEST,
    data,
    makeAuthFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
};

export async function postResetPassword(email: any) {
  const resp = await fetcher.post(
    API_URLS.URL_PASSWORD_RESET,
    { email },
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
}

export async function getResetPasswordConfirm(uidb64: any, token: any) {
  const resp = await fetcher.get(
    makeUrl(API_URLS.URL_PASSWORD_RESET_CONFIRM, { uidb64, token }),
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
}

export async function postResetPasswordConfirm(
  passwords: any,
  uidb64: any,
  token: any
) {
  const resp = await fetcher.post(
    makeUrl(API_URLS.URL_PASSWORD_RESET_CONFIRM, { uidb64, token }),
    passwords,
    makeFetchOptions()
  );
  await assertApiError(resp);
  return resp.data;
}
