import React from 'react';
import './Table.css';

function Table({countries}) {
    //console.log(countries);
    return (
        <div className="table">
            {
                countries.map(country=>(
                        <tr key={country.country}>
                            <td >{country.country}</td>
                            <td  key={country.cases}>
                                <strong>{country.cases}</strong>
                            </td>
                        </tr>


                 ) )
            }
        </div>
    )
}

export default Table

