import React from 'react'
import './Table.css';
import numeral from "numeral";

function Table({countries}) {
    return (
        <div className="table">
           {countries.map(({country,active},i) => (
            <tr >
            <td>{i+1}</td>
            <td> {country}</td>
            <td> {numeral(active).format("0,0")}
            </td>
            </tr>
          ))}
        </div>
    )
}

export default Table;
