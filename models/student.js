'use strict';
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    first_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'isi nama dengan benar'
        },
        isAlpha: {
          args: true,
          msg: `Nama subject tidak boleh menggunakan angka dan karakter lain`
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'isi nama dengan benar'
        },
        isAlpha: {
          args: true,
          msg: `Nama subject tidak boleh menggunakan angka dan karakter lain`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: 'email tidak valid'
        },
        isUnique(email) {
          return Student.findOne({
              where: {
                  email : email
              }
          })
          .then(student => {
            if (student) {
              if (student.dataValues.id != this.id) {
                throw `Email sudah digunakan`
              } 
            }            
          })
          .catch(err => {
            throw err
          }); 
        }
      }  
    }
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Subject, {through: 'StudentSubject'})
  };

  // Student.beforeCreate((userObj) => {
  //   return userObj.email += '@gimail.com'
  // })

  // Student.afterCreate((studentObj) => {
  //   let msg = `Student ${studentObj.first_name} telah terdaftar di sekolah`
  //   return msg
  // })

  return Student;
};