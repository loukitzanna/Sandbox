define(function (require) {
    'use strict';

    var $ = require("jquery");

    var Store = require("Stores/store");

    var _servers = null;
    var _isFetching = false;
    var isPolling = false;
//
// CRUD Operations
//
    var poll = function(instance){
        setTimeout(function(){

               fetchServer();
                poll();
        }, 5000);
    };


    var fetchServer = function () {
        if (!_isFetching) {
            _isFetching = true;
            // var servers = new ServerCollection();

            // "http://nemo3.iplantc.org:8080/state"
            // "http://private-55f4-serverstatus.apiary-mock.com/servers"

            $.ajax({
                url: "http://private-55f4-serverstatus.apiary-mock.com/servers",
                dataType: 'json',
                type: 'GET',
                success: function (data) {

                    _isFetching = false;
                    _servers = data;

                    if(!isPolling){
                        poll();
                        isPolling = true;
                    }

                    ServerStore.emitChange();

                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

        }
    };

//
// Store
//

    var ServerStore = {

        getAll: function () {
            if (!_servers) {
                fetchServer();
            } else {
                return _servers;
            }
        }

    };

    _.extend(ServerStore, Store);
    return ServerStore;
});


