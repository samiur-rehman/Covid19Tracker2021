import { Card, FormControl, MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import InfoxBox from "./InfoxBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import { sortData,prettyPrintStat } from "./utl";
import "leaflet/dist/leaflet.css";
import logo from './images/image.png';
import Footer from "./Footer";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenterZoom, setMapCenterZoom] = useState({
    center: [34.80746, -40.4796],
    zoom: 3,
  });
  const [mapCountries, setmapCountries] = useState([]);
  const [casesType, setcasesType] = useState("cases");
 
  // first time loading to pull data
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        //setCountry(countrycode);

        setCountryInfo(data);
      });
  }, []);
  // first time loading to pull data Ends here!!!!!!!!!

  useEffect(() => {
    const getCountriesData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        // fetch("https://disease.sh/v3/covid-19/countries")
        // .then((res)=>res.json())
        .then((response) => {
          const countries = response.data;
          // countries.map(() => ({
          //  name: country.country,
          //  value: country.countryInfo.iso3,
          //  active_cases: country.active,
          // }));
          //TableData
          // const sortedData = sortData(countries)
          const sortedData = sortData(countries);
          setTableData(sortedData);
          setmapCountries(countries);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countrycode = e.target.value;
    setCountry(countrycode);
    const url =
      countrycode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countrycode}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countrycode);
        setCountryInfo(data);

        countrycode === "worldwide"
          ? setMapCenterZoom({ center: [34.80746, -40.4796], zoom: 3 })
          : setMapCenterZoom({
              center: [data.countryInfo.lat, data.countryInfo.long],
              zoom: 5,
            });

        
      });
  };

  console.log(countryInfo);
  return (
    <>
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/* <h1>Covid19 Tracker</h1> */}
         <img className="logo" src={logo}  width="auto" height="50" alt="COVID-19"></img>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map(({ country }, i) => (
                <MenuItem key={i} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stat">
          {/* info Boxx */}
          <InfoxBox
            isRed
            title="Cases"
            country={country}
            clicked={casesType === "cases"}
            onClick={(e) => setcasesType("cases")}
            //cases={prettyPrintStat(countryInfo.todayCases)}
            cases={(countryInfo.todayCases)>1000 ? prettyPrintStat(countryInfo.todayCases) :(countryInfo.todayCases)}
           //active={prettyPrintStat(countryInfo.active)}
            active={(countryInfo.active)>1000 ? prettyPrintStat(countryInfo.active) :(countryInfo.active)}
           // total={prettyPrintStat(countryInfo.cases)}
            total={(countryInfo.cases)>1000 ? prettyPrintStat(countryInfo.cases) :(countryInfo.cases)}
            updated={countryInfo.updated}
          />

          <InfoxBox
            title="Recovered"
            country={country}
            clicked={casesType === "recovered"}
            onClick={(e) => setcasesType("recovered")}
            //cases={prettyPrintStat(countryInfo.todayRecovered)}
            cases={(countryInfo.todayRecovered)>1000 ? prettyPrintStat(countryInfo.todayRecovered) :(countryInfo.todayRecovered)}
           //critical={prettyPrintStat(countryInfo.critical)}
            critical={(countryInfo.critical)>1000 ? prettyPrintStat(countryInfo.critical) :(countryInfo.critical)}
          //total={prettyPrintStat(countryInfo.recovered)}
            total={(countryInfo.recovered)>1000 ? prettyPrintStat(countryInfo.recovered) :(countryInfo.recovered)}
            updated={countryInfo.updated}
          />

          <InfoxBox
            isRed
            title="Deaths"
            country={country}
            clicked={casesType === "deaths"}
            onClick={(e) => setcasesType("deaths")}
           //cases={prettyPrintStat(countryInfo.todayDeaths)}
            cases={(countryInfo.todayDeaths)>1000 ? prettyPrintStat(countryInfo.todayDeaths) :(countryInfo.todayDeaths)}
          //total={prettyPrintStat(countryInfo.deaths)}
            total={(countryInfo.deaths)>1000 ? prettyPrintStat(countryInfo.deaths) :(countryInfo.deaths)}
         //tests={prettyPrintStat(countryInfo.tests)}
            tests= {(countryInfo.tests)>1000 ? prettyPrintStat(countryInfo.tests) :(countryInfo.tests)}
            updated={countryInfo.updated}
          />
        </div>
        {/*  */}
        <Map
          casesType={casesType}
          center={mapCenterZoom.center}
          zoom={mapCenterZoom.zoom}
          countries={mapCountries}
         
        />
      </div>
      <Card className="app__right">
        <h3>worldwide most  active cases</h3>
        <Table countries={tableData} />
        <h3 className="app__graphTitle">worldwide {casesType}</h3>
        {/* Line Graph */}
        <LineGraph casesType={casesType}/>
      </Card>

     
    </div>
    <Footer/>
    </>
  );
}
export default App;