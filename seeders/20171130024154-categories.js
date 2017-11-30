'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    queryInterface.bulkInsert('Categories', [{
        id: 1,
        name: 'Pain Relief'
      },
      {
        id: 2,
        name: 'Triptans'
      },
      {
        id: 3,
        name: 'Ergots'
      },
      {
        id: 4,
        name: 'Anti-Nausea Medications'
      },
      {
        id: 5,
        name: 'Opioid Medications'
      },
      {
        id: 6,
        name: 'Glucocorticoids'
      },
      {
        id: 7,
        name: 'Cardiovascular Drugs'
      },
      {
        id: 8,
        name: 'Tricyclic Antidepressants'
      },
      {
        id: 9,
        name: 'Anti-Seizure Drugs'
      },
      {
        id: 10,
        name: 'Herbs, Vitamins and Minerals'
      },
      {
        id: 11,
        name: 'Alternative'
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};