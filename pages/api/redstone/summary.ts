import type { NextApiRequest, NextApiResponse } from 'next';
import { SummaryResponse, getPricesSummary } from './helper';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { token, startDate, endDate, limit } = req.body;

  if (!token || !startDate || !endDate || !limit) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    const summary:SummaryResponse = await getPricesSummary(token, startDate, endDate, limit);
    res.status(200).json(summary);
  } catch (error) {
    console.error("Error in handler:", (error as Error).message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
