// Api urls for client
export const API_URLS = {
  // Token
  URL_TOKEN_AUTH: `/api/auth`,
  URL_TOKEN_REFRESH: `/api/auth/refresh`,
  URL_TOKEN_VERIFY: `/api/auth/verify`,
  URL_TOKEN_REVOKE: `/api/auth/revoke`,
  // User
  URL_USER_REGISTER: `/user/register/`,
  URL_USER_PROFILE: `/user/profile/`,
  URL_USER_ADDRESSES: `/user/addresses/`,
  URL_PASSWORD_RESET: `/user/password-reset/`,
  URL_PASSWORD_RESET_CONFIRM: `/user/password-reset/confirm/[uidb64]/[token]/`,
  URL_CHANGE_EMAIL: `/user/change-email/`,
  URL_CHANGE_PASSWORD: `/user/change-password/`,
  URL_OTP_REQUEST: `/user/generate-otp/`,
};
