'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "updatedAt" from table "Doses"
 * removeColumn "createdAt" from table "Doses"
 * removeColumn "updatedAt" from table "Treatments"
 * removeColumn "createdAt" from table "Treatments"
 * removeColumn "updatedAt" from table "Weather"
 * removeColumn "createdAt" from table "Weather"
 *
 **/

var info = {
    "revision": 3,
    "name": "migrani",
    "created": "2017-11-29T21:55:45.846Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Doses", "updatedAt"]
    },
    {
        fn: "removeColumn",
        params: ["Doses", "createdAt"]
    },
    {
        fn: "removeColumn",
        params: ["Treatments", "updatedAt"]
    },
    {
        fn: "removeColumn",
        params: ["Treatments", "createdAt"]
    },
    {
        fn: "removeColumn",
        params: ["Weather", "updatedAt"]
    },
    {
        fn: "removeColumn",
        params: ["Weather", "createdAt"]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
