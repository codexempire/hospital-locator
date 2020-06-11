import React from 'react';
import Map, { getHospitals } from './components/MapGl';

export const loadUpMap = (props: any) => {
    getHospitals(props.coords, props.setListHospital);
    if(props.listOfHospitals.length > 0) {
        return <Map { ...props} />
    }
}