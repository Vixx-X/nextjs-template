import type { NextApiRequest, NextApiResponse } from 'next';

import { AUTH_URLS } from '@config';

import authCallback from '@utils/authCallback';

const { URL_TOKEN_VERIFY } = AUTH_URLS;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError | JSON | null>
) {
  return authCallback(
    req,
    res,
    URL_TOKEN_VERIFY,
    (response: Response, result: JSON) => {
      return res.status(response.status).json(result);
    },
    req.body
  );
}
