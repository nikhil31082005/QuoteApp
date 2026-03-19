const AuthRepository = require('../repositories/authRepository');
const jwt = require('../config/jwt');

const checkUser = async (email) => {
    const isUserRegistered = await AuthRepository.checkUser(email);
    return isUserRegistered;
};

const registerUser = async (username, email, password) => {
    const registeredUser = await AuthRepository.registerUser(username, email, password);
    const token = jwt.generateToken({ email });
    return { registeredUser, token };
}

const loginUser = async (email, password) => {
    const hashedPassword = await AuthRepository.loginUser(email);
    return hashedPassword;
}

module.exports = {
    checkUser,
    registerUser,
    loginUser,
};
