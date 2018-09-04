// legends
var legends_list = {};
const maparea = { ASIA:1, LATIN_AMERICA:2 };

// color list

var labels_colors = {
    "Terra-i Base deforestation detection": "#fc8d59",
    "Prumnopitys Andina": "#00ff00",
    "Pilgerodendron Uviferum": "#3182bd",
    "Podocarpus Salignus": "#2ca25f",
    "Picea asperata": "#00ff00",
    "Taiwania cryptomerioides": "#3182bd"  
};


/**
 * Create a legend for LA
 * @param {Legend titles to print} cats 
 */
var createLegend = function(cats){
    var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info-legend');
        labels = ['<strong>Categories</strong>'],
        //categories = ['Terra-i Base deforestation detection', 'Prumnopitys Andina', 'Pilgerodendron Uviferum', 'Podocarpus Salignus'];
        categories = cats;

        for (var i = 0; i < categories.length; i++) {
            div.innerHTML += 
                labels.push(
                    '<span class="circle" style="background: ' + labels_colors[categories[i]] + '"> &nbsp; &nbsp; &nbsp;</span> ' +
                    (categories[i] ? categories[i] : '+'));
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


var toggleMap = function(maparea){
    console.log(maparea);

    if(maparea === 'asia'){
        removeLayers(mapLatin.layers);
        loadMapAsia(basemap);
    }
    else if(maparea === 'la'){
        removeLayers(mapAsia.layers);
        loadMapLatin(basemap);
    }
};