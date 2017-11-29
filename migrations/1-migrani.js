'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "texts", deps: []
 * createTable "Treatments", deps: []
 * createTable "Users", deps: []
 * createTable "Doses", deps: [Treatments]
 * createTable "Migraines", deps: [Users]
 * createTable "MigraineTreatments", deps: [Migraines, Treatments]
 * createTable "UserTreatments", deps: [Treatments, Users]
 * createTable "Weather", deps: [Migraines]
 *
 **/

var info = {
    "revision": 1,
    "name": "migrani",
    "created": "2017-11-29T21:29:18.830Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "texts",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING
                },
                "text": {
                    "type": Sequelize.TEXT
                },
                "value": {
                    "type": Sequelize.INTEGER
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Treatments",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "len": {
                            "args": [1, 255],
                            "msg": "Treatment name must be between 1 and 255 characters"
                        }
                    },
                    "allowNull": false
                },
                "acute": {
                    "type": Sequelize.BOOLEAN,
                    "allowNull": false
                },
                "description": {
                    "type": Sequelize.TEXT
                },
                "category": {
                    "type": Sequelize.STRING(40),
                    "validate": {
                        "len": {
                            "args": [1, 40],
                            "msg": "Treatment category must be between 1 and 40 characters"
                        }
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Users",
            {
                "uuid": {
                    "type": Sequelize.UUID,
                    "primaryKey": true,
                    "defaultValue": Sequelize.UUIDV1,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING(40),
                    "validate": {
                        "len": {
                            "args": [3, 40],
                            "msg": "The user name must have between 3 and 40 characters"
                        }
                    },
                    "allowNull": false
                },
                "email": {
                    "type": Sequelize.STRING,
                    "validate": {
                        "isEmail": {
                            "args": true,
                            "msg": "The email must be in a valid format"
                        }
                    }
                },
                "gender": {
                    "type": Sequelize.STRING(20)
                },
                "age": {
                    "type": Sequelize.INTEGER(4)
                },
                "location": {
                    "type": Sequelize.STRING(40)
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Doses",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "value": {
                    "type": Sequelize.DECIMAL,
                    "validate": {
                        "len": {
                            "args": [1],
                            "msg": "Dose value cannot be empty."
                        }
                    },
                    "allowNull": false
                },
                "unit": {
                    "type": Sequelize.STRING(20),
                    "validate": {
                        "len": {
                            "args": [1],
                            "msg": "Dose unit cannot be empty."
                        }
                    },
                    "allowNull": false
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "TreatmentId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Treatments",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Migraines",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "intensity": {
                    "type": Sequelize.INTEGER,
                    "validate": {
                        "min": {
                            "args": 1,
                            "msg": "The intensity must be at least 1"
                        },
                        "max": {
                            "args": 10,
                            "msg": "The Intensity must be at most 10"
                        }
                    },
                    "allowNull": false
                },
                "comment": {
                    "type": Sequelize.TEXT
                },
                "location": {
                    "type": Sequelize.STRING
                },
                "date": {
                    "type": Sequelize.DATE,
                    "defaultValue": Sequelize.NOW
                },
                "length": {
                    "type": Sequelize.INTEGER
                },
                "trigger": {
                    "type": Sequelize.STRING
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "UserUuid": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Users",
                        "key": "uuid"
                    },
                    "allowNull": false
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "MigraineTreatments",
            {
                "MigraineId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Migraines",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "TreatmentId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Treatments",
                        "key": "id"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "UserTreatments",
            {
                "TreatmentId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Treatments",
                        "key": "id"
                    },
                    "primaryKey": true
                },
                "UserUuid": {
                    "type": Sequelize.UUID,
                    "onUpdate": "CASCADE",
                    "onDelete": "CASCADE",
                    "references": {
                        "model": "Users",
                        "key": "uuid"
                    },
                    "primaryKey": true
                }
            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "Weather",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "temp": {
                    "type": Sequelize.DECIMAL
                },
                "temp_min": {
                    "type": Sequelize.DECIMAL
                },
                "temp_max": {
                    "type": Sequelize.DECIMAL
                },
                "humidity": {
                    "type": Sequelize.INTEGER
                },
                "pressure": {
                    "type": Sequelize.DECIMAL
                },
                "sea_level": {
                    "type": Sequelize.DECIMAL
                },
                "grnd_level": {
                    "type": Sequelize.DECIMAL
                },
                "precip": {
                    "type": Sequelize.DECIMAL
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "allowNull": false
                },
                "MigraineId": {
                    "type": Sequelize.INTEGER,
                    "onUpdate": "CASCADE",
                    "onDelete": "NO ACTION",
                    "references": {
                        "model": "Migraines",
                        "key": "id"
                    },
                    "allowNull": false
                }
            },
            {}
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
