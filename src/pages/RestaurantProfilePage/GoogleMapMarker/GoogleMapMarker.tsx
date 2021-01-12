import './GoogleMapMarker.scss';

type Props = {
  id: string;
};

export default function GoogleMapMarker({ id }: Props): JSX.Element {
  return <i className={'fas fa-map-marker-alt'} id={id}></i>;
}
