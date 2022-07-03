import Cookies from 'cookies';
import type { NextApiRequest, NextApiResponse } from 'next';

interface ApiResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiError | ApiResponse | JSON | null>
) {
  const cookies = new Cookies(req, res);
  cookies.set('refresh');
  return res.status(200).json({ message: 'log out successfully' });
}
