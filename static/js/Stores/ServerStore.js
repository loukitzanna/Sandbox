define(function (require) {
    'use strict';

    var $ = require("jquery");

    var Store = require("Stores/store");

    var _servers = null;
    var _isFetching = false;

//
// CRUD Operations
//

    var fetchServer = function () {
        if (!_isFetching) {
            _isFetching = true;
            // var servers = new ServerCollection();

            $.ajax({
                url: "http://private-55f4-serverstatus.apiary-mock.com/servers",
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    //servers.fetch().done(function () {
                    _isFetching = false;
                    _servers = data;
                    ServerStore.emitChange();
                    //}

                    // this.setState({data: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });

            /*servers.fetch().done(function () {
             _isFetching = false;
             _servers = servers;
             ServerStore.emitChange();
             });*/
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


