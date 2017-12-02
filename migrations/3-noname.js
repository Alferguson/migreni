'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "CategoryId" from table "Treatments"
 * removeColumn "comment" from table "Migraines"
 * removeColumn "length" from table "Migraines"
 * removeColumn "name" from table "Treatments"
 * removeColumn "uuid" from table "Users"
 * dropTable "Doses"
 * dropTable "Categories"
 * addColumn "dose" to table "Treatments"
 * addColumn "dose_unit" to table "Treatments"
 * addColumn "treatment_name" to table "Treatments"
 * changeColumn "MigraineId" on table "Weather"
 *
 **/

var info = {
    "revision": 3,
    "name": "noname",
    "created": "2017-12-02T20:13:07.533Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["Treatments", "CategoryId"]
    },
    {
        fn: "removeColumn",
        params: ["Migraines", "comment"]
    },
    {
        fn: "removeColumn",
        params: ["Migraines", "length"]
    },
    {
        fn: "removeColumn",
        params: ["Treatments", "name"]
    },
    {
        fn: "removeColumn",
        params: ["Users", "uuid"]
    },
    {
        fn: "dropTable",
        params: ["Doses"]
    },
    {
        fn: "dropTable",
        params: ["Categories"]
    },
    {
        fn: "addColumn",
        params: [
            "Treatments",
            "dose",
            {
                "type": Sequelize.DECIMAL,
                "validate": {
                    "len": {
                        "args": [1],
                        "msg": "Dose value cannot be empty."
                    }
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Treatments",
            "dose_unit",
            {
                "type": Sequelize.STRING(20),
                "validate": {
                    "len": {
                        "args": [1],
                        "msg": "Dose unit cannot be empty."
                    }
                },
                "allowNull": true
            }
        ]
    },
    {
        fn: "addColumn",
        params: [
            "Treatments",
            "treatment_name",
            {
                "type": Sequelize.STRING,
                "validate": {
                    "len": {
                        "args": [1, 255],
                        "msg": "Treatment name must be between 1 and 255 characters"
                    }
                },
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "Weather",
            "MigraineId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "Migraines",
                    "key": "id"
                },
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
