'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    subject_name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'isi subject dengan benar'
        },
        isAlpha: {
          args: true,
          msg: `Nama subject tidak boleh menggunakan angka dan karakter lain`
        }
      }
    }
  }, {});
  Subject.associate = function(models) {
    // associations can be defined here
    Subject.hasMany(models.Teacher)
    Subject.belongsToMany(models.Student, {through: 'StudentSubject'})
  };

  return Subject;
};