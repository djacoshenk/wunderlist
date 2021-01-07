import React from 'react';

import './GoogleMapMarker.scss';

interface IProps {
  id: string;
}

export default function GoogleMapMarker({ id }: IProps): JSX.Element {
  return <i className={'fas fa-map-marker-alt'} id={id}></i>;
}
