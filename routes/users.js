var express = require('express');
var router = express.Router();

const User = require("../models/User");
const bcrypt = require('bcrypt');

const { updateMailer, main } = require('../mail.js')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then((foundUser) => {

      const { email, name, avatar, password } = foundUser

      res.json({ email, name, avatar, password })
    })
    .catch((err) => {
      console.log("Error updating user ===>", err);
      res.status(500).json({ error: err });
    })
})

router.put('/update/:userId', async (req, res, next) => {
  try {
    const { name, email, password, avatar } = req.body;

    let newPassword

    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }
    // Update the user with the hashed password
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, password: newPassword, avatar }, // Use the hashed password
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated User ===>", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error updating user ===>", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post('/lost-password', async(req, res, next) => {
  User.findOne({email: req.body.email})
    .then((foundUser) => {

      console.log("these are the lost password values", foundUser)

      main(foundUser.email, foundUser.name)
      .catch(e => console.log(e));
    })
    .catch((err) => {
      console.log("this is lost-password error", err)
      res.status(500).json({ error: "Internal server error", err });
    })
  // console.log("This is our found user from the lost-passsword route", user, user.email, user.name)

})

router.put('/reset-password', async (req, res, next) => {
  try {
    const { password } = req.body;

    let newPassword

    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }
    // Update the user with the hashed password
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { password: newPassword }, // Use the hashed password
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    console.log("Updated password for User ===>", updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.log("Error updating user password ===>", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;
  // Validate token and check if not expired
  const user = await findUserByResetToken(token);
  if (!user || user.resetPasswordExpires < Date.now()) {
    return res.status(400).send('Token is invalid or has expired.');
  }

  // Assuming you have a function to hash passwords
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUserPassword(user._id, hashedPassword);
  await clearResetToken(user._id);

  res.send('Password has been reset.');
});


module.exports = router;
