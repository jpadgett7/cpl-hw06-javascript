(function() {
  'use strict';

  const trackerURL = 'http://meowthtracker.mwisely.xyz';
  const meowthImageURL = 'images/meowth.png';
  const rollaCenter = [37.948889, -91.763056];
  const osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osmAttrib = [
    'Map data ©',
    '<a bhref="http://openstreetmap.org">OpenStreetMap</a>',
    'contributors'
  ].join(' ');
  const refreshTime = 500;

  // Document Elements
  const progbar = document.getElementById('pBar');
  const transport = document.getElementById('transportName');
  const zoomM = document.getElementById('zoomMeowth');
  const zoomT = document.getElementById('zoomTarget');
  const zoomO = document.getElementById('zoomOut');
  const follow = document.getElementById('follow');

  // Map Declaration
  var map = L.map('map').setView((rollaCenter), 10);
  L.tileLayer(osmUrl, {
    attribution: osmAttrib,
    maxZoom: 20
  }).addTo(map);

  // Marker Declarations
  var meowthIcon = L.icon({
    iconUrl: meowthImageURL,
    iconSize: [50, 50],
    iconAnchor: [25, 50]
  });
  var meowthMarker = L.marker(rollaCenter, {icon: meowthIcon}).addTo(map);
  var targetMarker = L.marker(rollaCenter).addTo(map);

  // Data Retrieval Function (Fires Every Half-Second)
  (function findMeowth() {
    $.getJSON(trackerURL + '/position.json', function(locData) {
      transport.innerHTML = locData['Transport'];
      progbar.innerHTML = Math.round(locData['Progress']*10000)/100 + '%';
      progbar.style.width = Math.round(locData['Progress']*10000)/100 + '%';
      meowthMarker.setLatLng([locData['Lat'], locData['Long']]);
    });
    $.getJSON(trackerURL + '/target.json', function(data) {
      targetMarker.setLatLng([data['Lat'], data['Long']]);
    });
    setTimeout(function () {
      findMeowth();
    }, refreshTime);
  })();

  // Event Handler: Zoom to Meowth
  zoomM.addEventListener('click', function(e) {
    if (e) e.preventDefault();
    follow.checked = false;
    map.flyTo(meowthMarker.getLatLng(), 16);
  });
  // Event Handler: Zoom to Target
  zoomT.addEventListener('click', function(e) {
    if (e) e.preventDefault();
    follow.checked = false;
    map.flyTo(targetMarker.getLatLng(), 16);
  });
  // Event Handler: Zoom Out
  zoomO.addEventListener('click', function(e) {
    if (e) e.preventDefault();
    follow.checked = false;
    map.flyTo(rollaCenter, 10);
  });
  // Event Handler: Follow Meowth
  follow.addEventListener('change', function followMe(e) {
    if (e) e.preventDefault();
    if (follow.checked) {
      map.panTo(meowthMarker.getLatLng());
      setTimeout(function () {
        followMe(e);
      }, refreshTime);
    }
  });
})();
