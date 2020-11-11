'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("Users", {
      id: {
        type: Sequelize.BIGINT(10),
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: { args: false, msg: 'Email is required.' },
        validate: { isEmail: { msg: 'Invalid email.' } },
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: { args: false, msg: 'Password is required.' },
        validate: {
          is: {
            args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
            msg:
              'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'
          }
        }
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
          iS: {
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
        defaultValue:0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      lastSignin: Sequelize.DATE,
      emailVerificationToken:{
        type:Sequelize.STRING(100)
      },
      resetPasswordToken: {
        type: Sequelize.STRING(100)
      },
      resetPasswordExpiry: {
        type: Sequelize.DATE
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users")

  }
};


// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.createTable("Users", {
//       id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//       username: {
//         type: Sequelize.STRING(15),
//         allowNull: false
//       },
//       password: {
//         type: Sequelize.STRING(15),
//         allowNull: false
//       },
//       createdAt: Sequelize.DATE,
//       updatedAt: Sequelize.DATE,
//     })
//   },

//   down: async (queryInterface, Sequelize) => {
//     return queryInterface.dropTable("Users")
//   }
// };