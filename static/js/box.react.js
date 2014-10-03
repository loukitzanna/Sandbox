/** @jsx React.DOM */
define(
    [
        'react',
        'serverTable.react'
    ],
function (React, serverTable ){

  return React.createClass({
        render: function () {

            return (
                <div className = "boxes">
                    <h3>This is  box full of boxes</h3>

                    <serverTable/>

                </div>
                );
        }
    });
}
);