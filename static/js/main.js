require(
    [
        'react',
        'box.react'
    ],
    function (React, Box) {
        'use strict';

        React.renderComponent(Box(), document.getElementById('content'));
    });