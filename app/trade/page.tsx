"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import Stack from '@/components/Stack';
import Typography from '@/components/Typography';
import { Dropdown } from '@/components/Dropdown';
import { tokens } from '@/data/tokens';
import { DropdownOptionType } from '@/types/Components/Dropdown';
import { PriceServiceConnection } from '@pythnetwork/price-service-client';
import { formatPrice } from '@/services/OracleService';
import Button from '@/components/Button';

interface TradeProps {
    useMore?: boolean;
    callback?: Highcharts.ChartCallbackFunction;
    containerProps?: React.HTMLAttributes<HTMLDivElement>;
    id: string;
}

const Trade: React.FC<TradeProps> = ({ useMore, callback, containerProps, id }) => {
    const chartRef = useRef<Highcharts.Chart | null>(null);
    const [data, setData] = useState<any[]>([]);
    const connection = new PriceServiceConnection("https://hermes.pyth.network");
    const [stop,setStop] = useState(false)
    useEffect(() => {
        setData([])
        const fetchData = async () => {
            try {
                connection.subscribePriceFeedUpdates([id], (feed) => {
                    setTimeout(() => {
                        const price = formatPrice(feed.getPriceUnchecked().price, feed.getPriceUnchecked().expo)
                        !stop && setData((prevData) => [...prevData, Number(price)]);
                    },5000);
                })

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (!document) return;

        (async () => {
            const Highcharts = await import('highcharts/highstock');
            if (useMore) HighchartsMore(Highcharts);

            chartRef.current = Highcharts.stockChart(id, {
                rangeSelector: {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1D'
                    }, {
                        type: 'all',
                        count: 1,
                        text: 'All'
                    }],
                    selected: 1,
                    inputEnabled: false
                },
                series: [{
                    name: 'AAPL',
                    type: 'line',
                    data: data,
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            }, callback);
        })();

        return () => {
            try {
                chartRef.current?.destroy();
            } catch (e) {
                console.error(e);
            }
        };
    }, [useMore, callback, id, data]);

    return (
        <Stack>
            <Button className='w-32' onClick={() => {
                connection.unsubscribePriceFeedUpdates([id])
                setStop((prev)=>!prev)
            }} text='Stop Graph' />
            <div {...containerProps} id={id} style={{ width: '100%', height: '100%' }}>

            </div>
        </Stack>
    );
};

const TradePage: React.FC = () => {

    const [selected, setSelected] = useState<DropdownOptionType<string>>();

    const title = useMemo(() => {
        return selected?.name ? 'Trade View Of ' + selected!.name : 'Trade View'
    }, [selected?.name])

    return (
        <Stack spacing={10}>
            <Typography variant='header1' text={title} />
            <Stack>
                <Dropdown onChange={setSelected} selected={selected?.value} options={tokens.map((token) => {
                    return {
                        name: token.name,
                        value: token.id + "-" + token.name
                    }
                })} label={'Currency'} />
            </Stack>

            <Trade id={selected?.value.split("-")[0] ?? ''} />
        </Stack>
    );
};

export default TradePage;
