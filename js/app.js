// global variables

// container for provinces
var provinces = [];

// mapbox Style layer name
// style url: mapbox://styles/ciatph/cj67ldcoi0muu2smku4qksstd
var mbLayerName = "amia-midres-tileset";


/*
 * generate a random RGBA color
 * @author ciatph 
 * @return string randomized RGBA values
*/
var randomizeColors = function(){
    var min = 0;
    var max = 255;

    var rgb = "rgba(";
    for(var i=0; i<3; i++){
        rgb += (Math.floor(Math.random() * (max - min + 1)) + min) + ", ";
    }
    
    rgb = rgb.trimRight(", ") + " 0.5)";       
    return rgb;
};



/*
 * create a random-colored layer with filter
 * @layerName custom mapbox layer ID
 * @filterValue data property name on which this colored layer is applied
 * @author ciatph
 * @return json mapbox filtered layer
*/
var createColoredLayer = function(layerName, filterValue){
    // test: color all quezon green
    return {
        "id": layerName,
        "type": "fill",
        "source": "composite",
        "source-layer": mbLayerName,
        "layout": {},
        "paint": {
            "fill-color": randomizeColors(),
            "fill-opacity": 0.8
        },
        "filter": ["==", filterValue, ""]
    };   
};


/*
 * paint a random color overlay on top of each province
 * @propertyFilter name of GeoJSON/shapefile property on which to apply the color ("PROV_NAME")
 * @author ciatph
*/
var colorLayersRandom = function(propertyFilter){
    if(provinces.length > 0)
        return;

    // query a map's rendered features
    var features = map.queryRenderedFeatures({layers:[mbLayerName]});

    // put randommized rgb for each province
    for(var i=0; i<features.length; i++){
        var joined = features[i].properties[propertyFilter];

        if(provinces.indexOf(joined) == -1){
            provinces.push(joined);
            console.log(joined);
            map.addLayer(createColoredLayer("amia-" + joined, propertyFilter));
            map.setFilter("amia-" + joined, ["==", propertyFilter, joined]); 
        }
    }   
};