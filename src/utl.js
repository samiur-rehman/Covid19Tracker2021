import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//dictonary of colors according to cases
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    mulitiplier: 1200,
  },

  recovered: {
    hex: "#00ff40",
    mulitiplier: 800,
  },

  deaths: {
    hex: "#ff0000",
    mulitiplier: 3000,
  },
};

export const sortData = (countries) => {
  const sortedData = [...countries];
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+";

//Draw circle on Maps and Tooltip
export const showDataOnMap = (countries, casesType) =>
  countries.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      pathOptions={{
        color: casesTypeColors[casesType].hex,
        fillColor: casesTypeColors[casesType].hex,
      }}
      radius={
        Math.sqrt(country[casesType] / 15) *
        casesTypeColors[casesType].mulitiplier
      }
    >
      <Popup>
        <div className="tooltip_container">
          <div
            className="info-flag"
            style={{
              backgroundImage: `url(${country.countryInfo.flag})`,
            }}
          >
            {" "}
          </div>
          <div className="info_name_country"> {country.country} </div>

          <div className="info_tooltip">
            <div style={{ color: "#CC1034", fontWeight: "bold" }}>
              Cases:{numeral(country.cases).format("0,0")}{" "}
              {/* Cases in Country */}
            </div>
            <div style={{ color: "#00b33c", fontWeight: "bold" }}>
              Recovered:{numeral(country.recovered).format("0,0")}{" "}
              {/* Recovered in Country */}
            </div>
            <div style={{ color: "black", fontWeight: "bold" }}>
              {" "}
              Deaths:{numeral(country.deaths).format("0,0")}{" "}
              {/* Deaths in Country */}
            </div>
          </div>
        </div>
      </Popup>
    </Circle>
  ));