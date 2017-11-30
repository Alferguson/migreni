'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Treatments', [{
        id: 1,
        name: 'Apirin',
        acute: true,
        CategoryId: 1
      },
      {
        id: 2,
        name: 'Ibuprofen',
        acute: true,
        CategoryId: 1
      },
      {
        id: 3,
        name: 'Propranolol',
        acute: false,
        CategoryId: 7
      },
      {
        id: 4,
        name: 'Valproate',
        acute: false,
        CategoryId: 9
      },
      {
        id: 5,
        name: 'Acetaminophen',
        acute: true,
        CategoryId: 1
      },
      {
        id: 6,
        name: 'Excedrin Migraine',
        acute: true,
        CategoryId: 1
      },
      {
        id: 7,
        name: 'Sumatriptan',
        acute: true,
        CategoryId: 2
      },
      {
        id: 8,
        name: 'Rizatriptan',
        acute: true,
        CategoryId: 2
      },
      {
        id: 9,
        name: 'Zolmitriptan',
        acute: true,
        CategoryId: 2
      },
      {
        id: 10,
        name: 'Ergotamine',
        acute: true,
        CategoryId: 3
      },
      {
        id: 11,
        name: 'Chlorpromazine',
        acute: true,
        CategoryId: 4
      },
      {
        id: 12,
        name: 'Codeine',
        acute: true,
        CategoryId: 5
      },
      {
        id: 13,
        name: 'Prednisone',
        acute: true,
        CategoryId: 6
      },
      {
        id: 14,
        name: 'Amitriptyline',
        acute: false,
        CategoryId: 8
      },
      {
        id: 15,
        name: 'Riboflavin (Vitamin B-2)',
        acute: false,
        CategoryId: 10
      },
      {
        id: 16,
        name: 'Massage Therapy',
        acute: false,
        CategoryId: 11
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Treatments', null, {});
  }
};