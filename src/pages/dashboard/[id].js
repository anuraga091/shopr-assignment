import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });



export async function getServerSideProps(context){
    
    const res = await fetch(`https://finnhub.io/api/v1/stock/candle?symbol=${context.params.id}&resolution=D&from=1643653800&to=${Math.floor(Date.now()/1000)}&token=cfd98fpr01qj357esqt0cfd98fpr01qj357esqtg`)
    const data = await res.json()
    return {
        props: {
            candleData: data,
        }
    }

}
const chart = {
        options: {
              chart: {
                type: 'candlestick',
                height: 290,
                id: 'candles',
                toolbar: {
                autoSelected: 'pan',
                  show: true
                },
                zoom: {
                  type: 'x',
                  enabled: true,
                  autoScaleYaxis: true
                },
                
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: 'rgba(0,183,70,1)',
                    downward: 'rgba(239,64,60,1)'
                  }
                }
              },
              tooltip: {
                  enabled: true
                },
              xaxis: {
                type: 'datetime'
              },
              yaxis: {
                tooltip: {
                  enabled: true
                }
              }
            },
          
            
            optionsBar: {
              chart: {
                height: 290,
                type: 'bar',
                brush: {
                  enabled: true,
                  target: 'candles'
                },
                selection: {
                  enabled: true,
                  xaxis: {
                    min: new Date('1 Jan 2023').getTime(),
                    max: new Date('8 Feb 2023').getTime()
                  },
                  fill: {
                    color: '#ccc',
                    opacity: 0.4
                  },
                  stroke: {
                    color: '#0D47A1',
                  }
                },
              },
              dataLabels: {
                enabled: false
              },
              plotOptions: {
                bar: {
                  columnWidth: '80%',
                  colors: {
                    ranges: [{
                      from: 1,
                      to: 500000,
                      color: '#F15B46'
                    }, {
                      from: 500000,
                      to: 1000000,
                      color: '#FEB019'
                    }],
              
                  },
                }
              },
              stroke: {
                width: 0
              },
              xaxis: {
                type: 'datetime',
                axisBorder: {
                  offsetX: 13
                }
              },
              yaxis: {
                labels: {
                  show: false
                }
              }
            },
    }
export default function CandleChart({candleData}) {
    const [series, setSeries] = useState([{
        data: []
    }])
    const [seriesBar, setSeriesBar] = useState([{
        data: []
    }])
    
    useEffect(() => {
        let timeoutId;
        const getLatestCandleData = async () => {
            try{
                if (candleData.s == "ok"){
                    const prices = candleData.t.map((timestamp, index) => ({
                        x: new Date(timestamp * 1000),
                        y: [candleData.o[index], candleData.h[index], candleData.l[index], candleData.c[index]]
                    }))
                    const priceBar = candleData.t.map((timestamp, index) => ({
                        x: new Date(timestamp * 1000),
                        y: [candleData.o[index], candleData.h[index], candleData.l[index], candleData.c[index], candleData.v[index]]
                    }))
                    setSeries([{
                        data: prices,
                    }])
                    setSeriesBar([{
                        data: priceBar,
                    }])
                }
                
                timeoutId = setTimeout(() => {
                    getLatestCandleData()
                }, 5000*2)
            } catch (error) {
                console.log(error);
            }
            

        }
        getLatestCandleData()
        return () => {clearTimeout(timeoutId)}
    },[])

    return(
        <>  
            {candleData.s == "no_data" ? 
                <div className="m-4"> No Data Available for this stock. Please go back and select another stock</div>
                :
                <>
                    <div className="m-4">
                        This is Real Time Stock candle Chart
                    </div>
                    <div className="chart-box">
                        {(typeof window !== 'undefined') ?
                            <>
                                <div id="chart-candlestick">
                                    <Chart options={chart.options} series={series} type="candlestick" height={290} width='100%' />
                                </div>
                                <div id="chart-bar">
                                    <Chart options={chart.optionsBar} series={seriesBar} type="bar" height={200} width='100%'/>
                                </div>
                            </>
                            : <div/>
                        }
                    </div>
                </>
            }
            
        </>
        
    )
}