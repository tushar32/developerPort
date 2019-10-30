const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const gravtar = require('gravatar');
const bcrypt = require('bcryptjs');

//@route GET  api/auth
router.get('/',auth,
async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch {
        res.status(500).json({msg:'fdf'});
    }
});

//@route POST  api/auth
//@desc Login user
router.post('/login', [
    check('email','Please enter a valid email').isEmail(),
    // password must be at least 5 chars long
    check('password','Please enter a password').exists()
  ], 
  async (req,res) => {
      const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({ errors: errors.array()});
    }
    const { email,password } = req.body;

    try{
        let user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({ errors: [{ msg: 'Invalid Password'}]})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Password'}]})
        }
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload,config.get('jwtSecretToken'),
        { expiresIn : 360000},
        (err, token) => {
             if(err) throw err;
             res.json({ token })
        });


    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
 
});

module.exports = router;