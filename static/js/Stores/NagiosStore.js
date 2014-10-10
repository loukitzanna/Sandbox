define(function (require) {
    'use strict';

    var $ = require("jquery");

    var Store = require("Stores/store");

    var _servers = null;
    var _hostNames = null;
    var _isFetching = false;

   // var isPolling = false;
//
// CRUD Operations
//
    /*var poll = function(instance){
        setTimeout(function(){

            fetchServer();
            poll();
        }, 5000);
    };*/


    var fetchServer = function () {
        if (!_isFetching) {
            _isFetching = true;
            // "http://nemo3.iplantc.org:8080/state"
            // "http://private-55f4-serverstatus.apiary-mock.com/servers"

            $.ajax({
                url: "http://nemo3.iplantc.org:8080/state",
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    _isFetching = false;

                    //only need everything in the content object


                    _servers = data.content;
                    _hostNames = Object.keys(_servers);
                    _hostNames.sort(function (a, b) {
                        return a.toLowerCase().localeCompare(b.toLowerCase());
                    });

                    //console.log(_servers);
                    /*if(!isPolling){
                        poll();
                        isPolling = true;
                    }*/

                    NagiosStore.emitChange();
                    //}

                    // this.setState({data: data});
                }.bind(this)
                ,
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

        }
    };

//
// Store
//

    var NagiosStore = {

        getAll: function () {
            if (!_servers) {
                fetchServer();
            } else {
                return  _servers;
            }
        },

        getNames: function(){
            return _hostNames;
        }

    };

    _.extend(NagiosStore, Store);
    return NagiosStore;
});


