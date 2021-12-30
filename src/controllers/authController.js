import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';

export default {
    async register(req, res, next) {
        const { login, password } = req.body;
        const user = new User({ login });
        await User.register(user, password);

        res.send({ message: 'User created' });
    },

    async login(req, res, next) {
        if (!req.body.login) {
            return res.status(401).send({ message: 'Login is required' });
        }
        if (!req.body.password) {
            return res.status(401).send({ message: 'Password is required' });
        }

        passport.authenticate(
            'local',
            { session: false },
            (err, user, info) => {
                if (err) {
                    return res.status(401).send({ message: err });
                }
                if (!user) {
                    return res.status(401).send({
                        message: 'Login or password is incorrect',
                    });
                }

                const token = jwt.sign(
                    { id: user._id },
                    process.env.JWT_TOKEN,
                    {
                        expiresIn: '15m',
                    }
                );

                return res
                    .cookie('jwt', token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                    })
                    .send({
                        message: 'Authentication successful',
                    });
            }
        )(req, res);
    },

    async logout(req, res, next) {
        if (!req.cookies.jwt) {
            return res.status(401).send({ message: 'No token' });
        }

        res.clearCookie('jwt').send({ message: 'You have logged out' });
    },
};
