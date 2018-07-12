var d;

var DataTest = function(lonid, latid, rowid, colid, cellid, btnid){
    this.lon;
    this.lat;
    this.row;
    this.col;
    this.cell;
    this.btn;

    this.init(lonid, latid, rowid, colid, cellid, btnid);
};


DataTest.prototype.init = function(lonid, latid, rowid, col, cellid, btnid){
    this.lon = document.getElementById(lonid);
    this.lat = document.getElementById(latid);
    this.row = document.getElementById(rowid);
    this.col = document.getElementById(col);    
    this.cell = document.getElementById(cellid);
    this.btn = document.getElementById(btnid);

    this.btn.addEventListener('click', this.submit.bind(this));
};


DataTest.prototype.submit = function(){
    this.getCellId();
};


DataTest.prototype.getCellId = function(coords){
    var gps = {lon:this.lon.value, lat:this.lat.value};

    if(coords != undefined){
        gps = {lon:coords.lon, lat:coords.lat};
    }
    
    var row = 1 + Math.floor((90 - parseFloat(gps.lat)) / 0.25);
    var col = 1 + Math.floor((parseFloat(gps.lon) + 180) / 0.25);
    var cell = (row - 1) * 1440 + col;

    console.log('row: ' + row + '\ncol: ' + col);
    this.cell.value = cell;
    this.row.value = row;
    this.col.value = col;
    return cell;
};


$(document).ready(function(){
    /*
    $.ajax({
        url: 'data/extracted.json',
        dataType: 'json',
        success: function(j){
            d = j;
            console.log('loaded data!');
        }
    });
    */
    window.DataTest = new DataTest('lon','lat','row','col','cellid','submit');
});