/** @jsx React.DOM */
define(function (require) {
        'use strict';

        var NagiosStore = require("stores/NagiosStore");

        var React = require("react");

        return React.createClass({



            // call serverStore

            //
            getInitialState: function () {
                return this.getState();
            },

            updateState: function () {
                if (this.isMounted()) this.setState(this.getState());
            },

            componentDidMount: function () {
                NagiosStore.addChangeListener(this.updateState);

            },

            componentWillUnmount: function () {
                NagiosStore.removeChangeListener(this.updateState);

            },

            getState: function () {
                return {
                    data: NagiosStore.getAll(),
                    hosts: NagiosStore.getNames()
                };
            },


            checkData: function(something){
              console.log(something);
            },



   // {this.renderServerStatus(server)}

            /*printAll: function (server) {



            },*/

            renderTableRow: function (name) {


                //server.name = host


                return (
                    <tr key = {name}>
                        <td>{name}</td>
                        <td>{this.state.data[name].last_check}</td>
                            {this.renderServerStatus(this.state.data[name].current_state)}
                    </tr>
                    )
            },//

            renderServerStatus: function (status) {
                // server.current_state === 0
                // server.status === "online"
                if (status == "0") {
                    return(
                        //span gliphicon
                        <td>
                            <span className="glyphicon glyphicon-ok-sign"></span>
                        </td>
                        )
                }
                else {
                    return(
                        //other glyph
                        <td>
                            <span className="glyphicon glyphicon-remove-sign"></span>
                        </td>
                        )
                }

            },

            render: function () {

                if (this.state.data) {

                    return (

                        <div className = "status-table">
                            <h2>Here is a list of Hosts and Status:</h2>
                            <table>
                                <th>Server</th>
                                <th>Last Check</th>
                                <th>Status</th>
                                {this.state.hosts.map(this.renderTableRow)}
                            </table>

                        </div>
                        );
                }

                else {
                    return(


                        <div className = "status-table">
                        :( <br/>
                        Loading!
                        </div>
                        )
                }
            }

        });
    }
);
