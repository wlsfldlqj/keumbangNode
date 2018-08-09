const User = require('./user.model');

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

function create(req, res, next) {
    const user = new User({
        name: req.body.name,
        mobile: req.body.mobile
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

module.exports = { list, create };
