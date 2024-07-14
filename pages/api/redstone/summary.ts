import type { NextApiRequest, NextApiResponse } from 'next';
import { getPricesSummary } from './helper';


export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { token, startDate, endDate } = req.body;
  
    if (!token || !startDate || !endDate) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    try {
      const summary = await getPricesSummary(token, startDate, endDate);
      res.status(200).json(summary);
    } catch (error) {
      console.error("Error in handler:", error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
