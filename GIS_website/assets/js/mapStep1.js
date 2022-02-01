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

// layers on local geoserver 
//The Required Geopackages deliverable
var Group_Boundary = new ol.layer.Image({
    title:'Area of Interest',
    visibility: true,
    visible:true,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'Area of interest'},
       
    })
}); 

var testingPointsSampled = new ol.layer.Image({
    title:'Sampled Testing Points',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'testingPointsSampled'},
       
    })
});

var trainingPointsSampled = new ol.layer.Image({
    title:'Sampled Training Points',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'trainingPointsSampled'},
       
    })
}); 

var NLZ = new ol.layer.Image({
    title:'No Landslide Zones',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'NLZ'},
       
    })
});

//The Environmental Factors (Raster)
var profile = new ol.layer.Image({
    title:'Profile curvature',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'profile'},
       
    })
}); 

var plan = new ol.layer.Image({
    title:'Plan curvature',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'plan'},
      
    })
}); 
var faults = new ol.layer.Image({
    title:'Geological faults',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'faults'},
      
    })
}); 
var roads = new ol.layer.Image({
    title:'Roads',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'roads'},
       
    })
}); 
var rivers = new ol.layer.Image({
    title:'Rivers',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'rivers'},
       
    })
}); 
var ndvi = new ol.layer.Image({
    title:'Normalized Difference Vegetation Index',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'ndvi'},
        
    })
}); 
var dusaf = new ol.layer.Image({
    title:'Land use & land cover',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'dusaf'},
       
    })
}); 
var dtm = new ol.layer.Image({
    title:'Digital Terrain Model ',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'dtm'},
       
    })
}); 
var slope = new ol.layer.Image({
    title:'Slope',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'slope'},
        
    })
}); 
var aspect = new ol.layer.Image({
    title:'Aspect',
    visibility: true,
    visible:false,
    source: new ol.source.ImageWMS({
        url:url_local,
        params:{'LAYERS':workspace_local+':'+'aspect'},
        
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
    title: 'Environmental Factors',
    layers: [slope,roads,rivers,profile,faults,dusaf,aspect,ndvi,dtm]
    }),

    new ol.layer.Group({
        title: 'Vector Layers',
        layers: [trainingPointsSampled,testingPointsSampled,NLZ,Group_Boundary]
    }),
    
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




