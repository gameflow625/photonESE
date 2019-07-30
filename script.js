//var map = L.map("map").setView([48.85, 2.35], 12);

var API_URL = '//api-adresse.data.gouv.fr';

var searchPoints = L.geoJson(null, {
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
});

function showSearchPoints(geojson) {
    searchPoints.clearLayers();
    searchPoints.addData(geojson);
}

var photonControlOptions = {
    resultsHandler: showSearchPoints,
    placeholder: ' Ex : Rue Diderot Paris',
    position: 'topright',
    url: API_URL + '/search/?',
    noResultLabel: 'Aucun résultat',
};

var map = L.map("map", {
    center: [49.047, 1.605],
    zoom: 13,
    zoomControl: false/*,
    photonControl: true,
    photonControlOptions: photonControlOptions*/
});

searchPoints.addTo(map);

var photonControl = new L.Control.Photon(photonControlOptions);
var photonContainer = photonControl.onAdd(map);
document.body.appendChild(photonContainer);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
