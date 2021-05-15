import React,{useState,useEffect} from 'react'
import {Bar} from "react-chartjs-2";
const options={
    elements:{
        point:{
            radius:0,
        }
    },
   // maintainAspectRatio:false,
   scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
      }
    ],
  },
    
}
const buildchartdata=(data,casesType)=>{
    const chartdata=[];
    let lastdatapoint;
    //console.log("datacases",data[casesType]);
    // console.log("rec",data.recovered);
    for(let date in data[casesType]){
        if(lastdatapoint){
            const newdatapoint={
                x:date,
                y:data[casesType][date]-lastdatapoint,
            };
           // console.log("difference",data[casesType][date]-lastdatapoint);
            //console.log("date",date);
            chartdata.push(newdatapoint);
       }
        lastdatapoint=data[casesType][date];
    }
    return chartdata;
}
function Graph({casesType,...props}) {
    const [data,setData]=useState({});
    useEffect(() => {
        const fetchdata=async()=>{
           await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=30')
            .then(res=>res.json())
            .then(data=>{
                const fulldata=buildchartdata(data,casesType);
                setData(fulldata);
            })
                }
       fetchdata();
    }, [casesType]);
    
    return (
        <div>
            {data?.length>0&&(
                <Bar className={props.className}
                    data={
                        {
                            datasets:[{
                                label:casesType,
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "#CC1034",
                                data:data
                            }]
                        }
                    }
                options={options}
                />
            )}
            
        </div>
    )
}

export default Graph
