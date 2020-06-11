import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Input, List, ListItem, ListItemText } from '@material-ui/core';

export interface PlaceSearchProps {
    address: string,
    setCoords: Function,
    setAddress: Function,
    displayMap: Boolean,
    setSearch: Function
}

const PlaceSearch: React.FC<PlaceSearchProps> = props => {
    const { address, setCoords, setAddress } = props;

    const processAddress = async (addressVal: any) => {
        try {
            const result = await geocodeByAddress(addressVal);
            const coords = await getLatLng(result[0]);

            setCoords(coords);
        } catch(error) {
            alert(error.message);
        }
    }

    return (
        <PlacesAutocomplete
            onChange={(val) => setAddress(val)}
            onSelect={(val) => processAddress(val)}
            value={address}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <>
                    <div className='place-finder-input'>
                        <Input { ...getInputProps({ placeholder: 'Find hospital' })} />
                    </div>

                    {
                        suggestions.length > 0 && (
                            <List className='topper'>
                                { suggestions.map((suggestion: any) => <ListItem><ListItemText primary={suggestion.description} /></ListItem>)}
                            </List>
                        )
                    }
                </>
            )}
        </PlacesAutocomplete>
    )
}

export default PlaceSearch;
