// global variables

// container for provinces
var provinces = [];
var popUpMap = null;

// mapbox Style layer name
// style url: mapbox://styles/ciatph/cj67ldcoi0muu2smku4qksstd
var mbLayerName = "amia-midres-tileset";

// shapefile property name to hex color code key-pair
var colorsNameMap = {
    "Very Low": "#fff5f0",
    "Low": "#fdbea5",
    "Moderate": "#fc7050",
    "High": "#d42020",
    "Very High": "#67000d"   
};


/*
* convert hex color code to RGBA
* from https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
* @author ciatph
*/
function hexToRgbA(hex, opacity){
    var fillOpacity = (opacity != null) ? opacity : 1.0;
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        console.log("color: " + 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ fillOpacity +')');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+ fillOpacity +')';
    }
    throw new Error('Bad Hex');
}

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
* create a specified rgba color
* @colorName RGB or hexcode color
* @opacity color fill opacity (0.0 to 1.0)
* @return RGBA output

var createColor = function(colorName, opacity){
    var transparency = (opacity != null) ? opacity : 0.8;
    var color = (colorName.indexOf("rgba") >= 0) ? colorName : hexToRgbA(colorName, transparency);
    var fillOpacity = (opacity != null) ? opacity : 1;
}
*/



/*
 * create a random-colored layer with filter
 * @layerName custom mapbox layer ID
 * @filterValue data property name on which this colored layer is applied
 * @colorValue html hexcode of specified color value. Takes a random color value if null
 * @author ciatph
 * @return json mapbox filtered layer
*/
var createColoredLayer = function(layerName, filterValue, colorValue, opacity){
    var colorLayer = (colorValue != null) ? colorValue : randomizeColors();
    var transparency = (opacity != null) ? opacity : 0.8;

    // test: color all quezon green
    return {
        "id": layerName,
        "type": "fill",
        "source": "composite",
        "source-layer": mbLayerName,
        "layout": {},
        "paint": {
            "fill-color": colorLayer,
            "fill-opacity": transparency
        },
        "filter": ["==", filterValue, ""]
    };   
};


/*
 * paint a random color overlay on top of each province
 * @propertyFilter name of GeoJSON/shapefile property on which to apply the color ("PROV_NAME")
 *                 "PROV_NAME" : for municipalities
                   "VA_Class" : for very high, low, moderate, high, very low classifications
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
            map.addLayer(createColoredLayer("amia-" + joined, propertyFilter, hexToRgbA(colorsNameMap[joined], 1.0)), 1.0);
            map.setFilter("amia-" + joined, ["==", propertyFilter, joined]); 
        }
    }   
};