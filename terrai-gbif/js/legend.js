// legends
var legends_list = {};

// color list

var colors = {
    "base": "#fc8d59",
    "p_andina_add": "#00ff00",
    "p_salignus_add": "#2ca25f",
    "p_uvi_add": "#3182bd"
};

var labels_colors = {
    "Terra-i Base deforestation": "#fc8d59",
    "Prumnopitys Andina": "#00ff00",
    "Pilgerodendron Uviferum": "#3182bd",
    "Podocarpus Salignus": "#2ca25f"
};

var createLegend = function(legend_name, cats){
// base terrai
var legend = L.control({position: 'bottomleft'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info-legend');
        labels = ['<strong>Categories</strong>'],
        categories = ['Terra-i Base deforestation', 'Prumnopitys Andina', 'Pilgerodendron Uviferum', 'Podocarpus Salignus'];
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