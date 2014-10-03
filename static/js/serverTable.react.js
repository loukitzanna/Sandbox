/** @jsx React.DOM */

var serverTable = React.createClass({


    // call serverStore




   //
    getInitialState: function() {
        return this.getState();
    },

    updateState: function() {
        if (this.isMounted()) this.setState(this.getState());
    },

    componentDidMount: function () {
        ServerStore.addChangeListener(this.updateState);

    },

    componentWillUnmount: function () {
        ServerStore.removeChangeListener(this.updateState);

    },

    getState: function() {
        return {
            servers: ServerStore.getAll()
        };
    },

    renderTableRow: function(server){
      return (
          <tr key = {server.id}>
              <td>{server.id}</td>
              <td>{server.name}</td>
          {this.renderServerStatus(server)}
          </tr>
          )
    },

    renderServerStatus: function(server){

            if (server.status === "online"){
                return(
                    //span gliphicon
                    <td>
                        <span className="glyphicon glyphicon-ok-circle"></span>
                    </td>
                    )
            }
            else{
                return(
                    //other glyph
                    <td>
                        <span className="glyphicon glyphicon-remove-circle"></span>
                    </td>
                    )
            }


    },

        render: function(){


                if (this.state.servers) {
                    return (

                        <div className = "status-table">
                            <table>
                                <th>Status</th>
                                <th>Server</th>
                    {this.state.servers.map(this.renderTableRow)}

                            </table>

                        </div>
                        );
                }

                else{
                    return(


                    <div className = "status-table">
                        :)

                        </div>
                        )
            }
        }

  });
