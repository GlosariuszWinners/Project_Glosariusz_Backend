import passport from 'passport';
import passportJWT from 'passport-jwt';
import User from '../models/user';

const JWTStrategy = passportJWT.Strategy;

function verifyCallback(payload, done) {
    return User.findOne({ _id: payload.id })
        .then((user) => done(null, user))
        .catch((err) => done(err));
}

const cookieExtractor = (req) => {
    let jwt = null;

    if (req && req.cookies) {
        jwt = req.cookies.jwt;
    }

    return jwt;
};

export default () => {
    const config = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_TOKEN,
    };
    passport.use(User.createStrategy());
    passport.use(new JWTStrategy(config, verifyCallback));
};
