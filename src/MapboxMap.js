/* See https://github.com/mapbox/mapbox-react-examples/ for full example */
import { Component } from 'react';
import React from 'react';
import styled from 'styled-components';
import ReactSearchBox from 'react-search-box'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const locations = {
  "world": {
    center: [-73.98939962913566, 40.739279870691945],
    bearing: 0,
    pitch: 0,
    zoom: 12.534215934726939
  },
  "nearby": {
    center: [-73.99006854421674, 40.73909091037265],
    bearing: 28.942095266613023,
    pitch: 0,
    zoom: 16
  },
  "office": {
    center: [-73.98935152618789, 40.73936415708215],
    zoom: 20.17566570344819,
    bearing: 119.1032866973844,
    pitch: 0,
    speed: 0.8
  },
  "tv": {
    center: [-73.98942513163618, 40.73933588953602],
    zoom: 22.99570585184369,
    bearing: -150.8111894137931,
    pitch: 30,
    speed: 0.8
  },
  "rooms": {
    center: [-73.9895738458099, 40.73932453703276],
    zoom: 21.412606769796117,
    bearing: 101.98881058620714,
    pitch: 40,
    speed: 0.8
  },
  "jack": {
    center: [-73.98943057776535, 40.73923886388985],
    zoom: 22.212606769796117,
    bearing: 119.1032866973844,
    pitch: 0,
    speed: 0.8
  }
}

const MapContainer = styled.div`
  height: 100%;
`;

const Map = styled.div`
  height: 100%;
`;

const MapActions = styled.div`
  height: 100px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const ActionButton = styled.button`
  background-color: rgb(22, 115, 230);
  font: 600 18px proxima-nova, "Proxima Nova", Arial, Helvetica, sans-serif;
  border: 1px solid #1673E6;
  height: 60px;
  width 325px;
  color: white;
  text-align: center;
  justify-content: center;
  align-items:center;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 10px 10px 21px -9px rgba(0,0,0,0.39);
`;

const JackContainer = styled.div`
  overflow: hidden;
  border-radius: 50%;
  width: 60px;
  height: 60px;
`;
const Jack = styled.img.attrs({
  src: 'jack.jpg'
})`
  display: inline;
  margin: 0 auto;
  height: 100%;
  width: auto;
  cursor: pointer;
`;

class MapboxMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lng: -73.98939962913566,
      lat: 40.739279870691945,
      zoom: 11,
      height: window.innerHeight,
      mode: "world"
    };
  }

  componentDidUpdate(prevProps, prevState) {
    this.map.flyTo(locations[this.state.mode]);

    if (this.state.mode === "rooms") {
      this.map.setPaintProperty('ml1', 'fill-opacity', 0.4);
      this.map.setPaintProperty('ml2', 'fill-opacity', 0.4);
      this.map.setPaintProperty('ml3', 'fill-opacity', 0.4);
      this.map.setPaintProperty('ml4', 'fill-opacity', 0.4);
      this.map.setPaintProperty('labels', 'text-opacity', 1);
    } else {
      this.map.setPaintProperty('ml1', 'fill-opacity', 0);
      this.map.setPaintProperty('ml2', 'fill-opacity', 0);
      this.map.setPaintProperty('ml3', 'fill-opacity', 0);
      this.map.setPaintProperty('ml4', 'fill-opacity', 0);
      this.map.setPaintProperty('labels', 'text-opacity', 0);
    }

    if (this.state.mode === "jack") {
      this.map.setPaintProperty('jack', 'fill-opacity', 0.6);
      this.map.setPaintProperty('route', 'line-opacity', 0.6);
    } else {
      this.map.setPaintProperty('jack', 'fill-opacity', 0);
      this.map.setPaintProperty('route', 'line-opacity', 0);
    }

    if (this.state.mode === "nearby") {
      this.map.setPaintProperty('nearby-labels', 'text-opacity', 1);
    } else {
      this.map.setPaintProperty('nearby-labels', 'text-opacity', 0);
    }
  };

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom
    });

    var framesPerSecond = 15;
    var initialOpacity = 1
    var opacity = initialOpacity;
    var initialRadius = 8;
    var radius = initialRadius;
    var maxRadius = 18;

    this.map.on('load', () => {
      this.map.addSource("floorplan", {
        "type": "image",
        "url": "map_rotated.png",
        "coordinates": [
          [-73.9899761491, 40.7397204722],
          [-73.9887899627, 40.7397204722],
          [-73.9887899627, 40.7390271158],
          [-73.9899761491, 40.7390271158]
        ]
      });

      this.map.addLayer({
        "id": "floorplan",
        "type": "raster",
        "source": "floorplan"
      });

      // Add a source and layer displaying a point which will be animated in a circle.
      this.map.addSource('point', {
        "type": "geojson",
        "data": {
          "type": "Point",
          "coordinates": [-73.98942367062357, 40.739338685581686]
        }
      });

      this.map.addLayer({
        "id": "point",
        "source": "point",
        "type": "circle",
        "paint": {
          "circle-radius": initialRadius,
          "circle-radius-transition": { duration: 0 },
          "circle-opacity-transition": { duration: 0 },
          "circle-color": "#007cbf"
        }
      });

      this.map.addLayer({
        "id": "point1",
        "source": "point",
        "type": "circle",
        "paint": {
          "circle-radius": initialRadius,
          "circle-color": "#007cbf"
        }
      });

      this.map.addLayer({
        'id': 'ml1',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-73.98954559426502, 40.739455903329514],
              [-73.98949948681687, 40.73943644855092],
              [-73.98952046984081, 40.73935862936759],
              [-73.989571823053, 40.73936636945382],
              [-73.98954669862876, 40.73945485737036],
              [-73.98954559426502, 40.739455903329514]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#68d807',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1000 }
        }
      });

      this.map.addLayer({
        'id': 'ml2',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-73.98957220947315, 40.73936587527649],
              [-73.98952061914088, 40.7393574387504],
              [-73.98953435181829, 40.73930878805737],
              [-73.98958668444226, 40.73931694337739],
              [-73.98957220947315, 40.73936587527649]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#ff2116',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1000 }
        }
      });

      this.map.addLayer({
        'id': 'ml3',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-73.98953597112634, 40.739307953727064],
              [-73.98954870885878, 40.73925850065439],
              [-73.98960128147725, 40.73926683776136],
              [-73.98958621355538, 40.739315932438416]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#ff2116',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1000 }
        }
      });

      this.map.addLayer({
        'id': 'ml4',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-73.98954974108402, 40.73925748813599],
              [-73.98956744310185, 40.73919299147062],
              [-73.98961836468702, 40.73921517384136],
              [-73.98960311420916, 40.739266112109306]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#ff8400',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1000 }
        }
      });

      this.map.addLayer({
        'id': 'labels',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.98953681991519, 40.73939970220445]
              },
              "properties": {
                "title": "Open",
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.98955471971007, 40.739340049407474]
              },
              "properties": {
                "title": "Occupied",
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.98956846602674, 40.739290385721944]
              },
              "properties": {
                "title": "Occupied",
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.98958165688448, 40.73923386578531]
              },
              "properties": {
                "title": "Open (13min)",
              }
            }]
          }
        },
        'layout': {
          "text-field": "{title}",
        },
        'paint': {
          'text-color': 'black',
          'text-opacity': 0,
          'text-halo-color': "#fff",
          'text-halo-width': 2,
          'text-opacity-transition': { duration: 1000 }
        }
      });

      this.map.addLayer({
        'id': 'nearby-labels',
        'type': 'symbol',
        'source': {
          'type': 'geojson',
          "data": {
            "type": "FeatureCollection",
            "features": [{
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.990446, 40.736543]
              },
              "properties": {
                "title": "Union Square\nSubway",
                "icon": "rail-metro"
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.992369, 40.742370]
              },
              "properties": {
                "title": "Outback\nSteakhouse",
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.988512, 40.738448]
              },
              "properties": {
                "title": "Gramercy Tavern",
              }
            }, {
              "type": "Feature",
              "geometry": {
                "type": "Point",
                "coordinates": [-73.988183, 40.741468]
              },
              "properties": {
                "title": "Shake Shack",
              }
            }]
          }
        },
        'layout': {
          "text-field": "{title}",
          "icon-image": "{icon}-11",
          "text-offset": [0, 0.6],
          "text-size": 24,
          "text-anchor": "top"
        },
        'paint': {
          'text-color': '#114c99',
          'text-opacity': 0,
          'text-halo-color': "#fff",
          'text-halo-width': 2,
          'text-opacity-transition': { duration: 1000 },
        }
      });


      this.map.addLayer({
        'id': 'jack',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'geometry': {
              'type': 'Polygon',
              'coordinates': [[[-73.98940941644133, 40.73915429657387],
              [-73.98941376115552, 40.73914840633526],
              [-73.98942568961334, 40.73915305406223],
              [-73.98942167772744, 40.739159308928464],
              [-73.98940941644133, 40.73915429657387]]]
            }
          }
        },
        'layout': {},
        'paint': {
          'fill-color': '#61be10',
          'fill-opacity': 0,
          'fill-opacity-transition': { duration: 1000 }
        }
      });


      this.map.addLayer({
        "id": "route",
        "type": "line",
        "source": {
          "type": "geojson",
          "data": {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": [
                [-73.98942367062357, 40.739338685581686],
                [-73.98939595256763, 40.73932537572796],
                [-73.98950386446162, 40.73917584154643],
                [-73.98942676083836, 40.73914303251928],
                [-73.98942075732752, 40.739151171625565]
              ]
            }
          }
        },
        "layout": {
          "line-join": "round",
          "line-cap": "round"
        },
        "paint": {
          "line-opacity": 0,
          'line-opacity-transition': { duration: 1000 },
          "line-color": "#61be10",
          "line-width": 8
        }
      });


      const animateMarker = (timestamp) => {
        setTimeout(() => {
          requestAnimationFrame(animateMarker);

          radius += (maxRadius - radius) / framesPerSecond;
          opacity -= (.9 / framesPerSecond);

          if (opacity <= 0) {
            radius = initialRadius;
            opacity = initialOpacity;
          }

          this.map.setPaintProperty('point', 'circle-radius', radius);
          this.map.setPaintProperty('point', 'circle-opacity', opacity);

        }, 1000 / framesPerSecond);

      }

      // Start the animation.
      animateMarker(0);

      this.map.on("click", (e) => {
        console.log(`[${e.lngLat.lng}, ${e.lngLat.lat}]`);
      })
    });
  }

  render() {
    const { height } = this.state;

    return (
      <MapContainer>
        <Map style={{ height: height }} ref={el => this.mapContainer = el} className="absolute top right left bottom" />
        <MapActions>
          <ActionButton onClick={() => { this.setState({ mode: 'nearby' }) }}>
            Whats Nearby?
            </ActionButton>
          <ActionButton onClick={() => { this.setState({ mode: 'office' }) }}>
            Office Overview
            </ActionButton>
          <ActionButton onClick={() => { this.setState({ mode: 'tv' }) }}>
            Where Am I?
            </ActionButton>
          <ActionButton onClick={() => { this.setState({ mode: 'rooms' }) }}>
            Meeting Rooms
            </ActionButton>
          <JackContainer onClick={() => { this.setState({ mode: 'jack' }) }}>
            <Jack />
          </JackContainer>
        </MapActions>
      </MapContainer>
    );
  }
}

export default MapboxMap