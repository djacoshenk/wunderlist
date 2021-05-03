import 'pages/RestaurantProfilePage/GoogleMapMarker/GoogleMapMarker.scss';

type Props = {
  id: string;
};

export default function GoogleMapMarker({ id }: Props) {
  return <i className={'fas fa-map-marker-alt'} id={id}></i>;
}
