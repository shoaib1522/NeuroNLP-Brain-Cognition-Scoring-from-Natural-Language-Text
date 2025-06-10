import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const FASTAPI_BACKEND_URL = process.env.FASTAPI_BACKEND_URL || 'http://127.0.0.1:8000/analyze';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }
  try {
    const response = await axios.post(FASTAPI_BACKEND_URL, req.body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    return res.status(500).json({ detail: 'An error occurred in the proxy.' });
  }
}