import React from 'react';
import './Map.css';
import {MapContainer ,TileLayer} from 'react-leaflet';
import { showDataOnMap } from "./exportedData";


function Map({countries,casesType,center,zoom}) {
    //console.log(countries)
    return (
        <div className="map">
           <MapContainer 
           key={countries.country}
           center={center}
            zoom={zoom}>
               <TileLayer 
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               />
               {showDataOnMap(countries, casesType)
               }
           </MapContainer>
        </div>
    );
}

export default Map;
