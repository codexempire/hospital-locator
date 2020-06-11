import React from 'react';
import { AppBar } from '@material-ui/core';
import PlaceSearch, { PlaceSearchProps } from './PlaceSearch';
import Search from './SearchPlaces';
import MapboxAutocomplete from 'react-mapbox-autocomplete';

const AppHeader: React.FC<PlaceSearchProps> = props => {
    const _suggestionSelect = (result: any, lat: any, lng: any, text: any) => {
        props.setCoords({ lat, lng });
        props.setSearch(true);
     }
    return(
        <AppBar position='static' className='app-header'>
            <span className='title'>Hospitela</span>
            {/* { props.displayMap && <PlaceSearch { ...props } /> } */}
            <div style={{ width: '30%' }}>
                <MapboxAutocomplete publicKey='pk.eyJ1IjoiY29kZXhlbXBpcmUiLCJhIjoiY2tiOWNydmxkMGN0ZzJ6cGk2eW5ucWVkYSJ9.3_IGZN9HiJ3Y8dxh5MCwpQ'
                    search_text='hospital'
                    inputClass='form-control search'
                    placeholder='Find a hospital'
                    onSuggestionSelect={_suggestionSelect}
                    country='ng'
                    resetSearch={false}/>
            </div>
        </AppBar>
    )
}

export default AppHeader;
