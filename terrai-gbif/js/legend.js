// legends
var legends_list = {};
const maparea = { ASIA:1, LATIN_AMERICA:2 };

// color list

var colors = {
    "base": "#fc8d59",
    "p_andina_add": "#00ff00",
    "p_salignus_add": "#2ca25f",
    "p_uvi_add": "#3182bd"
};

var labels_colors = {
    "Terra-i Base deforestation detection": "#fc8d59",
    "Prumnopitys Andina": "#00ff00",
    "Pilgerodendron Uviferum": "#3182bd",
    "Podocarpus Salignus": "#2ca25f"
};


/**
 * Create a legend for LA
 * @param {Legend titles to print} cats 
 */
var createLegend = function(){
    var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info-legend');
        labels = ['<strong>Categories</strong>'],
        categories = ['Terra-i Base deforestation detection', 'Prumnopitys Andina', 'Pilgerodendron Uviferum', 'Podocarpus Salignus'];
        // categories = cats;

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
        return div;
    }
    return holder;
}


var toggleMap = function(maparea){
    console.log(maparea);

    if(maparea === 'asia'){
        
    }
    else if(maparea === 'la'){

    }
};