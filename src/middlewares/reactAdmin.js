export default (req, res, next) => {
    res.set('Access-Control-Expose-Headers', 'X-Total-Count');
    res.set('X-Total-Count', parseInt(words?.info?.count, 10));
    next();
};
