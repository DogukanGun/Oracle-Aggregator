import type { NextApiRequest, NextApiResponse } from 'next';
import { PriceServiceConnection } from '@pythnetwork/price-service-client'
/**
 * Attempts to fetch price of a token
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    const connection = new PriceServiceConnection("https://hermes.pyth.network");
    const currentPrices = await connection.getLatestPriceFeeds(req.body.priceIds);
    console.log(currentPrices);
    res.status(200).json(currentPrices)
}