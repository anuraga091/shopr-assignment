import React from "react";
import { useRouter } from 'next/router'


export async function getServerSideProps(context){
    
    const res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${context.params.id}&resolution=D&from=1572651390&to=1575243390&token=cfd98fpr01qj357esqt0cfd98fpr01qj357esqtg`)
    const data = await res.json()
    return {
        props: {
            candleData: data,
        }
    }

}

export default function Chart({candleData}) {
    console.log(candleData)
    return(
        <h1>Hi</h1>
    )
}