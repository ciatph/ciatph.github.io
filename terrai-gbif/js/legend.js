// legends
var legends_list = {};
const maparea = { ASIA:1, LATIN_AMERICA:2 };

// color list

var labels_colors = {
    "Terra-i Base deforestation detection": "#fc8d59",
    "Prumnopitys Andina": "#00ff00",
    "Podocarpus Salignus": "#eeff00",
    "Pilgerodendron Uviferum": "#3182bd",
    "Picea asperata": "#00ff00",
    "Taiwania cryptomerioides": "#eeff00"  
};

var grades_colors = {
    0: "#eeff00",
    1: "#00ff00",
    2: "#1100ff"  
};


/**
 * Create a legend for LA
 * @param {Legend title to print} cats
 * @param {leafletjs DOM positioning} position   
 */
var createLegend = function(cats, position){
    var pos = (position !== undefined) ? position : 'bottomleft';
    var legend = L.control({position: pos});

    legend.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1, 2],
            labels = ['<span id="legend_title"><b>' + cats + '</b></span>'];

		for (var i = 0; i < grades.length; i++) {
            if((cats.indexOf("add") === -1)){
                // Display legends for 0 and 1 only. Make 0's background transparent
                if(i < grades.length-1){
                    labels.push('<i style="background:' + (i === 0 ? 'none' : grades_colors[i]) + '"></i> ' + grades[i]);
                }
            }
            else{
                // Display all legends
                labels.push('<i style="background:' + grades_colors[i] + '"></i> ' + grades[i]);
            }
		}

		div.innerHTML = labels.join('<br>');
		return div;
    };

    return legend;
};   



/**
 * Prints a legend-like text caption for the selected layer
 * @param {JSON object containing layer information. Format: {label:"", description:""}} caption 
 */
var createCaption = function(caption){
    var holder = L.control({position: 'topleft'});
    holder.onAdd = function(map){
        var div = L.DomUtil.create('div', 'info-caption');
        div.innerHTML = '<h4>' + caption.label + '</h4>' + caption.description;
        div.addEventListener('click', function(e){
            console.log('i was clicked');
        });
        return div;
    }
    return holder;
}


/**
 * Initialize the loading of a map's layers
 * @param {Name of map to load: 'asia' or 'la'} maparea 
 */
var toggleMap = function(maparea){
    console.log(maparea);

    if(maparea === 'asia'){
        if(mapSouthAmerica !== undefined){
            removeLayers(mapSouthAmerica.layers);
            loadMapAsia(basemap);
        }
    }
    else if(maparea === 'la'){
        if(mapAsia !== undefined){
            removeLayers(mapAsia.layers);
            loadMapSouthAmerica (basemap);
        }
    }
};