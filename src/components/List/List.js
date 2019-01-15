import React from 'react';

import ListItem from '../ListItem/ListItem';

const list = (props) => {
    return props.places.map((place, i) => (
        <ListItem key={i} placeName={place} />
    ));
};

export default list;