'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
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
          msg: `Validation error: email format is incorrect`
        },
        isUnique(email) {
          return Teacher.findOne({
              where: {
                  email : email
              }
          })
          .then(teacher => {
            if (teacher) {
              if (teacher.dataValues.id != this.id) {
                throw `Email sudah digunakan`
              } 
            }            
          })
          .catch(err => {
            throw err
          }); 
        }
      }
    },
    SubjectId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsTo(models.Subject)
  };
  return Teacher;
};
// else { %>
//   <td> <%= t.Subject.subject_name %> </td> 
// <% } %>