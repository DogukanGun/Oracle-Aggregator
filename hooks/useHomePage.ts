import { useEffect, useState } from "react";
import { PyteHookResponse, usePyth } from "./usePyth";
import { PriceData } from "redstone-api/lib/types";
import OracleService from "@/services/OracleService";
import { tokens } from "@/data/tokens";

type HomePageData = {
    pythPrice:PyteHookResponse
    priceHistory:PriceData[]
}

const useHomePage = () => {
    const { prices } = usePyth()
    const [homePageData,setHomePageData] = useState<HomePageData[]>([])

    useEffect(()=>{
        const getData = async() =>{
            const pricesWithHistory = prices!.map( async(price)=>{
                const res = await OracleService.getLast5Price(price.token) 
                return {
                    pythPrice:price,
                    priceHistory:res
                }
            })
            Promise.all(pricesWithHistory).then((res)=>{
                setHomePageData(res)
            })

        }
        if(prices && tokens) {
            getData()
        }

    },[prices,tokens])

    return { homePageData }
}

export default useHomePage;