import React, { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import Map, { getHospitals, getGeocoding } from './MapGl';

export interface BodyProps {
    coord: any,
    setSelectedHospital: any
    listOfHospitals: Array<any>,
    setListHospital: Function,
    selectedHospital: any,
    search: Boolean
}

const Body: React.FC<BodyProps> = props => {
    const { coord, listOfHospitals, setListHospital } = props
    const [selected, selectRadio] = useState('none');

    const setSelectedRadio = (val: string) => {
        selectRadio(val);
        getGeocoding(coord, val, props.setListHospital);
    }
    useEffect(() => {        
        getHospitals(coord, setListHospital);
    }, [coord,setListHospital]);
    return (
        <Container className='flex flex-row body-wrapper space-around-row' maxWidth='lg'>
                <div className='map-box color-primary'>
                    { listOfHospitals && <Map selected={selected} setSelectedRadio={setSelectedRadio} { ...props} />}
                </div>
        </Container>
    )
}
export default Body;
