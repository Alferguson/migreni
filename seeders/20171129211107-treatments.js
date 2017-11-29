'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Treatments', [
      {
        id: 1,
        name: 'Apirin',
        acute: true,
        category: 'Pain Relief'
      },
      {
        id: 2,
        name: 'Ibuprofen',
        acute: true,
        category: 'Pain Relief'
      },
      {
        id: 3,
        name: 'Propranolol',
        acute: false,
        category: 'Cardiovascular Drugs'
      },
      {
        id: 4,
        name: 'Valproate',
        acute: false,
        category: 'Anti-seizure Drugs'
      },
      {
        id: 5,
        name: 'Acetaminophen',
        acute: true,
        category: 'Pain Relief'
      },
      {
        id: 6,
        name: 'Excedrin Migraine',
        acute: true,
        category: 'Pain Relief'
      },
      {
        id: 7,
        name: 'Sumatriptan',
        acute: true,
        category: 'Triptans'
      },
      {
        id: 8,
        name: 'Rizatriptan',
        acute: true,
        category: 'Triptans'
      },
      {
        id: 9,
        name: 'Zolmitriptan',
        acute: true,
        category: "Triptans"
      },
      {
        id: 10,
        name: 'Ergotamine',
        acute: true,
        category: 'Ergots'
      },
      {
        id: 11,
        name: 'Chlorpromazine',
        acute: true,
        category: 'Anti-Nausea Medications'
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Treatments', null, {});
  }
};