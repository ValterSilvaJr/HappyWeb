import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map_marker.svg';
import mapIcon from '../util/mapIcon';
import '../styles/pages/orphanages-map.css';
import api from '../services/api';

interface IOrphanage{
  id: number
  name: string
  latitude: number
  longitude: number
}

const OrphanageMap: React.FC = () => {
  const [orphanages, setOrphanages] = useState<IOrphanage[]>([]); 
  
  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  },[]);

  return(
      <div id="page-map">
          <aside>
              <header>
                  <img src={mapMarkerImg} alt="Happy"/>
                  <h2>Escolha um orfanato no mapa</h2>
                  <p>Muitas crianças estão esperando a sua visita :)</p>
              </header>

              <footer>
                  <strong>São Paulo</strong>
                  <span>SP</span>
              </footer>
          </aside>

          <Map 
            center={[-23.8349263,-46.718843]}
            zoom={15}
            style={{width: '100%', height: '100%'}}
          >
              {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
              <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />
              {orphanages.map(orphanage => {
                return(
                  <Marker
                    key={orphanage.id}
                    icon={mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                  >
                    <Popup
                      className="map-popup"
                      closeButton={false}
                      minWidth={240}
                      maxHeight={240}
                    >
                      {orphanage.name}
                      <Link to={`/orphanages/${orphanage.id}`}>
                        <FiArrowRight size={20} color="#fff" />
                      </Link>
                    </Popup>
                  </Marker>
                );
              })}
          </Map>

          <Link to="/orphanages/create" className="create-orphanage"> 
            <FiPlus size={32} color="#fff" />
          </Link>
      </div>
  );
}

export default OrphanageMap;