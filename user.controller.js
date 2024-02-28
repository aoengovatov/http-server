const user = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "test";

const addUser = async (email, password) => {
    const passwordHash = await bcrypt.hash(password, 10);
    await user.create({ email, password: passwordHash });
};

const loginUser = async (email, password) => {
    const user = user.findOne({ email });

    if (!user) {
        throw new Error("User is not found");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Wrong password");
    }

    return jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
    addUser,
    loginUser,
};
