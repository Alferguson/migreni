'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "texts"
 * addColumn "updatedAt" to table "Weather"
 * addColumn "createdAt" to table "Weather"
 * changeColumn "CategoryId" on table "Treatments"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2017-12-01T19:54:16.698Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "dropTable",
        params: ["texts"]
    },
    {
        fn: "addColumn",
        params: [
            "Weather",
            "updatedAt",
            {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Weather",
            "createdAt",
            {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Treatments",
            "CategoryId",
            {
                "type": Sequelize.INTEGER,
                "defaultValue": 1,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Categories",
                    "key": "id"
                },
                "allowNull": true
            }
        ]
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
