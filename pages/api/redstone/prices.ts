import type { NextApiRequest, NextApiResponse } from 'next';
import redstone from 'redstone-api';

/**
 * Attempts to fetch price of a token
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    const prices = await redstone.getAllPrices();
    res.status(200).json(prices)
}