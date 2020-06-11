import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';

interface MapProps {
    googleMapURL: string,
    loadingElement: any,
    containerElement: any,
    mapElement: any,
    coordinates: any
}

function Map(props: MapProps) {
    
    const { latitude, longitude } = props.coordinates;
    const defaultPosition = { lat: latitude, lng: longitude }

    return (
       <GoogleMap defaultCenter={defaultPosition} defaultZoom={20}>
            <Marker position={defaultPosition} />
       </GoogleMap>
    );
}

export default withScriptjs(withGoogleMap(Map));
