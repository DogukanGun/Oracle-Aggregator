import { PriceData } from "redstone-api/lib/types";
import ApiService from "./ApiService";

type PythPriceResponse = {
    conf: string;
    expo: number;
    price: string;
    publishTime: number;
}

type PythResponse = {
    id: string;
    price: PythPriceResponse;
}

const formatPrice = (price: string, expo: number) => {
    // Move the decimal point by `expo` positions to the left
    const num = Number(price) * Math.pow(10, expo);
    // Format the number to include a comma for thousands and a dot for decimal separation
    return num.toLocaleString('en-US', { minimumFractionDigits: -expo });
};


class OracleService extends ApiService {

    constructor() {
        const host = process.env.HOST ?? 'localhost'
        const ssl = Boolean(process.env.SSL ?? false)
        const ep = undefined
        const port = Number(process.env.PORT ?? '3000')
        const disableAuth = Boolean(process.env.DISABLE_AUTH ?? true)
        super({ host, ssl, port, ep, disableAuth });
    }

    getPrice = async (priceIds: string[]): Promise<PythResponse[]> => {
        const res = await this.post("/api/pyth/price", {
            priceIds: priceIds
        })
        const priceValues = Object.values(res.data).map(priceObj => {
            return ({
                id: priceObj.id,
                price: {
                    price: formatPrice(priceObj.price.price, priceObj.price.expo)
                }
            })
        });

        return priceValues as PythResponse[]
    }

    getLast5Price = async (token: string) => {
        const res = await this.post("/api/redstone/historical", {
            token: token,
            limit:5
        })
        const tranformed = Object.values(res.data).map(price=>price)
        return tranformed as PriceData[]
    }
}

export default new OracleService();
