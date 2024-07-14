"use client"
import AreaChart from "@/components/AreaChart/AreaChart";
import DataTable from "@/components/DataTable";
import Icon from "@/components/Icon";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import useHomePage from "@/hooks/useHomePage";
import { faArrowRight } from "@fortawesome/pro-solid-svg-icons";
import Image from 'next/image';

export default function Home() {
  const { homePageData } = useHomePage()
  
  return (
    <Stack spacing={10} className="mt-4">
      <Typography variant="header1" text="Tokens" />
      <DataTable
        rounded
        data={homePageData}
        cols={[
          {
            key: "pythPrice",
            title: "Symbol",
            cell(props) {
              return (
                <Stack className="items-center" isRow spacing={5}>
                  <Image alt={props.row.pythPrice.logo} width={50} height={50} src={"/" + props.row.pythPrice.logo} />
                  <Typography variant="body1" text={props.row.pythPrice.token} />
                </Stack>
              )
            },
          },
          {
            key: "pythPrice",
            title: "Price",
            cell(props) {
              return <Typography weight="bold" variant="body1" text={props.row.pythPrice.price} />
            },
          },
          {
            key: "pythPrice",
            title: "Price",
            cell(props) {
              const series = [
                  {
                    name: 'Price',
                    values: props.row.priceHistory?.map((price)=>price.value) ?? [],
                  },
                ]
              return <AreaChart
              containerProps={{ style: { height: 50 } }}
              timestamps={props.row.priceHistory?.map((_,index:number)=>index) ?? []}
              data={series}
              xAxisHidden
              yAxisHidden
            />
            },
            cellStyle: () => 'w-60',
          },
          {
            title: "",
            cell(props) {
              return <Icon onClick={() => console.log()} icon={faArrowRight} />
            },

          }
        ]}
      />
    </Stack>
  );
}
