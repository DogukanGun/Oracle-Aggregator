"use client"
import Button from "@/components/Button";
import DataTable from "@/components/DataTable";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import { usePyth } from "@/hooks/usePyth";
import Image from 'next/image';

export default function Home() {
  const {prices} = usePyth()

  return (
    <Stack spacing={10} className="mt-4">
      <Typography variant="header1" text="Tokens"/>
      <DataTable
      rounded
        data={prices}
        cols={[
          {
            key:'logo',
            title:'',
            cell(props) {
              return <Image alt={props.row.token} width={50} height={50} src={"/"+props.row.logo}/>
            },
          },
          {
            key:"token",
            title:"Symbol",
            cell(props) {
              return <Typography variant="body1" text={props.row.token}/>
            },
          },
          {
            key:"price",
            title:"Price",
            cell(props) {
              return <Typography variant="body1" text={props.row.price}/>
            },
          },
          {
            title:"",
            cell(props) {
              return <Button onClick={()=>console.log("")} text="See Details"/>
            },
          }
        ]}
      />
    </Stack>
  );
}
