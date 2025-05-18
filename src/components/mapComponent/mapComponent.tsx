'use client'
import React from 'react';
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';

const defaultState = {
    center: [59.934529, 30.353885],
    zoom: 15,
};

export const MapComponent = () => {
    return (

        <YMaps>
            <Map defaultState={defaultState} className="w-full aspect-video">
                <Placemark geometry={[59.934529, 30.353885]} options={{
                    iconLayout: 'default#image',
                    /*iconImageHref: '/icons/map-marker.svg',
                    iconImageSize: [72, 72]*/
                }}/>
            </Map>
        </YMaps>

    );
};

