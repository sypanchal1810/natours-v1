/* eslint-disable */
export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoic2F1cmFiaDE4IiwiYSI6ImNsZWZ5aGlrazAxbWEzcm16MGlndXRraGQifQ.vazn88cywfBbpzBlQiTZlw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/saurabh18/cleg1s4j8001q01lkryj4n8tn',
    scrollZoom: false,
    // center: [-118.113491, 34.111745],
    // zoom: 10,
    interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  map.on('load', function () {
    locations.forEach(loc => {
      new mapboxgl.Popup({
        offset: 30,
        focusAfterOpen: false,
        closeOnClick: false,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);
    });
  });

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    let marker = new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .setPopup(
        // Add popup
        new mapboxgl.Popup({
          offset: 30,
          focusAfterOpen: false,
          closeOnClick: false,
        })
          .setLngLat(loc.coordinates)
          .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
          .addTo(map)
      )
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);

    map.on('click', marker, function (e) {
      // open the popup at the clicked location
      popup.setLngLat(e.lngLat).addTo(map);
    });
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
