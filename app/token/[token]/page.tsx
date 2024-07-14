'use client'
import Card from "@/components/Card"
import DataTable from "@/components/DataTable"
import Divider from "@/components/Divider"
import Stack from "@/components/Stack"
import Surface from "@/components/Surface"
import Typography from "@/components/Typography"
import { SummaryResponse } from "@/pages/api/redstone/helper"
import OracleService, { OracleRes } from "@/services/OracleService"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PriceData } from "redstone-api/lib/types"

const Token = () => {
    const token = useParams()?.token
    const [summary, setSummary] = useState<SummaryResponse>()
    const [price, setPrice] = useState<OracleRes[]>()

    useEffect(() => {
        OracleService.getSummary(token as string)
            .then((res) => {
                setSummary(res)
            })
        OracleService.getPrices(token as string)
            .then((res) => {
                setPrice(res)
            })

    }, [])

    return (<Stack spacing={10}>
        <Typography text="Oracles" variant="header1" />
        <DataTable
            data={price}
            cols={[
                {
                    key: 'provider',
                    title: 'Oracle Provider'
                },
                {
                    key: 'price',
                    title: 'Oracle Price'
                },
            ]}
        />
        <Divider />
        <Typography text="Summaries" variant="header1" />
        <Stack spacing={5} isRow>
            {summary && Object.keys(summary).map((objKey) => {
                return <Surface><Card elevation={1}>
                    <Stack isRow>
                        <Typography text={objKey + " : "} variant="body1" />
                        <Typography text={String(summary[objKey])} variant="body1" />
                    </Stack>
                </Card></Surface>
            })}
        </Stack>
    </Stack>)
}

export default Token