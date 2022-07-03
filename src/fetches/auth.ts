import { API_URLS } from "@config";
import assertApiError, { _assertApiError } from "@utils/assertApiError";
import { rawFetcher } from "@utils/fetcher";
import makeFetchOptions from "@utils/makeFetchOptions";

export const postLogin = async (username: string, password: string) => {
  const resp = await rawFetcher.post(
    API_URLS.URL_TOKEN_AUTH,
    { username, password },
    makeFetchOptions({ baseURL: "" })
  );
  await assertApiError(resp);
  return resp.data;
};

export const postRevoke = async () => {
  const resp = await rawFetcher.post(
    API_URLS.URL_TOKEN_REVOKE,
    {},
    makeFetchOptions({ baseURL: "" })
  );
  await assertApiError(resp);
  return resp.data;
};

export const postRefresh = async () => {
  const { data, status } = await rawFetcher.post(
    API_URLS.URL_TOKEN_REFRESH,
    {},
    makeFetchOptions({ baseURL: "" })
  );
  return _assertApiError(status ?? 500) ? null : data;
};
