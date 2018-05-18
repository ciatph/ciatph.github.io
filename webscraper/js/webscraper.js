/**
 * WebScraper
 * An object to manage web scraping species names from a particular url
 * http://www.iucnredlist.org/search
 * ciatph, 20180518
 */

// global variables
var USER_MAX_PAGE_COUNT = 1;
var MAX_PAGE_COUNT = 35;
var COUNT_SPECIES_PER_PAGE = 50;

var WebScraper = function(url){
	this.settings = {
		// maximum number of species names
		maxSpeciesCount: USER_MAX_PAGE_COUNT * COUNT_SPECIES_PER_PAGE,

		// user-defined maximum page index to be scraped, (max MAX_PAGE_COUNT)
		maxPage: USER_MAX_PAGE_COUNT,

		// user-defined starting page index to read
		minPage: 1,

		// query parameter for the iucnredlist API
		pageQuery: "?page=",

		// default API url
		baseUrl: "https://www.iucnredlist.org/search"
	};

	this.url = (url != null) ? url : this.settings.baseUrl;

	// contains all species list from multiple pages
	this.speciesList = [];

	// contains a species list from a single page only
	this.speciesListSingle = [];

	// flag if multi-page processing is in session
	this.isLoading = false;	

	// current page being processed
	this.currentPage = 0;

	// the web scraping process has been forcefully stopped
	this.stopped = false;

	// total number of loaded pages
	this.countLoaded = 0;
};


/**
 * Load species names data from a single url
 * @param url: http://www.iucnredlist.org/search to load data from
 * Stores data in speciesListSingle[]
 */
WebScraper.prototype.loadUrl = function(url){
	var self = this;

	if(!this.isLoading){
		this.isLoading = true;

		$.ajax({
			url: url,
			dataType: "text",
			type: "POST",
			success: function(j){
				self.isLoading = false;
				
				// Remove all uneccessary elements (script, css, img)
				response = WebScraper.prototype.stripScripts(j);

				// Find the DOM container that contains the species name
				var elem = $('<div>').html(response)[0].getElementsByTagName('ul');
				var list = $(elem.results).find('span');

				// Keep the read species name in an array
				for(var i=0; i<list.length; i++){
						self.speciesListSingle.push(list[i].innerText);
				}						
			},
			error: function(e){
				console.log("An error occured: " + e);
			}
		});
	}
	else{
		console.log("CANNOT LOAD, CURRENTLY PROCESSING...");
	}
};



/**
 * Load all species data from all pages
 * @param callback: callback functions for outside actions
 * Stores data in speciesList[]
 */ 
WebScraper.prototype.loadSpecies = function(callback){
	callback = (callback != null && callback != undefined) ? callback : function(arg){}
	callback([true]);

	var self = this;

	if(this.canLoadSpecies()){
		// Update the url with new page
		this.url = this.settings.baseUrl + 
			((this.currentPage == 0) ? "" : this.settings.pageQuery + (this.currentPage + 1));

		console.log("--loading " + this.url);	

		setLabelLoading(this.currentPage + 1);
		this.isLoading = true;

		$.ajax({
			url: self.url,
			dataType: "text",
			type: "POST",
			success: function(j){
				self.isLoading = false;
				self.countLoaded++;
				console.log("loaded! " + self.countLoaded);

				// Remove all uneccessary elements (script, css, img)
				response = WebScraper.prototype.stripScripts(j);

				// Find the DOM container that contains the species name
				var elem = $('<div>').html(response)[0].getElementsByTagName('ul');
				var list = $(elem.results).find('span');

				// Keep the read species name in an array
				for(var i=0; i<list.length; i++){
					if(self.speciesList.length < self.settings.maxSpeciesCount)
						self.speciesList.push(list[i].innerText);
				}				

				// Call the function recursively
				self.currentPage++;	
				if(self.currentPage < self.settings.maxPage){
					self.loadSpecies(callback);	
				}		
				else{
					console.log("LOADED ALL SPECIES NAMES!");
					self.isLoading = false;
					callback([false]);
				}			
			},
			error: function(e){
				console.log("An error occured: " + e);
				callback([false]);
			}
		});		
	}
	else{
		callback([false]);	
		console.log("CANNOT LOAD...\ncurrentPage: " + 
			this.currentPage + "\nisLoading: " + this.isLoading);

		if(this.speciesList.length >= this.settings.maxSpeciesCount)
			console.log("CANNOT LOAD...\nMAX species count in array.")
	}
};



/**
 * Strip, remove all script, css and img DOM elements from the html response
 */
WebScraper.prototype.stripScripts = function(data, type){
  type = type || 'text';
  if(type=='html'||type=='text'){
    data = data.replace(/<script.*?>([\w\W\d\D\s\S\0\n\f\r\t\v\b\B]*?)<\/script>/gi, '');
    data = data.replace(/<img.*?>([\w\W\d\D\s\S\0\n\f\r\t\v\b\B]*?)/gi, '');
    data = data.replace(/<link.*?>([\w\W\d\D\s\S\0\n\f\r\t\v\b\B]*?)/gi, '');
  }

  return data;
};



/**
 * Returns true|false if ALL species names from a page range can be loaded
 */
WebScraper.prototype.canLoadSpecies = function(){
	return this.currentPage < this.settings.maxPage && !this.isLoading &&
		this.speciesList.length < this.settings.maxSpeciesCount && !this.stopped;
}


/**
 * Reset all settings
 * Clear species list array containers
 */
WebScraper.prototype.reset = function(){
	this.speciesList = [];
	this.speciesListSingle = [];	
	this.url = this.settings.baseUrl;
	this.currentPage = 0;
	this.isLoading = false;
	this.stopped = false;
	this.settings.minPage = 1;
	this.settings.maxPage = MAX_PAGE_COUNT;
	this.countLoaded = 0;
};



/**
 * Forcibly stop the scraping process
 */
WebScraper.prototype.stop = function(callback){
	this.stopped = true;
};



/**
 * Set the max page limit/index
 * See http://www.iucnredlist.org/search for the max page
 */
WebScraper.prototype.setMaxPage = function(max){
	if(!parseInt(max)){
		alert("Not a valid number");
		return false;
	}

	if(max > MAX_PAGE_COUNT){
		alert("Cannot set max page more than " + MAX_PAGE_COUNT);
		console.log("Cannot set max page more than " + MAX_PAGE_COUNT);
		return false;
	}	
	else{
		this.settings.maxPage = parseInt(max);
		this.settings.maxSpeciesCount = COUNT_SPECIES_PER_PAGE * max;
		return true;
	}
};


/**
 * Set the minimum page index/start
 * See http://www.iucnredlist.org/search for the max page
 */
WebScraper.prototype.setMinPage = function(min){
	if(!parseInt(min)){
		alert("Not a valid number");
		return false;
	}

	if(min > MAX_PAGE_COUNT || min <= 0){
		alert("Cannot set minimum page to " + min);
		console.log("Cannot set minimum page to " + min);
		return false;
	}	
	else{
		this.settings.minPage = parseInt(min) - 1;
		this.currentPage = parseInt(min) - 1;
		return true;
	}
};


/*
 * Set the current page to be processed
 */
WebScraper.prototype.setCurrentPage = function(x){
	this.currentPage = x;
};


/**
 * Download a comma-delimited text file of scraped species names
 */
WebScraper.prototype.downloadFile = function(isSingle){
	//var textToSave = this.speciesList.toString().replace(/,/g, "/r/n");
	//textToSave = encodeURIComponent(textToSave);
	//var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain;charset=utf-8"});

	var speciesData = this.speciesList.toString() + "\n";
	if(isSingle != null && isSingle != undefined){
		speciesData = this.speciesListSingle.toString() + "\n";
	}

	var speciesDataBlob = new Blob([speciesData], {type:"text/plain;charset=utf-8"});
	var saveAsURL = window.URL.createObjectURL(speciesDataBlob);
	var filename = "species-names.txt";

	var downloadElem = document.createElement("a");
	downloadElem.download = filename;
	downloadElem.innerHTML = "Download File";
	downloadElem.href = saveAsURL;
	downloadElem.style.display = "none";
	document.body.appendChild(downloadElem);
	downloadElem.click();	
};