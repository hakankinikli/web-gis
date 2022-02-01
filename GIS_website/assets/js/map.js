var bing_key= 'Ap1WdYutYsMORVrdil_1A286O6jZNCSgDjF0DSCmoMWfGpm_scsrPNKod_aNkzzy'
var url_local='http://localhost:8080/geoserver/A.Mukhtar/wms'
var url_local_wfs='http://localhost:8080/geoserver'
var workspace_local ="A.Mukhtar"

/* adding the layer as variable, then adding the name of the variable inside the layer in ol.map*/


//Base Maps
var bingAerial = new ol.layer.Tile({
    title: 'Bing Maps—Aerial',
    type: 'base',
    visible: true,
    source: new ol.source.BingMaps({
    key: bing_key,
    imagerySet: 'Aerial'
    })
});
var bingAerialLabels = new ol.layer.Tile({
        title: 'Bing Maps—Aerial Labels',
        type: 'base',
        visible: false,
        source: new ol.source.BingMaps({
        key: bing_key,
        imagerySet: 'AerialWithLabels'
        })
});
var osm= new ol.layer.Tile({
    title:'Open Steet Map',
    type: 'base',
    visibility: false,
    source: new ol.source.OSM()
});
var bingRoads = new ol.layer.Tile({
    title: 'Bing Maps—Roads',
    type: 'base',
    visible: false,
    source: new ol.source.BingMaps({
    key: bing_key,
    imagerySet: 'Road'
    })
});

//WMS
//ol Maps

var LandslideSusceptibilityMap = new ol.layer.Image({
    title:'Landslide Susceptibility Map',
    visibility: true,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'LandslideSusceptibilityMap'},
    })
}); 

var Group_Boundary = new ol.layer.Image({
    title:'Area of Interest',
    visibility: true,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Area of interest'},
       
       
    })
});

var Groups_watesheds = new ol.layer.Image({
    title:'Groups_watesheds',
    visibility: true,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Groups_watesheds'},
       
       
    })
}); 


//OL MAP
var map = new ol.Map({
	target: document.getElementById('hmap'),
	layers: [
		new ol.layer.Group({
			title: 'Base Maps',
			layers: [osm,bingRoads,bingAerialLabels,bingAerial]
		}),
		new ol.layer.Group({
        title: 'Overlay Layers',
        layers: [Groups_watesheds,LandslideSusceptibilityMap,Group_Boundary]
        })
	],
	view: new ol.View({
		center: ol.proj.fromLonLat([+10.131454,+46.095377]),
		zoom: 11.5,
	}),
	controls: ol.control.defaults().extend([
		new ol.control.ScaleLine(), 
		new ol.control.FullScreen(), 
		new ol.control.OverviewMap({layers: [osm]}), //small map version
		new ol.control.MousePosition({
			coordinateFormat: ol.coordinate.createStringXY(4),
			projection: 'EPSG:32632' //display position mouse inside the map
		})
	])
});

// Add LayerSwitcher
var layerSwitcher = new ol.control.LayerSwitcher ({});
map.addControl(layerSwitcher);

//OL LAYERS
// var groups = new ol.layer.Image({
// 	title: 'Groups',
// 	source: new ol.source.ImageWMS({
// 		url: 'ftp://gisgeoserver_09@www.gis-geoserver.polimi.it:2121/htdocs-SSL/groups_watesheds.gpkg',
// 		params: {'LAYERS': '' }
// 	})
// });

//get legend
// document.getElementById('get-legend').innerHTML =
// '<img src='+LandslideSusceptibilityMap.A.source.getLegendUrl()+'></img>'
