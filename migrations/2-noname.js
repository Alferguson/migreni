'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * dropTable "texts"
 * addColumn "createdAt" to table "Weather"
 * addColumn "updatedAt" to table "Weather"
 * changeColumn "CategoryId" on table "Treatments"
 * changeColumn "username" on table "Users"
 *
 **/

var info = {
    "revision": 2,
    "name": "noname",
    "created": "2017-12-02T03:19:54.622Z",
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
            "createdAt",
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
            "updatedAt",
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
    },
    {
        fn: "changeColumn",
        params: [
            "Users",
            "username",
            {
                "type": Sequelize.STRING(40),
                "validate": {
                    "len": {
                        "args": [3, 40],
                        "msg": "The user name must have between 3 and 40 characters"
                    }
                },
                "unique": true,
                "allowNull": false
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
