const user = require("./models/user");
const bcrypt = require("bcrypt");

const addUser = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    await user.create({ email, password: passwordHash });
};

module.exports = {
    addUser,
};
