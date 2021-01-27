const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  jwtId: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);

const User = mongoose.model('User', UserSchema);

module.exports.addUser = async (user) => {
  const finishedUser = await User.create(user);
  return finishedUser;
};

module.exports.getUsers = (callback, limit) => {
  User.find(callback).limit(limit);
};

module.exports.getUserByEmail = async (userEmail) => {
  try {
    const user = await User.findOne({ email: userEmail });
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Update a user
module.exports.updateUser = async (user) => {
  // eslint-disable-next-line max-len
  const updatedUser = await User.updateOne({ email: user.email }, user);
  return updatedUser;
};
