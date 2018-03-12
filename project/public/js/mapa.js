var center = new google.maps.LatLng(19.4330479, -99.1471648);
var mapas=[];
var zoom=6;
var comboauto=[];
var countryRestrict = {'country': 'mx'};
var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;
function autocompletado(campo) {
    var autocompletar = new google.maps.places.Autocomplete($("#"+campo)[0], {types: ['geocode'],componentRestrictions: countryRestrict});
    comboauto.push(autocompletar);
}
function initialize(mapa,zoom,clickzoom=false) {
    var mapOptions = {
        disableDoubleClickZoom: clickzoom,
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        center: center
    };
    var map = new google.maps.Map(document.getElementById(mapa), mapOptions);
    mapas.push(map);
}