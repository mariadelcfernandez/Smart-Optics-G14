import JWT from 'jsonwebtoken';
const {jwt} = JWT;
const bcrypt = require('bcryptjs');
const users = require('../models/usersModel');
const config = require('../config/config');
//const { token } = require('morgan'):

exports.register =(req,res) => {
const{ username, password } = req.body;
const hashedPassword = bcrypt.hashSync(password, 8);
const newUser = { id: users.length + 1, username, password: hashedPassword };
users.push(newUser);
res.redirect('/login')
const token = jwt.sign({ id: newUser.id }, config.secretkey, {expiresIn: config.tokenExpiresIn});
res.status(201).send({auth:true, token });
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u = u.username === username);
    if(!user) return res.status(404).send('User not found.');
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if(!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    const token = jwt.sign({ id: user.id }, config.secretkey, { expiresIn: config.tokenExpiresIn });
    res.status(200).send({ auth: true, token });
};

/*const loginCtrl = async (req, res) => {
    try {
        const { email, password } =req.body
        const user = await userModel.findOne({ email })

        if (!user) {
            res.status(404)
            res.send({ error: 'User not fount' })
        }

        //todo: Control de contrasenea
        const checkPassword = await compare(password, user.password) 

        const tokenSession = await tokenSign(user)// este argumento pasamos un objeto a generate para que valide
        
        if (checkPassword) {
            //La Contraeña que esta enviando compatible con el caso con la contraseña estricta
            //todo: Contraeña es correcta!
            res.send({
                data: user,
                tokenSession
            })
            return
        }
        }
        catch (error){
            return null
        }
    }*/
   





