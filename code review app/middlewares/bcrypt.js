const bcrypt = require("bcrypt");

const createHash = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const compareHash = async (data, hash) => {
  try {
    const match = await bcrypt.compare(data, hash);
    return match;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createHash,
  compareHash,
};
