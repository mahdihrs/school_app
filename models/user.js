'use strict';
const generateHash = require('../helpers/generateHash')
const generateHashBcrypt = require('../helpers/generateHashBcrypt')
module.exports = (sequelize, DataTypes) => {
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
    let password = `hacktiv8${user.name}`
    return generateHashBcrypt(password)
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