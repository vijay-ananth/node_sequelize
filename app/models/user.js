const Sequelize = require("sequelize")
const { validate } = require("uuid")
const sequelize = require('../db/index')

module.exports = sequelize.define("Users", {
  id: {
    type: Sequelize.BIGINT(10),
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: Sequelize.STRING(50),

    allowNull: { args: false, msg: 'Email is required' },
    validate: { isEmail: { msg: 'Invalid email.' } },
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: { args: false, msg: 'Password is required' },
  },
  name: {
    type: Sequelize.STRING(25),
  },
  groupId: {
    type: Sequelize.BIGINT(10),
  },
  firstName: {
    type: Sequelize.STRING(25),
  },
  lastName: {
    type: Sequelize.STRING(25),
  },
  gender: {
    type: Sequelize.ENUM,
    values: ['male', 'female']
  },
  productsDealing: {
    type: Sequelize.TEXT
  },
  phone: {
    type: Sequelize.STRING(14)
  },
  companyName: {
    type: Sequelize.STRING(255)
  },
  GST: {
    type: Sequelize.STRING(20),
    validate: {
      is: {
        args: "^[0-9]{2}[A-Z]{5}[0-9]{4}" + "[A-Z]{1}[1-9A-Z]{1}" + "Z[0-9A-Z]{1}$",
        msg: 'Invalid GST number'
      }
    }
  },
  PAN: {
    type: Sequelize.STRING(10),
    validate: {
      is: {
        args: "[A-Z]{5}[0-9]{4}[A-Z]{1}",
        msg: 'Invalid PAN number'
      }
    }
  },
  address: {
    type: Sequelize.TEXT,
  },
  pincode: {
    type: Sequelize.INTEGER(6),
    validate: {
      len: {
        args: [6, 6],
        msg: "Pincode must be six character"
      }
    }
  },
  cityId: {
    type: Sequelize.BIGINT(10)
  },
  status: {
    type: Sequelize.STRING(20)
  },
  isVerified: {
    type: Sequelize.BOOLEAN,
    defaultValue:false
  },
  emailVerificationToken:{
    type:Sequelize.STRING(100)
  },
  lastSignin: Sequelize.DATE,
  resetPasswordToken: {
    type: Sequelize.STRING(100)
  },
  resetPasswordExpiry: {
    type: Sequelize.DATE
  },
})
// "use strict";
// var bcrypt = require('bcrypt-nodejs')
// const sequelize = require("sequelize")

// module.exports = function (sequelize, DataTypes) {
//   var userSchema = sequelize.define('User', {
//     username: {
//       type: DataTypes.STRING,
//       unique: true,
//     },
//     password: {
//       type: DataTypes.STRING,
//     },
//     first_name: {
//       type: DataTypes.STRING,
//     },
//     last_name: {
//       type: DataTypes.STRING,
//     }
//   },
//     //   options
//     {
//       timestamps: true, // we don't want timestamp for this table
//       classMethods: {
//         // Class method User.comparePassword() to compare hash vs.
//         // provided password
//         comparePassword: function (password, hash, callback) {
//           // if bcrypt.compare() succeeds it'll call our function with
//           // (null, true), if password doesn't match it calls our function
//           // with (null, false), if it errors out it calls our function
//           // with (err, null)
//           bcrypt.compare(password, hash, function (err, isMatch) {
//             if (err) {
//               return callback(err, null);
//             } else {
//               callback(null, isMatch);
//             }
//           });
//         },
//         associate: function (models) {
//           // TODO: define association of user model
//           // something like User.hasMany(Pen);
//         }
//       }
//     });

//   //   This hook is called when an entry is being added to the back end.
//   //   This method is used to hash the password before storing it
//   //   in our database.
//   //   userSchema.hook('beforeCreate', function(user, options, callback) {
//   //     var SALT_WORK_FACTOR = 10;
//   //     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//   //       if(err) {
//   //         return callback(err, null);
//   //       }
//   //       // generate salt.
//   //       bcrypt.hash(user.password, salt, null, function(err, hash) {
//   //         if(err) {
//   //           return callback(err, null);
//   //         }
//   //         // replace the password with the hash and pass on the
//   //         // user object to whoever should require it.
//   //         user.password = hash;
//   //         return callback(null, user);
//   //       });
//   //     });
//   //   });

//   return userSchema;
// }