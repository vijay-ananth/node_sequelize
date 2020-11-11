const model = require("../models");
const jwt = require("../services/jwt")
const UserMailer = require("../mailers/services/UserMailer")
const _ = require("lodash");
const user = require("../models/user");
const _re_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/

module.exports = class UserService {

    static async loginUser(body) {
        return new Promise(async (resolve, reject) => {
            try {
                let user = await model.user.findOne({
                    where: {
                        email: body.email,
                    }
                })

                if (!user)
                    reject(new ErrorHandler(401, 'Unauthorized'))

                let passwordIsValid = await jwt.comparePassword(body.password, user.password)

                if (!passwordIsValid)
                    reject(new ErrorHandler(401, 'Unauthorized'))

                let expiresIn = 86400 // 24 hours

                let payload = { id: user.id }


                let token = await jwt.sign(payload, expiresIn)

                let response = _.pick(user, ['id', 'email', 'password'])

                resolve({
                    statusCode: 200,
                    data: {
                        ...response,
                        accessToken: token
                    }
                });
            } catch (error) {
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            }
        });
    }

    static async signUp(body) {
        return new Promise(async (resolve, reject) => {
            try {
                if (!_re_password.test(body.password))
                    return reject(new ErrorHandler(400, 'The password must contain atleast 8 characters including at least 1 uppercase, 1 lowercase and one digit.'))
                body.password = await jwt.hashPassword(body.password)
                const emailVerification = await jwt.hashPassword(new Date().getTime().toString())
                const userObject = _.pick(body, ['email', 'password', 'name', 'groupId', 'firstName', 'lastName', 'gender', 'productDealing', 'phone', 'companyName', 'GST', 'PAN', 'address', 'pincode', 'cityId', 'status'])
                userObject.emailVerificationToken = emailVerification
                const user = model.user.build(userObject);
                user.save().then(user => {
                    UserMailer.signUp(user).then(data => {
                        logger.info(data);
                    })
                    logger.info("USER::CREATED")
                    return resolve({ statusCode: 200 })
                }).catch(function (error) {
                    logger.error(error)
                    reject(new ErrorHandler(500, 'Something went wrong!', error))
                });
            } catch (error) {
                logger.error(error)
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            }
        })
    }

    static resetPassword(token, password) {
        return new Promise((resolve, reject) => {
            try {
                model.user.findOne({ where: { resetPasswordToken: token } }).then(async user => {
                    if (user) {
                        if (user.resetPasswordExpiry < new Date()) {
                            reject({ statusCode: 400, message: 'Token expired' })
                        } else {
                            logger.info(token, password)
                            user.password = await jwt.hashPassword(password)
                            user.resetPasswordToken = null
                            user.resetPasswordExpiry = null
                            user.save().then(user => {
                                resolve({ statusCode: 200, message: 'Reset password successful' })
                            }).catch(error => {
                                logger.error(error)
                                reject(new ErrorHandler(500, 'Something went wrong!', error))
                            })
                        }
                    } else {
                        reject(new ErrorHandler(400, 'Invalid token'))
                    }
                }).catch(error => {
                    logger.error(error)
                    reject(new ErrorHandler(500, 'Something went wrong!', error))
                })
            } catch (error) {
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            }
        });
    }

    static sendResetPassword(email) {
        return new Promise((resolve, reject) => {
            model.user.findOne({ where: { email: email } }).then(async user => {
                if (user) {
                    user.resetPasswordToken = await jwt.hashPassword(new Date().getTime().toString())
                    user.resetPasswordExpiry = new Date(new Date().getTime() + (60 * 60 * 1000));
                    user.save().then(async user => {
                        UserMailer.forgotPassword(user).then((data) => {
                            logger.info(data);
                        })
                        resolve({ statusCode: 200, message: 'Email sent successfully' })
                    }).catch(err => {
                        logger.error(err);
                        reject(new ErrorHandler(500, 'Something went wrong!', error))
                    })
                } else {
                    reject(new ErrorHandler(400, 'Email not exists'))
                }
            })
        });
    }

    static validateResetToken(token) {
        return new Promise((resolve, reject) => {
            model.user.findOne({ where: { resetPasswordToken: token } }).then(async user => {
                if (user) {
                    if (user.resetPasswordExpiry < new Date()) {
                        reject({ statusCode: 400, data: false })
                    } else {
                        resolve({ statusCode: 200, data: true })
                    }
                } else {
                    reject({ statusCode: 400, data: false })
                }
            })
        });
    }


    static emailVerification(token) {
        return new Promise((resolve, reject) => {
            try {
                model.user.findOne({ where: { emailVerificationToken: token } }).then(async user => {
                    if (user) {
                        user.isVerified = true;
                        user.save().then(async user => {
                            resolve({ statusCode: 200, message: 'Email verificition successfully' })
                        }).catch(err => {
                            logger.error(err);
                            reject(new ErrorHandler(500, 'Something went wrong!', error))
                        })
                    } else {
                        reject(new ErrorHandler(400, 'Email verification faild'))
                    }

                }).catch(err => {
                    logger.error(err);
                    reject(new ErrorHandler(500, 'Something went wrong!', err))
                })
            } catch (error) {
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            }

        });
    }

    static checkActive(id) {
        return new Promise((resolve, reject) => {
            try {
                model.user.findOne({ where: { id: id } }).then(async user => {
                    if (user) {
                        user.isVerified = true;
                        user.save().then(async user => {
                            resolve({ statusCode: 200, message: 'active' })
                        }).catch(err => {
                            logger.error(err);
                            reject(new ErrorHandler(500, 'inactive', error))
                        })
                    } else {
                        reject(new ErrorHandler(400, 'Email verification faild'))
                    }
                }).catch(err => {
                    logger.error(err)
                    reject(false)
                })

            } catch (error) {

            }

        });
    }

    static userProfile(id) {
        return new Promise((resolve, reject) => {
            console.log(id, '****')
            model.user.findByPk(id).then(async user => {
                console.log(user)
                if (user) {
                    let filtered_data = _.pick(user, ['id', 'name', 'email', 'groupId','first_name','last_name','gender','productDealing','phone','companyName','GST','PAN','address','pincode','cityId','status','createdAt', 'updatedAt'])
                    resolve({ statusCode: 200, data: filtered_data })
                } else
                    reject(new ErrorHandler(400, 'User not exists'))
            }).catch(error => {
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            })
        });
    }

    static socialLogin(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const token = await jwt.sign({ id }, '1d')
                resolve({ statusCode: 200, accessToken: token })
            } catch (error) {
                reject(new ErrorHandler(500, 'Something went wrong!', error))
            }
        })
    }
}