import React, { useState, useEffect } from 'react';
import Mapgl, { Marker } from 'react-map-gl';
import { LocationOnSharp } from '@material-ui/icons';
import { Card, CardActionArea, Radio, CardContent } from '@material-ui/core';

export interface MapGLProps {
    coord: any,
    setSelectedHospital: any
    listOfHospitals: Array<any>,
    setListHospital: Function,
    selectedHospital: any,
    selected: string,
    setSelectedRadio: Function,
    search: Boolean
}

const tenKm = 0.0900900901;
const twentyKm = 0.1801801802;
const thirtyKm = 0.2702702703;

const distances: any = { '10Km': tenKm, '20Km': twentyKm, '30Km': thirtyKm };

export const getGeocoding = (coord: any, km: string, setState: Function) => {
    let dist: any;
    if(km !== 'none') dist = distances[km];
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?types=poi&bbox=-${coord.lng - dist},${coord.lat - dist},${coord.lng + dist},${coord.la + dist}&country=566&access_token=pk.eyJ1IjoiY29kZXhlbXBpcmUiLCJhIjoiY2tiOWNydmxkMGN0ZzJ6cGk2eW5ucWVkYSJ9.3_IGZN9HiJ3Y8dxh5MCwpQ`)
        .then(res => res.json())
        .then(data => setState(data.features))
        .catch(err => console.log(err.message));
}

export const getHospitals = (coords: any, setState: any) => {
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?bbox=${coords.lng + -0.5},${coords.lat + -0.5},${coords.lng + 0.5},${coords.lat+ 0.5}&proximity=${coords.lng},${coords.lat}&country=NG&access_token=pk.eyJ1IjoiY29kZXhlbXBpcmUiLCJhIjoiY2tiOWNydmxkMGN0ZzJ6cGk2eW5ucWVkYSJ9.3_IGZN9HiJ3Y8dxh5MCwpQ`)
        .then(res => res.json())
        .then(data => setState(data.features))
        .catch(err => console.log(err.message));
}

const MapGL: React.FC<MapGLProps> = props => {

    const { coord, setSelectedHospital, listOfHospitals } = props;

    const [viewport, setViewPort]: any = useState({
        width: '100%',
        height: '100%',
        zoom: 12
    });


    useEffect(() => {
        setViewPort({
            ...viewport,
            latitude: coord.lat,
            longitude: coord.lng
        });
    }, [coord])

    const selectHospital = (e: any) => {
        e.preventDefault();
        setSelectedHospital(coord);
    }

    const showSearch = !listOfHospitals && props.search;
    if(showSearch) {
        setViewPort({
            ...viewport,
            latitude: coord.lat,
            longitude: coord.lng
        });
    }
    return (
        <>
            <Mapgl {...viewport}
                mapboxApiAccessToken='pk.eyJ1IjoiY29kZXhlbXBpcmUiLCJhIjoiY2tiOWNydmxkMGN0ZzJ6cGk2eW5ucWVkYSJ9.3_IGZN9HiJ3Y8dxh5MCwpQ'
                mapStyle='mapbox://styles/codexempire/ckb9dlcxs0why1iqhw08wqp9u'
                onViewportChange={view => setViewPort({ ...view, width: viewport.width, height: viewport.height })}
            >
                {listOfHospitals.length > 0 && <Marker latitude={coord.lat} longitude={coord.lng}>
                    <LocationOnSharp className='marker' width='100px' height='100px' style={{ color: 'blue' }} />
                </Marker>}
                {
                    listOfHospitals.length > 0 && listOfHospitals.map((hospital: any) => (
                        <Marker key={hospital.id} latitude={hospital.geometry.coordinates[1]} longitude={hospital.geometry.coordinates[0]}>
                            <LocationOnSharp className='marker' onClick={() => selectHospital(hospital)} width='25px' height='25px' style={{ color: 'red' }} />
                        </Marker>
                    ))
                }
                {showSearch && <Marker latitude={coord.lat} longitude={coord.lng}>
                    <LocationOnSharp className='marker' width='100px' height='100px' style={{ color: 'blue' }} />
                </Marker>}
            </Mapgl>
            {
                !listOfHospitals.length && <span className='not-found'>No hospital found near your location</span>
            }
            <Card className='proximity-check'>
                <CardContent style={{ borderBottom: '1px solid #333' }}>
                    Search Radius
                </CardContent>
                <CardActionArea>
                    <span>
                        <Radio
                            checked={props.selected === 'none'}
                            // onChange={handleChange}
                            onChange={(e) =>props.setSelectedRadio('none')}
                            value="a"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span>none</span>
                    </span>
                    <span>
                        <Radio
                            checked={props.selected === '10km'}
                            // onChange={handleChange}
                            onChange={() =>props.setSelectedRadio('10km')}
                            value="a"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span>10Km</span>
                    </span>
                    <span>
                        <Radio
                            checked={props.selected === '20km'}
                            // onChange={handleChange}
                            onChange={() =>props.setSelectedRadio('20km')}
                            value="a"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <span>20Km</span>
                    </span>
                    <span>
                        <Radio
                            checked={props.selected === '30km'}
                            // onChange={handleChange}
                            onChange={() =>props.setSelectedRadio('30km')}
                            value="b"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'B' }}
                            
                        />
                        <span>30Km</span>
                    </span>
                </CardActionArea>
            </Card>
        </>
    )
}

export default MapGL;
