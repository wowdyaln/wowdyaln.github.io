
mapboxgl.accessToken = 'pk.eyJ1Ijoicm9yb2xvIiwiYSI6ImNqbjAwYWRvbjQ2N2YzcG54b3VyZ2RhYzEifQ.IjerYf_zzUbm5zektYv7nw';

let map = new mapboxgl.Map({
    container: 'map',
  style: 'mapbox://styles/mapbox/streets-v9'
});

map.setZoom(7);
map.dragRotate.disable();
map.setCenter([121.1906843384, 23.37629681022669]);