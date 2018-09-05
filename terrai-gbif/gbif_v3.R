
##################################################################################################
# extracting presence data from GBIF
library(rgbif)
library(readr)
library(dplyr)

splist <- c("Taiwania cryptomerioides")
keys <- lapply(as.list(splist), function(x) name_suggest(x, rank = "species"))%>%
  bind_rows()%>%
  filter(canonicalName %in% splist)%>%
  dplyr::select(key)%>%
  unlist(use.names = F)

occurence <- occ_search(taxonKey = keys, return = 'data', hasCoordinate = T, basisOfRecord=c("LIVING_SPECIMEN"))

long <- occurence$decimalLongitude
lat <- occurence$decimalLatitude

df <- data.frame(long,lat)
df

df <- df[c(1:4, 6:17),] 

# removing 0 values if present in the dataframe
##Go through each row and determine if a value is zero
row_sub = apply(df, 1, function(row) all(row !=0 ))
##Subset as usual
df <- df[row_sub,]


##################################################################################################################################

# map extracted points

library(maptools)
data("wrld_simpl")
plot(wrld_simpl, axes=TRUE,col="light yellow")
points(df$long, df$lat, col='red', cex=0.75)

##########################################################################################################################

# using lat long from df to get the extent
library(sp)
coordinates(df) <- ~long+lat
# crs(df) <- crs(wrld_simpl) # ovr <- over(df, wrld_simpl)
library(raster)
library(rgdal)
library(dismo)
library(rJava)
r <- raster(df)
res(r) <- 1
r <- extend(r, extent(r)+1)
extent(r)

# terra-I extent
library(raster)
asia <- raster("asia_decrease_current.tif")
extent(asia)
plot(asia)
############################################################################################################################

# obtaining bioclimatic data and stacking them 

library(dismo)
path <- "C:/Users/lreymondin/Documents/R/win-library/3.5/dismo/ex/" 
files <- list.files(path, pattern='grd$', full.names=TRUE)
bioclim.data <- getData(name = "worldclim",
                        var = "bio",
                        res = 2.5,
                        path = "C:/Users/lreymondin/Documents/R/win-library/3.5/dismo/ex/")
predictors <- stack(bioclim.data) # stacking all bioclim data
presvals <- extract(predictors, df) # extracting bioclim variables for presence points
# setting random seed to always create the same
# random set of points for this example
set.seed(0)
e <- extent(25.5 ,167,-12.3,40)# setting up the extent based on presence points # or for Terra-I rasters for each continent
bg2 <- randomPoints(predictors, 1000, ext=e)  # drawing random background points from extent
absvals <- extract(predictors, bg2) # extracting climatic data for random background points

# creating a dataframe of presence and absence points 
pb <- c(rep(1, nrow(presvals)), rep(0, nrow(absvals))) 
sdmdata <- data.frame(cbind(pb, rbind(presvals, absvals)))
write.table(sdmdata, "E:/Dharani/sdmdata.txt", sep="\t") # this is the dataframe used for modelling
tail(sdmdata)
########################################################################################################

# kfold of presence points - for testing and training
set.seed(0)
group <- kfold(df, 5)
pres_train <- df[group != 1, ] 
pres_test <- df[group == 1, ]
# kfolds are done on spatial points in the previous step
# converting those back to dataframe
pres_train <- as.data.frame(pres_train) 
pres_test <- as.data.frame(pres_test) 

head(pres_train)

# kfold of absence points - for testing and training
group <- kfold(bg2, 5)
backg_train <- bg2[group != 1, ]
backg_test <- bg2[group == 1, ]
backg_train <- as.data.frame(backg_train)
backg_test <- as.data.frame(backg_test) 
colnames(backg_train) <- c("long","lat")
colnames(backg_test) <- c("long","lat")

# plotting kfolds as spatial points 
r <- raster(predictors, 1)
plot(!is.na(r), col=c('white', 'light grey'), legend=FALSE)
plot(ext, add=TRUE, col='red', lwd=2) # extent(-124.2508,121.7492 ,24.37,60.37)
points(backg_train, pch='-', cex=0.5, col='yellow')
points(backg_test, pch='-',  cex=0.5, col='black')
points(pres_train, pch= '+', col='green')
points(pres_test, pch='+', col='blue')

# developing training dataset with bioclim values of presence and background points 
train <- rbind(pres_train, backg_train)
pb_train <- c(rep(1, nrow(pres_train)), rep(0, nrow(backg_train)))
envtrain <- extract(predictors, train)
envtrain <- data.frame(cbind(pa=pb_train, envtrain))
str(testpres)

# developing testing dataset with bioclim values of presence and backgrund points
testpres <- data.frame(extract(predictors, pres_test))
testbackg <- data.frame(extract(predictors, backg_test))

# building a radomforest model
library(randomForest)
model <- pa ~ .
rf1 <- randomForest(model, data=envtrain)
erf <- evaluate(testpres, testbackg, rf1)
erf
pr <- predict(predictors, rf1, ext=e)
###########################################################################################################################


# using the caret modelling approach 

library(caret)
split <- createDataPartition(y = sdmdata$pb, p = 0.60, list = FALSE)
dev <- sdmdata[split,]
val <- sdmdata[-split,]
xtabs(~ pb, data = val) # tabulating response variables

# subsetting validation data into presence and absence for evaluation
selected<-c("0")
abs <-  val[val$pb %in% selected,]
selected<-c("1")
pres <- val[val$pb %in% selected,]

# subsetting dev data into presence and absence for evaluation
selected<-c("0")
abs_train <- dev[dev$pb %in% selected,]
selected<-c("1")
pres_train <- dev[dev$pb %in% selected,]

ctrl <- trainControl(method = "repeatedcv", number = 10,repeats = 10, sampling = "up") # 10 repeats is 40% of data used for testing


# tuning rf #to get the best mtry
library(randomForest)
bestmtry <- tuneRF(dev[2:20], as.factor(dev$pb), improve=1e-5, ntree=1000)
print(bestmtry)
mtry <- 2 # input the best mtry

tunegrid_rf <- expand.grid(.mtry= mtry)
mod_rf <- train(as.factor(pb) ~., data=dev, method="rf", ntree=1000, trControl = ctrl, tuneGrid=tunegrid_rf)

# model evaluation and prediction 
erf <- evaluate(pres, abs, mod_rf)
erf


library(xgboost)

# tuning xgboost - https://www.hackerearth.com/practice/machine-learning/machine-learning-algorithms/beginners-tutorial-on-xgboost-parameter-tuning-r/tutorial/
xgb.grid <- expand.grid(nrounds = 1000,eta = c(0.01,0.3),max_depth = 5,gamma = 0, colsample_bytree =0.5, min_child_weight = 1, subsample = 0.8)
mod_xgb <- train(as.factor(pb) ~ ., data=dev, method="xgbTree", trControl = ctrl,tuneGrid=xgb.grid)


# model evaluation and prediction 
erf <- evaluate(pres, abs, mod_xgb)
erf


pr <- predict(predictors, mod_rf, ext = e)


################################################################################################

# plotting all points from model # excludes original presence points in the dataset
library(maptools)
par(mfrow=c(1,2))
plot(pr, main='Random Forest, regression')
plot(wrld_simpl, add=TRUE, border='dark grey')
tr <- threshold(erf, 'spec_sens')
plot(pr > tr, main='presence/absence')
plot(wrld_simpl, add=TRUE, border='dark grey')
points(occurence$decimalLongitude, pch='+')
points(occurence$decimalLatitude, pch='-', cex=0.25)


# plotting model with original observation points # includes original presence points in the datasen 
# http://rpubs.com/kerkhoffa/SDMMaxent
library(mapdata)
plot(pr)
map('worldHires',xlim=c(min(df$long)-10,max(df$long)+10), ylim=c(min(df$lat)-10,max(df$lat)+10), fill=FALSE, add=TRUE)
points(df$long, df$lat, pch="+", cex=0.6)


dev.off()
##################################################################################################################
# exporting raster files
# converting raster to shape files 
# converting shapefiles to GeoJson

library(rgdal)
library(raster)
writeRaster(pr, filename="Taiwania cryptomerioides.tif", format="GTiff")


# converting raster to shapefile
shp <- rasterToPolygons(pr, fun=NULL, n=4, na.rm=TRUE, digits=12, dissolve=FALSE)
plot(shp)


# reading the shape file for conversion to geoJSON 
library(rgdal)
county <- readOGR(dsn = "/User/kan/Data/cb_2015_us_county_500k" ,layer = "cb_2015_us_county_500k", verbose = FALSE)


# https://blog.exploratory.io/creating-geojson-out-of-shapefile-in-r-40bc0005857d
# converting shapefile to geoJson
library(geojsonio)

shp <- geojson_json(shp)

# simplifying geoJson # Visvalingam simplification
library(rmapshaper)
county_json_simplified <- ms_simplify(county_json)
# writing the goejson file 
geojson_write(county_json_clipped, file = "~/Downloads/county.geojson")


#################################################################################################
# raster manipulations
# plotting top species raster files with terra-I raster files 

#latin america
library(raster)
latin <- raster("latin_decrease_current.tif")
p_salignus <- raster("Podocarpus salignus.tif")
p_uviferum <- raster("Pilgerodendron uviferum.tif")
p_andina <- raster("Prumnopitys andina.tif")


#asia top species
asia <- raster("asia_decrease_current.tif")
t_crypto <- raster("Taiwania cryptomerioides.tif")
p_asperata <- raster("Picea asperata.tif")


# oceania top species
oceania <- raster("oceania_decrease_current.tif")
A_selaginoides <- raster("Athrotaxis selaginoides.tif")

# plotting top species with terra-I
library(maptools)
data("wrld_simpl")
par(mfrow=c(1,2))
plot(oceania,main='Oceania_Terra-I')
plot(wrld_simpl, add=TRUE, border='dark grey')
plot(A_selaginoides,main='Athrotaxis selaginoides')
plot(wrld_simpl, add=TRUE, border='dark grey')
plot(p_asperata,main='Picea asperata')
plot(wrld_simpl, add=TRUE, border='dark grey')

###############################################################################################


# manipulating terra-I rasters 
# converting raster values to binomial output
# any value equal to 0 remains 0
# any value greater than 0 becomes 1

library(raster)
values(latin)[values(latin) == 0] = 0  # any pixel equal to 0 remains 0
values(latin)[values(latin) > 0] = 1  # any pixel value more than 0 becomes 1

library(rgdal)
library(raster)
writeRaster(latin, filename="latin_edit.tif", format="GTiff") # these are terra-I rasters with binomial values

############################################################################################################

library(raster)

# loading all species rasters and binomial output rasters from terra-I 

latin_edit <- raster("latin_terra_I_resamp_fromedit.tif")
p_uviferum <- raster("Pilgerodendron uviferum.tif")
p_andina <- raster("Prumnopitys andina.tif")
p_salignus <- raster("Podocarpus salignus.tif")
p_uvi_add <- raster("p_uvi_add.tif")
p_salignus_add <- raster("p_salignus_add.tif")
p_andina_add <- raster("p_andina_add.tif")


asia <- raster("asia_decrease_current.tif")
t_crypto <- raster("Taiwania cryptomerioides.tif")
p_asperata <- raster("Picea asperata.tif")
p_add <- raster("picea_add.tif")
asia_edit <- raster("asia_edit.tif")
t_add <- raster("taiwania_add.tif")

# cropping binomial output of terra-I raster to raster size of species
e <- extent(t_crypto)  # extent of species raster
r <- crop(p_andina_add, e) # cropping terra-I binomial output raster to species raster 


# reprojecting all rasters (specifcally the terra-I cropped raster, added rasters) to the projection of the species rasters   
p_add_resamp <- projectRaster(p_add,p_uviferum,method = 'bilinear')
p_andina_add_resamp <- projectRaster(r,p_uviferum,method = 'bilinear')
rresampled <- projectRaster(r,p_asperata,method = 'bilinear')


# using QGIS to develop rasters of combined output of terra-I and each species - e.g. t_add is taiwania added to asia-terra-I raster (binomial output) 
# In the combined raster if the cell value has 0 - it means no species detected and no deforestation point
# if it is 1 - could be either species or deforestation point
# if it is 2 - deforestation point and species detected
# n the case of latin america - it can be 3 or 4 - which means either it is 3 species, or 2 species (any combination) + deforestation point 
# you can always toggle between layers to see what layers are causing the scores


# stacking all rasters - terra-I (cropped, reprojected, binomial), species and species added with terra-I
# stack produced each for asia and latin america
stack_latin  <- stack(latin_edit, p_uviferum, p_andina, p_salignus,p_uvi_add,p_salignus_add_resamp,p_andina_add_resamp)
stack_asia  <- stack(asia_terra_I,t_crypto,p_asperata,p_add,t_add)


# writing the rasterstack
writeRaster(stack_latin, filename="stack_latin", format="GTiff")

#################################################################################################
# interactive viewing of the rasterstack
# mapview
# https://environmentalinformatics-marburg.github.io/mapview/basics/basics.html

library(mapview)
mapview(stack_latin)


############################################################################################
# mapping of rasters
# leaflet

leaflet() %>%
  addTiles() %>%
  addPolygons(data = out) %>%
  addRasterImage(p_asperata, colors = "Set1", opacity = 1)


leaflet() %>%
  addTiles() %>%
  addRasterImage(p_asperata, colors = "Set1", opacity = 1) %>%
  addRasterImage(t_crypto, colors = "Set1", opacity = 1)
###################################################################################################


