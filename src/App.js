import React, {useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import "leaflet/dist/leaflet.css";
import Table from './Table';
import Graph from './Graph';
import {sortData} from './exportedData';
import './App.css';
import {Card,CardContent, FormControl,MenuItem,Select} from "@material-ui/core";
//https://disease.sh/v3/covid-19/countries
function App() {
  const [countries,setCountries]=useState([]);
  const [country,setCountry]=useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tabledata,setTabledata]=useState([]);
  const [casesType, setCasesType]=useState("cases");
  const [mapcenter,setmapcenter]=useState([34.80746, -40.4796 ]);
  const [mapzoom,setmapzoom]=useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then(res=>res.json())
    .then(data=>{
      setCountryInfo(data);
    })
  },[])
  useEffect(()=>{
    const getCountriesData=async()=>{
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((res)=>res.json())
      .then((data)=>{
        const countries=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2
          }
        ));
        const sorteddata=sortData(data);
        setTabledata(sorteddata);
        setCountries(countries);
        setMapCountries(data);
      })
    }
    getCountriesData();
  },[]);

  const oncountryChange=async(e)=>{
    const countrycode=e.target.value;
    //console.log(countrycode);
    const url=countrycode==="worldwide"? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${countrycode}`
    await fetch(url)
    .then(res=>res.json())
    .then(data=>{
      setCountry(countrycode);
      setCountryInfo(data);
      setmapcenter([data.countryInfo.lat,data.countryInfo.long]);
      setmapzoom(4);
    })
  };
  //console.log(countryInfo);
  return (
    <div key={countries.country} className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid-19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select onChange={oncountryChange}varient="outlined" value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>

              ))}
            </Select>
          </FormControl>
        </div>
        <div   className="app_cards">
                <InfoBox 
                //active={casesType === "cases"}
                 onClick={(e) => setCasesType("cases")}
                  title="Cases" total={countryInfo.cases} 
                  cases={countryInfo.todayCases}
                  />
                <InfoBox 
                //active={casesType === "recovered"}
                 onClick={(e) => setCasesType("recovered")}
                 title="Recovered" total={countryInfo.recovered} 
                 cases={countryInfo.todayRecovered}
                 />
                <InfoBox
                // active={casesType === "deaths"}
                 onClick={(e) => setCasesType("deaths")}
                  title="Death" total={countryInfo.deaths}
                   cases={countryInfo.todayDeaths}
                   />
        </div>
        <Map
        center={mapcenter}
         zoom={mapzoom}
         countries={mapCountries}
         casesType={casesType}
         />
      </div>
      
        <Card className="app_right">
          <CardContent>
                  <h3>Live cases Table</h3>
                  <Table countries={tabledata}></Table>
                  <h3>Worldwide {casesType}</h3>
                  <Graph className="graph" casesType={casesType}/>
          </CardContent>
        </Card>
   
      
    </div>
  );
}

export default App;
