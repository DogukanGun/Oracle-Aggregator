import { tokens } from "@/data/tokens";
import OracleService from "@/services/OracleService";
import { useEffect, useState } from "react";

export type PyteHookResponse = {
    price:string;
    token:string;
    logo:string;
}

const getSymbolId = (id:string):string => {
    return tokens.find((token)=>token.id == "0x"+id)?.name ?? ""
}

const getSymbolLink = (id:string):string => {
    return tokens.find((token)=>token.id == "0x"+id)?.logo ?? ""
}

export const usePyth = () => {
    const [prices,setPrices] = useState<PyteHookResponse[]>()

    useEffect(()=>{
        const getPrice =async () => {
            const ids = tokens.map((token)=>token.id)
            const _prices = await OracleService.getPrice(ids)
            const response = _prices.map((price)=>{
                return (
                    {
                        price:price.price.price,
                        token:getSymbolId(price.id),
                        logo:getSymbolLink(price.id)
                    }
                )
            }) as PyteHookResponse[]
            setPrices(response)
        }
        if(tokens != undefined){
            getPrice()
        }
        
    },[tokens])

    return { prices }
}