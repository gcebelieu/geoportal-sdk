import {OlMap} from "../../../src/OpenLayers/OlMap.js";
import {apiKey} from "../../config.js";

import {assert, expect, should} from "chai";


var map = null;
var div = null;
var message = "Event 'layerChanged' did not fire in 1500 ms.";

function initContext() {
    div = document.createElement("div");
    div.style.visibility = 'hidden';
    document.body.appendChild(div);

    map = new OlMap({
        div: div,
        mapOptions:{
            apiKey: apiKey
        }
    });
}

function cleanContext() {
    // pour permettre le chargement asynchrone de la configuration
    if (window.Gp && window.Gp.Config) window.Gp.Config = null;

    map = null;
    if (div) {
        document.body.removeChild(div);
        div = null;
    }
}

    // tests à realiser sur :
    // - les options communes
    // - les options specifiques : ex. filtres & themes
    // - les styles : ex. mapbox-*
    // - les objets internes openlayers : ex. id, source, type, ...
    // - le fichier metadata.json
    // - les multi-sources
    // - les multi-urls
    // - ...

    // liste des options du CCTP :
    // format, 
    // urlservice, 
    // outputformat, ???
    // projection, ???
    // queryable,
    // name, defaultthemedescription , url, quicklookurl(=> thumbnail),
    // themes : [name, defaultthemedescription (=> description), url, quicklookurl(=> thumbnail)]
    // filters : [propertyname, filtername, configuration]

describe("-- Test vector tile with mapbox format json --", function() {

    beforeEach(() => {
        initContext();
    });

    afterEach(() => {
        cleanContext();
    });
    
    it("Add a vector tile layer with options by default", (done) => {

        var eventFired = false;
        setTimeout(function () {
            if (!eventFired) {
                assert(eventFired, message);
                done(message);
            }
        }, 1500); //timeout with an error in one second

        map.listen("layerChanged", function callback() {
            // event fired !
            eventFired = true;
            assert.ok(eventFired);

            var layerOptions = this.getLayersOptions(["mapbox"]);
            expect(layerOptions).to.be.an("Object");
            expect(layerOptions).to.have.property("mapbox");
            // propriétés ajoutées par defaut
            expect(layerOptions.mapbox).have.property("opacity");
            expect(layerOptions.mapbox).have.property("visibility");
            // propriétés metadonnées communes par défaut
            expect(layerOptions.mapbox).have.property("title");
            expect(layerOptions.mapbox).have.property("description");
            expect(layerOptions.mapbox).have.property("quicklookUrl");
            expect(layerOptions.mapbox).have.property("metadata");
            expect(layerOptions.mapbox).have.property("legends");
            expect(layerOptions.mapbox).have.property("originators");
            expect(layerOptions.mapbox).have.property("position");
            // propriétés metadonnées spécifiques par défaut
            expect(layerOptions.mapbox).have.property("queryable");
            expect(layerOptions.mapbox).have.property("filters");
            expect(layerOptions.mapbox).have.property("themes");
            // titre / description par defaut :
            expect(layerOptions.mapbox.title).to.equal("Couche MapBox");
            expect(layerOptions.mapbox.description).to.equal("Couche MapBox");
            
            this.forget( "layerChanged", callback);
            done();
        });
        
        map.addLayers({
            "mapbox" : {
                format: "MapBox",
                url : "test/spec/mapbox/fixtures/mapbox.json",
                // opacity : 1,
                // visibility : true,
                // title : "",
                // description : "",
                // quicklookUrl : "",
                // metadata : [],
                // legends : [],
                // originators: []
            }
        });
        
    });

    it("Add a vector tile layer with all options", (done) => {

        // var eventFired = false;
        // setTimeout(function () {
        //     //if (!eventFired) {
        //         assert(eventFired, message);
        //         done(message);
        //     //}
        // }, 2000); //timeout with an error in one second

        map.listen("layerChanged", function callback() {
            // event fired !
            // eventFired = true;
            assert.ok(true);

            var layerOptions = this.getLayersOptions(["mapbox"]);
            expect(layerOptions).to.be.an("Object");
            expect(layerOptions).to.have.property("mapbox");
            // propriétés ajoutées par defaut
            expect(layerOptions.mapbox).have.property("opacity");
            expect(layerOptions.mapbox).have.property("visibility");
            expect(layerOptions.mapbox).have.property("position");
            // propriétés metadonnées communes par défaut
            expect(layerOptions.mapbox).have.property("title");
            expect(layerOptions.mapbox).have.property("description");
            expect(layerOptions.mapbox).have.property("quicklookUrl");
            expect(layerOptions.mapbox).have.property("metadata");
            expect(layerOptions.mapbox).have.property("legends");
            expect(layerOptions.mapbox).have.property("originators");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("position");
            // propriétés metadonnées spécifiques par défaut
            expect(layerOptions.mapbox, "not yet implemented !").have.property("urlService");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("outputFormat");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("projection");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("name");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("thumbnail");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("defaultThemeDescription");
            expect(layerOptions.mapbox, "not yet implemented !").have.property("queryable");
            // propriétés d'un theme
            expect(layerOptions.mapbox).have.property("themesSummary");
            expect(layerOptions.mapbox).have.property("themes");
            expect(layerOptions.mapbox.themes, "not yet implemented !").to.deep.include({
                thumbnail : "", 
                name : "", 
                description : "", 
                url : ""
            });
            // propriétés d'un filtre
            expect(layerOptions.mapbox).have.property("filtersSummary");
            expect(layerOptions.mapbox).have.property("filters");
            expect(layerOptions.mapbox.filters, "not yet implemented !").to.deep.include({
                propertyName : "", 
                filterName : "", 
                configuration : ""
            });
            // titre / description par defaut :
            expect(layerOptions.mapbox.title).to.equal("Couche MapBox");
            expect(layerOptions.mapbox.description).to.equal("Couche MapBox");
            
            this.forget( "layerChanged", callback);
            done();
        });

        map.addLayers({
            "mapbox" : {
                format: "MapBox",
                urlService : "",
                projection : "", // ???
                outputFormat : "", // ???
                thumbnail : "",
                name : "", 
                defaultThemeDescription : "", 
                url : "test/spec/mapbox/fixtures/mapbox.json",
                queryable : true,
                themesSummary : "",
                themes : [
                    {
                        thumbnail : "", 
                        name : "", 
                        description : "", 
                        url : ""
                    }
                ],
                filtersSummary : "",
                filters : [
                    {
                        propertyName : "", 
                        filterName : "", 
                        configuration : ""
                    }
                ],
                opacity : 1,
                visibility : true,
                position : 0,
                title : "",
                description : "",
                quicklookurl : "",
                metadata : [],
                legends : [],
                originators: []
            }
        });
        
    });
});