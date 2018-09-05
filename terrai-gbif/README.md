# terrai-gbif


A data visualization tool developed for the [2018 Ebbe Nielsen Challenge](https://www.gbif.org/news/1GQURfK5jS4Iq4O06Y0EK4/2018-gbif-ebbe-nielsen-challenge-seeks-open-data-innovations-for-biodiversity) that overlays generated GBIF species data over [Terra-i's](http://terra-i.org/terra-i.html) deforestation information for closer look-up and information.

Figshare [link](https://figshare.com/s/0b556b9d4c4a5d6f0e9c)

## Introduction

*Here we present a methodology and a prototype tool powered by machine learning algorithms that allows for near real time threat (and loss) monitoring of vulnerable plant species, using open data (ground-truthed and remotely sensed). Improvements in machine learning algorithms and access to high quality remotely sensed data (top down) has enabled “remote” monitoring of the earth’s status. The applicability of insights obtained can be further improved by incorporating ground truthed (bottom up) data. The proposed tool leverages upon the ease at which one can access GBIF’s high quality spatialized data in a standardized format at scale, further augments this with remote sensing data and machine learning algorithms in order to monitor threat status of plant species. This tool mashes multiple datasets, merges geospatial layers, to generate new insights, and provides a new use case of open data, further supporting the call for FAIR (Findable, Accessible, Interoperable and Reusable) data. Biodiversity monitoring is central to Sustainable Development Agenda, we propose to use this case-study as an example to promote spatialization and FAIR access of national biodiversity records currently held by various government agencies.*
> 
> \- d.burra@cgiar.org & CIAT team


## Website Installation/Usage

### Prerequisites

1. Raster (GeoTiff) files of species and deforestation generated from the modeling process and Terra-i's.
2. NodeJS
3. A stable internet connection (for fetching the generated rasters online).
	- The raster layers can be accessed on a GeoServer instance hosted on [http://terrai-gbif.azurewebsites.net/](http://terrai-gbif.azurewebsites.net/).
	- The WMS and list of available rasters can be accessed by web mapping frameworks through the a `GetCapabilities` request:
	  `http://terrai-gbif.azurewebsites.net/geoserver/wcs?SERVICE=WCS&REQUEST=GetCapabilities&VERSION=2.0.1`

#### Optional Prerequisites
1. A locally-installed or online [GeoServer](http://geoserver.org/) server on which to host and serve the rasters as a Web Map Service (WMS), if you will want to run the map service server itself in your local PC. For more information, see GeoServer's [installation](http://docs.geoserver.org/stable/en/user/installation/win_installer.html) documentation.
2. Apply the GeoServer styles from `sld-styles` to the generated rasters.
2. Change the following codes from `js/map.js`to enable reading rasters from the local GeoServer:
3. 
		const SETTINGS = {
		    // flag to use the online or local maps GeoServer
		    ONLINE: true  // CHANGE true TO false
		};


### Local Website Installation (Running the website from your PC)

1. Clone this repository into your desktop.
2. Navigate inside the cloned directory using the command line, then run `npm install`
3. Using the command line, run `http-server`
4. `Ctrl + Click` the link that will be generated.

<br>

**Date Created:** 20180905<br>
**Date Modified:** 20180905 