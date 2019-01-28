'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Teachers', [{
        first_name: 'Bambang',
        last_name: 'Suprapto',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'bambangsuprapto@sekolah.id'
      }, 
      {
        first_name: 'Rukmana',
        last_name: 'Fatmawati',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'rukmanafatmawati@sekolah.id'
      },
      {
        first_name: 'Butet',
        last_name: 'Naiborhu',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'butetnaiborhu@sekolah.id'
      },
      {
        first_name: 'Yulius',
        last_name: 'Prawiranegara',
        createdAt: new Date(),
        updatedAt: new Date(),
        email: 'yuliusprawiranegara@sekolah.id'
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Teachers', null, {});
  }
};
