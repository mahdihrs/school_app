'use strict';
const bcrypt = require('bcryptjs');
const generateHash = require('../helpers/generateHash')
module.exports = (sequelize, DataTypes) => {
  // const saltRounds = 10;
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `Email tidak valid`
        }
      }
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {});


//Crypto
  // User.beforeCreate((user, options) => {
  //   let hashAndSalt = generateHash(user.password)
  //   user.salt = hashAndSalt.salt
  //   user.password = hashAndSalt.hash
  // })

//BCRYPT
  User.beforeCreate((user, options) => {
    user.password = `hacktiv8${user.name}`
    return bcrypt.genSalt(10)
      .then((salt) => {
        return bcrypt.hash(user.password, salt)
      })
      .then(hash => {
        user.password = hash
      })
      .catch(err => {
        throw err
      })
  });

  User.associate = function (models) {
    // associations can be defined here
  };


  return User;
};