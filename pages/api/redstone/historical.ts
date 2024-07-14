import type { NextApiRequest, NextApiResponse } from 'next';
import redstone from 'redstone-api';

/**
 * Attempts to fetch price of a token
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
    if(req.body.limit !== undefined){
        const price = await redstone.getHistoricalPrice(req.body.token, {
            limit: req.body.limit,
            offset:0
        });
        res.status(200).json(price)
    }else if(req.body.startDate !== undefined && req.body.endDate !== undefined){
        const price = await redstone.getHistoricalPrice(req.body.token, {
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            limit : req.body.limit,
            interval: 3600000 // It is 1 hour, but returns in 10 seconds interval...
        });
        res.status(200).json(price)
    }else{
        const price = await redstone.getHistoricalPrice(req.body.token, {
            date:req.body.date
        });
        res.status(200).json(price)
    }
    
}