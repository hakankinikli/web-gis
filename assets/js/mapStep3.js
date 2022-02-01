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
var Group_Boundary = new ol.layer.Image({
    title:'Area of Interest',
    visibility: true,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Area of interest'},
       })
});

var LandslideSusceptibilityMap_reclass = new ol.layer.Image({
    title:'Reclassified susceptibility map',
    visibility: true,
    visible: false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'LandslideSusceptibilityMap_reclass'},
    })
});

var Rb = new ol.layer.Image({
    title:'Resampled_susceptibilityMap of buildings',
    visibility: true,
    visible: false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Resampled_susceptibilityMap of buildings'},
    })
});

var Rp = new ol.layer.Image({
    title:'Resampled_susceptibilityMap of population ',
    visibility: true,
    visible: false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Resampled_susceptibilityMap of population'},
    })
});

var population = new ol.layer.Image({
    title:'Population ',
    visibility: true,
    visible: false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'population'},
    })
});

var building = new ol.layer.Image({
    title:'Buildings ',
    visibility: true,
    visible: false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Buildings'},
    })
});

var map= new ol.Map({
    target:document.getElementById('map'),
   
    //Grouping the layers into two collections using array
    layers: [
        new ol.layer.Group({
         title: 'Base Maps',
         layers: [osm,bingRoads,bingAerialLabels,bingAerial]
    }),
         
        new ol.layer.Group({
        title: 'Overlay Layers',
        layers: [Rb,building,Rp,population,LandslideSusceptibilityMap_reclass,Group_Boundary]
    })
    ],
    
    view: new ol.View({
        center: ol.proj.fromLonLat([10.135703,46.109844]),
        zoom: 12,
    }),
    controls: ol.control.defaults().extend([
        new ol.control.ScaleLine(),
        new ol.control.FullScreen(),
        new ol.control.OverviewMap({layers: [osm]}),
        new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:32632'
        })

    ])
});

//Adding the Layer Switcher
var layerSwitcher = new ol.control.LayerSwitcher({});
map.addControl(layerSwitcher);

//get legend for the population
document.getElementById('get-legend1').innerHTML =
'<img src='+population.A.source.getLegendUrl()+'></img>'

//get legend for the Building
document.getElementById('get-legend2').innerHTML =
'<img src='+building.A.source.getLegendUrl()+'></img>'



