import passport from 'passport';

export default (req, res, next) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);
};

export const noAuth = (req, res, next) => next();
