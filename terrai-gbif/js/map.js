/**
 * A helper class for structuring and managing leafletJS map layers
 * Dependencies: leaflet.js at https://leafletjs.com/
 * @ciatph 20180903
 */

const SETTINGS = {
    // flag to use the online or local maps GeoServer
    ONLINE: true
};

var Map = function(){
    // online accessible geoserver
    this.url_online = 'http://terraigbif-server.azurewebsites.net';
    // locallly-installed geoserver 
    this.url_local = 'http://localhost:8080';
    // final base url to use
    this.baseUrl;
    // map's center
    this.center = [];
    // leafletjs layers
    this.layers = {};
    // leafletjs overlay definitions and mapping to layers
    this.overlays = {};
    this.toggle = {};
};


/**
 * Initialize the basic map properties
 * @param {Map's leaflet center longitude, latitude} center 
 * @param {Map's leaflt zoon level} zoom 
 * @param {Flag if tiles should be loaded from local geoserver} isLocal 
 */
Map.prototype.init = function(center, zoom, isLocal){
    if(isLocal !== undefined){
        this.baseUrl = (isLocal) ? this.url_local : this.url_online;
    }
    else{
        this.baseUrl = (SETTINGS.ONLINE) ? this.url_online : this.url_local;
    }

    this.center = center;
    this.zoom = zoom;
};


/**
 * Add and store leaflet layers and overlays
 * @param {Properties of the GeoServer wms fields for leaflet} sublayers 
 */
Map.prototype.addLayer = function(sublayers){
    this.layers[sublayers.name] = L.tileLayer.wms(this.baseUrl + '/geoserver/terrai-gbif/wcs?', {
        layers: sublayers.layers,
        format: 'image/png',
        transparent: true,
        attribution: sublayers.attribution,
        styles: sublayers.styles
    });

    // Listen for the event when all tiles have been loaded and drawn on screen
    this.layers[sublayers.name].on('load', function(){
        console.log("LAYER LOADED!");
        // Hide the loading spinner
        Main.spinner.hide();

        // Hide/remove the loading message notification
        PNotify.removeAll();
    });

    // Set the map overlays
    this.overlays[sublayers.attribution] = this.layers[sublayers.name];
};


/**
 * Initialize the basic map with all layers
 * @param {An array of properties of the GeoServer wms fields for leaflet} sublayers 
 * @param {Map's leaflet center longitude, latitude} center 
 * @param {Map's leaflt zoon level} zoom 
 * @param {Flag if tiles should be loaded from local geoserver} isLocal 
 */
Map.prototype.initialize = function(sublayers, center, zoom, isLocal){
    this.baseUrl = (isLocal !== undefined && isLocal) ? this.url_local : this.url_online;
    this.center = center;
    this.zoom = zoom;

    // Set the layers reference
    for(var i=0; i<sublayers.length; i++){
        this.layers[sublayers[i].name] = L.tileLayer.wms(this.baseUrl + '/geoserver/terrai-gbif/wcs?', {
            layers: sublayers[i].layers,
            format: 'image/png',
            transparent: true,
            attribution: sublayers[i].attribution,
            styles: sublayers[i].styles
        });

        // Set the map overlays
        this.overlays[sublayers[i].attribution] = this.layers[sublayers[i].name];
    }
};


/**
 * Get the leaflet overlay defninitions
 */
Map.prototype.getOverlays = function(){
    return this.overlays;
};



