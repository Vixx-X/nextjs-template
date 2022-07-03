import type { NextApiRequest, NextApiResponse } from 'next';

import { API_BASE_URL } from '@config';

export default async function authCallback(
  req: NextApiRequest,
  res: NextApiResponse<ApiError>,
  url: string,
  callback: (response: Response, result: JSON) => any,
  body: Object = {},
  errorCallback: (response: Response, result: JSON) => any = (
    response: Response,
    result: any
  ) => {
    return res.status(response.status).json(result);
  }
) {
  if (!req.method) {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Only POST method allowed` });
  }

  if (req.method.toUpperCase() !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'include', // include, *same-origin, omit, include
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) return errorCallback(response, result);
    return callback(response, result);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
