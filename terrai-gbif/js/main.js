/**
 * Main class for managing the leafletjs map on the terrai-gbif website
 * Dependencies: jquery, leafletjs, GeoServer, map.js
 * @ciatph 20180905
 */

 // Global constants
 const maparea = { ASIA:1, LATIN_AMERICA:2 }; 

 var labels_colors = {
    "Terra-i Base deforestation detection": "#fc8d59",
    "Prumnopitys Andina": "#00ff00",
    "Podocarpus Salignus": "#eeff00",
    "Pilgerodendron Uviferum": "#3182bd",
    "Picea asperata": "#00ff00",
    "Taiwania cryptomerioides": "#eeff00"  
};

// color list
var grades_colors = {
    0: "#eeff00",
    1: "#00ff00",
    2: "#1100ff"  
};

var Main = function(basemap){
    // leafletjs map's DOM element
    this.map;
    // default leafletjs basemap
    this.basemap = basemap;
    // leafletjs raster map layers for South America
    this.mapSouthAmerica;
    // leafletjs raster map layers for Asia     
    this.mapAsia;
    // leafletjs legends control object
    this.legend = {};
    // leafletjs distance scale control object
    this.scale;
    // leafletjs map layers toggle control object
    this.layerToggle;
    // leafletjs control: caption text for layer
    this.caption;    
    // JS object container for layer descriptions
    this.text;        
    // legends
    this.legends_list = {};
    // loading layers spinner
    this.spinner;
};



/**
 * Append text the layers' text descriptions on the main page
 * @param maparea: 'asia' or 'la'
 */ 
Main.prototype.createDescriptions = function(maparea){
    // remove all descriptions
    $('.description').children().remove();

    // header
    $('#page_header').text((maparea === 'la') ? 'South America' : 'Asia');

    // fill with new layer text descriptions
    for(var i in this.text[maparea]){
        var note = $('<div class="col-md-4">');
        var h1 = $('<h3>');
        h1.text(this.text[maparea][i].label);
        note.append(h1);

        var p = $('<p>');
        p.text(this.text[maparea][i].description);
        note.append(p);  
        $('.description').append(note);                  
    }  
};


/**
 * Load the layer descriptions json file
 */  
Main.prototype.loadDescriptions = function(file){
    var that = this;
    $.ajax({
        url: file, //'js/descriptions.json',
        success: function(j){
            that.text = j;
            console.log('loaded!');
            that.createDescriptions('la');
        }
    });
};


/**
 * Remove all current map layers and widgets 
 */
Main.prototype.removeLayers = function(submap){
    for(var i in submap){
        console.log(i)
        this.map.removeLayer(submap[i]);
    }

    this.layerToggle.removeLayer(this.basemap);
    this.map.removeControl(this.layerToggle);

    // remove all legends
    if(Object.keys(this.legend).length > 0){
        for(key in this.legend){
            this.map.removeControl(this.legend[key]);
        }
    }

    this.map.removeControl(this.scale);
};


/**
 * Display the controls and layers of a deactivated map
 */ 
Main.prototype.activateMap = function(submap){
    // add layer toggle
    this.layerToggle = L.control.layers({
            "South America Base Map": this.basemap
        }, submap.getOverlays()).addTo(this.map);

    // add scale
    this.scale = L.control.scale().addTo(this.map);
};    


/**
 * Initialize all maps' layer definitions
 */
Main.prototype.initializeMaps = function(basemap){
    // South America
    this.mapSouthAmerica = new Map();
    this.mapSouthAmerica.init([-26.11598592533351, -81.91406250000001], 4);        

    this.mapSouthAmerica.addLayer({
        name: 'latin_base', layers: 'terrai-gbif:latin_terra_I_resamp_fromedit',
        attribution: 'Terra-i resampled', styles: 'terrai-base', legend: 'true' 
    });

    this.mapSouthAmerica.addLayer({
        name: 'p_andina', layers: 'terrai-gbif:p_andina',
        attribution: 'Prumnopitys andina', styles: 'terrai-species'
    });    
    
    this.mapSouthAmerica.addLayer({
        name: 'p_salignus', layers: 'terrai-gbif:podocarpus_salignus',
        attribution: 'Podocarpus salignus', styles: 'terrai-species'
    });          

    this.mapSouthAmerica.addLayer({
        name: 'p_uviferum', layers: 'terrai-gbif:pilgerodendron_uviferum',
        attribution: 'Pilgerodendron uviferum', styles: 'terrai-species'
    });           
    
    this.mapSouthAmerica.addLayer({
        name: 'p_andina_add', layers: 'terrai-gbif:p_andina_add',
        attribution: 'Prumnopitys andina add', styles: 'terrai-add'
    });     
    
    this.mapSouthAmerica.addLayer({
        name: 'p_salignus_add', layers: 'terrai-gbif:p_salignus_add',
        attribution: 'Podocarpus salignus add', styles: 'terrai-add'
    });     
    
    this.mapSouthAmerica.addLayer({
        name: 'p_uviferum_add', layers: 'terrai-gbif:p_uviferum_add',
        attribution: 'Pilgerodendron uviferum add', styles: 'terrai-add'
    });    

    // Asia
    this.mapAsia = new Map();
    this.mapAsia.init([113.15917968750001, 19.765977203034804], 4);        

    this.mapAsia.addLayer({
        name: 'latin_base', layers: 'terrai-gbif:asia_Terra-I_resampled_fromedit',
        attribution: 'Terra-i resampled', styles: 'terrai-base' 
    });

    this.mapAsia.addLayer({
        name: 'picea_asperata', layers: 'terrai-gbif:picea_asperata',
        attribution: 'Picea asperata', styles: 'terrai-species'
    });      

    this.mapAsia.addLayer({
        name: 'taiwania_cryptomerioides', layers: 'terrai-gbif:taiwania_cryptomerioides',
        attribution: 'Taiwania cryptomerioides', styles: 'terrai-species'
    });               

    this.mapAsia.addLayer({
        name: 'picea_add', layers: 'terrai-gbif:picea_add',
        attribution: 'Picea asperata add', styles: 'terrai-add'
    });                             
    
    this.mapAsia.addLayer({
        name: 'taiwania_add', layers: 'terrai-gbif:taiwania_add',
        attribution: 'Taiwania cryptomerioides add', styles: 'terrai-add'
    });      
};



/**
 * Initialize the main map object. 
 * Initialize the south america layers
 */ 
Main.prototype.initMain = function(){
    var that = this;
    // main map
    this.map = L.map('mapid', {
        center: this.mapSouthAmerica.center,
        zoom: this.mapSouthAmerica.zoom,
        layers: [this.basemap]
    });    

    // add layer toggle
    this.layerToggle = L.control.layers({
            "South America Base Map": this.basemap
        }, this.mapSouthAmerica.getOverlays()).addTo(this.map);

    // add scale
    this.scale = L.control.scale().addTo(this.map);

    // add layer caption
    this.map.on('layeradd', function(e){
        console.log('added layer ' + e.layer.getAttribution());

        if(that.caption !== undefined)
        that.map.removeControl(that.caption);

        // create legend for layer
        that.legend[e.layer.getAttribution()] = that.createLegend(e.layer.getAttribution(),
                (Object.keys(that.legend).length >= 3) ? 'bottomright' : 'bottomleft').addTo(that.map);

        // display the layer's caption
        that.caption = that.createCaption(that.text['captions'][e.layer.getAttribution()]).addTo(that.map);

        // display the layer loading spinner
        that.spinner.show();
    });

    // remove layer caption
    this.map.on('layerremove', function(e){
        if(that.caption !== undefined)
            that.map.removeControl(that.caption);
            
        if(Object.keys(that.legend).length > 0){
            that.map.removeControl(that.legend[e.layer.getAttribution()]);
            delete that.legend[e.layer.getAttribution()];
        }
    });

    // display coordinates on mousehover
    this.map.on('mousemove', function(e){
        $('.ctrl_coordinates').html(JSON.stringify(e.latlng.lat) + ", " + JSON.stringify(e.latlng.lng));   
    });
};


/**
 * Load the Asia map layers and controls
 */ 
Main.prototype.loadMapAsia = function(){          
    // main map
    // add layer toggle
    this.layerToggle = L.control.layers({
            "Asia Base Map": this.basemap
        }, this.mapAsia.getOverlays()).addTo(this.map);

    // add scale
    this.scale = L.control.scale().addTo(this.map);

    this.map.setZoom(4);
    this.map.panTo({lon:this.mapAsia.center[0], lat:this.mapAsia.center[1]});
    this.createDescriptions('asia');
};


/*
 * Re-load the South America layers
 */ 
Main.prototype.loadMapSouthAmerica = function(){        
    // main map
    // add layer toggle
    this.layerToggle = L.control.layers({
            "South America Base Map": this.basemap
        }, this.mapSouthAmerica.getOverlays()).addTo(this.map);

    // add scale
    this.scale = L.control.scale().addTo(this.map);

    this.map.panTo({lon:this.mapSouthAmerica.center[1], lat:this.mapSouthAmerica.center[0]});
    this.createDescriptions('la');
};



/**
 * Create a legend for LA
 * @param {Legend title to print} cats
 * @param {leafletjs DOM positioning} position   
 */
Main.prototype.createLegend = function(cats, position){
    var pos = (position !== undefined) ? position : 'bottomleft';
    var legend = L.control({position: pos});

    legend.onAdd = function () {
		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 1, 2],
            labels = ['<span id="legend_title"><b>' + cats + '</b></span>'];

		for (var i = 0; i < grades.length; i++) {
            if((cats.indexOf("add") === -1)){
                // Display legends for 0 and 1 only. Make 0's background transparent
                if(i < grades.length-1){
                    labels.push('<i style="background:' + (i === 0 ? 'none' : 
                        (cats.indexOf("resampled") >= 0) ? '#fc8d59' : grades_colors[i]) + '"></i> ' + grades[i]);
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
Main.prototype.createCaption = function(caption){
    var holder = L.control({position: 'topleft'});
    holder.onAdd = function(){
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
Main.prototype.toggleMap = function(maparea){
    console.log(maparea);

    if(maparea === 'asia'){
        if(Main.mapSouthAmerica !== undefined){
            this.removeLayers(this.mapSouthAmerica.layers);
            this.loadMapAsia(this.basemap);
            $("#map_sa").removeClass("active");
            $("#map_asia").addClass("active");
        }
    }
    else if(maparea === 'la'){
        if(Main.mapAsia !== undefined){
            this.removeLayers(this.mapAsia.layers);
            this.loadMapSouthAmerica (this.basemap);
            $("#map_sa").addClass("active");
            $("#map_asia").removeClass("active");            
        }
    }
};



/**
 * Main program start
 */
window.onload = function(){
    // set window fullscreen height
    var mapDom = document.getElementById('mapid');
    mapDom.style.height = (window.innerHeight - 75) + 'px';
    //mapDom.style.height = window.innerHeight/1.3 + 'px';

    // Initialize the main maps controller using the OpenStreetMap basemap as default layer
    window.Main = new Main(L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }));

    Main.initializeMaps();
    Main.initMain();
    Main.loadDescriptions('js/descriptions.json');

    $(".ctrl_coordinates").html(Main.mapSouthAmerica.center[0] + ', ' + Main.mapSouthAmerica.center[1]);

    var legend = L.control({position: 'bottomright'});

    // print coordinates
    legend.onAdd = function () {
		var div = L.DomUtil.create('div', 'info legend ctrl_coordinates');
		div.innerHTML = Main.mapSouthAmerica.center[0] + ', ' + Main.mapSouthAmerica.center[1];
		return div;
    };
    legend.addTo(Main.map);

    // Initialize the loading indicator space
     Main.spinner = $('#mapid').loadingIndicator().data("loadingIndicator");
     Main.spinner.hide();
};