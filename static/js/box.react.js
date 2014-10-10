/** @jsx React.DOM */
define(
    [
        'react',
        'serverTable.react',
        'NagiosTable.react',
        'updateWindow.react'
    ],
function (React, serverTable, NagiosTable, updateWindow){

  return React.createClass({
        render: function () {

            return (
                <div className = "boxes">
                    <h3>This is  box full of boxes</h3>

                    <updateWindow/>

                    <serverTable/>

                    <NagiosTable/>

                </div>
                );
        }
    });
}
);