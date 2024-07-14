import { PriceData } from "redstone-api/lib/types";
import ApiService from "./ApiService";
import { SummaryResponse } from "@/pages/api/redstone/helper";

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

export type OracleRes = {
    provider:string
    price:string
}

export const formatPrice = (price: string, expo: number) => {
    // Move the decimal point by `expo` positions to the left
    const num = Number(price) * Math.pow(10, expo);
    // Format the number to include a comma for thousands and a dot for decimal separation
    return num.toLocaleString('en-US', { minimumFractionDigits: -expo });
};


class OracleService extends ApiService {

    constructor() {
        const host = process.env.HOST ?? 'oracle.dogukangun.de'
        const ssl = Boolean(process.env.SSL ?? true)
        const disableAuth = Boolean(process.env.DISABLE_AUTH ?? true)
        super({ host, ssl, disableAuth });
    }

    getPrice = async (priceIds: string[]): Promise<PythResponse[]> => {
        const res = await this.post("api/pyth/price", {
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
        const res = await this.post("api/redstone/historical", {
            token: token,
            limit: 5
        })
        const tranformed = Object.values(res.data).map(price => price)
        return tranformed as PriceData[]
    }

    getSummary = async (token: string) => {
        const currentDate = new Date();
        const yesterdayDate = new Date(currentDate);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);

        const startDate = currentDate.toISOString();
        const endDate = yesterdayDate.toISOString();
        const res = await this.post('api/redstone/summary', {
            token:token,
            startDate:"2024-07-12T12:35:09",
            endDate:"2024-07-13T12:35:09",
            limit:10
        })
        return res.data as unknown as SummaryResponse
    }

    getPrices =async (token:string) => {
        const res = await this.post('api/redstone/price',{
            token:token
        })
        const priceRes = res.data as unknown as PriceData
        const formattedSource = Object.entries(priceRes.source!).map(([provider, price]) => {
            return { provider, price: price.toString() } as OracleRes;
        });
        return formattedSource
    }
}

export default new OracleService();
