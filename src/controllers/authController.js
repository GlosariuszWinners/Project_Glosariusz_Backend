import jwt from 'jsonwebtoken';
import User from '../models/user';

export default {
    async login(req, res, next) {
        const token = jwt.sign({ id: req.user._id }, process.env.JWT_TOKEN, {
            expiresIn: 60 * 60,
        });

        res.cookie('jwt', token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
        });

        return res.send({ token });
    },

    async register(req, res, next) {
        const { login, password } = req.body;
        const user = new User({ login });
        await User.register(user, password);

        res.send('User created!');
    },
};
