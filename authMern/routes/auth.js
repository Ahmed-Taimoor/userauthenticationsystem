const Joi = require('joi');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: 'Invalid Email or Password' });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    if (!validPassword)
      return res.status(401).send({ message: 'invalid Email or Password' });
  }
  catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

const validate = (data) => {

  const scheama = Joi.object({

    email: Joi.string().email().required().label('email'),

    password: Joi.string().email().label('Password'),

  });

  return scheama.validate(data);

};

module.exports = router;
