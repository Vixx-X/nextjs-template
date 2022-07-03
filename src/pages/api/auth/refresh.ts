import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTH_URLS, REFRESH_MAX_AGE } from '@config';

import authCallback from '@utils/authCallback';

import Cookies from 'cookies';

const { URL_TOKEN_REFRESH } = AUTH_URLS;

interface AuthTokens {
  access: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError | AuthTokens | JSON | null>
) {
  const secure = req.headers['x-forwarded-proto'] === 'https';
  const cookies = new Cookies(req, res, { secure });
  return authCallback(
    req,
    res,
    URL_TOKEN_REFRESH,
    (response: Response, result: any) => {
      cookies.set('refresh', result.refresh, {
        sameSite: secure ? 'none' : undefined,
        maxAge: REFRESH_MAX_AGE,
      });
      return res.status(response.status).json({ access: result.access });
    },
    { refresh: cookies.get('refresh') }
  );
}
