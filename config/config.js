import morgan from 'morgan'
const {token} = morgan

module.exports = {
    secretkey: process.env.SECRET_KEY,
    tokenExpiresIn: '1h'
};