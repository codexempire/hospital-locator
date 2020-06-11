import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AppHeader from './components/AppHeader';
import { Container, Card } from '@material-ui/core';
import { AddAlert, WifiOff } from '@material-ui/icons';
import Body from './components/Body';

interface offlineProps {
    online: Boolean
    displayOffline: Boolean
}

const Offline: React.SFC<offlineProps> = props => (
    !props.online || props.displayOffline ? <><WifiOff width='100px' height='100px' style={{ position: 'absolute', top: '40%'}} /><div className='offline-div'>You are presently offline check you internet connection and <span onClick={() => window.location.reload()}>retry</span></div></> : null
);

const App: React.FC = () => {
    const [coords, setCoords]: any = useState(null);
    const [search, setSearch]: any = useState(false);
    const [error, setPositionError]: any = useState(null);
    const [selectedHospital, setSelectedHospitals] = useState(null);
    const [address, setAddress]: any = useState('');
    const [online, setOnlineStat]: any = useState(false);
    const [listOfHospitals, setListOfHospitals]: any = useState([]);

    useEffect(() => {
        if (navigator.onLine) {
            setOnlineStat(navigator.onLine);
        }
    }, []);

    useEffect(() => {
        if(online) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { coords: { latitude, longitude } } = position;
                    setCoords({ lat: latitude, lng: longitude });
                }, (err) => setPositionError(err));
            }
        }
    }, [online]);

    const displayMap = coords && !error;
    const displayOffline = coords && error
    if (online) {
        return (<Container fixed={true} maxWidth='md' className='flex flex-column'>
            <AppHeader setSearch={setSearch} address={address} setCoords={setCoords} setAddress={setAddress} displayMap={displayMap} />
            {error && <Card><AddAlert />{error.message}</Card>}
            {displayOffline && <Offline online={online} displayOffline={true} />}
            {displayMap && <Body search={search} coord={coords} setSelectedHospital={setSelectedHospitals} listOfHospitals={listOfHospitals} setListHospital={setListOfHospitals} selectedHospital={selectedHospital} /> }
        </Container>)
    } else { return <Offline online={online} displayOffline={true} /> }
}

ReactDOM.render(<App />, document.getElementById('root'));
