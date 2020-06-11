import React from 'react';
import { Input } from '@material-ui/core';

interface SearchProps {
    address: string,
    setAddress: Function
}

const Search: React.FC<SearchProps> = props => {
    return (
        <Input
            value={props.address}
            onChange={(e) => props.setAddress(e.target.value)}
            placeholder='Find a hospital'
        />
    )
}

export default Search;