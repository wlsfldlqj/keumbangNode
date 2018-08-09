const User = require('./user.model');

function load(req, res, next, id) {
    User.get(id)
        .then((user) => {
            req.user = user;
            return next();
        })
        .catch(e => next(e));
}
  
function get(req, res) {
    return res.json(req.user);
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    User.list({ limit, skip })
        .then(users => res.json(users))
        .catch(e => next(e));
}

function create(req, res, next) {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        mobile: req.body.mobile,
        birthday: req.body.birthday
    });

    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
}

function update(req, res, next) {
    const user = req.user;
    user.name = req.body.name;
    user.mobile = req.body.mobile;
    user.birthday = req.body.birthday; 
  
    user.save()
        .then(savedUser => res.json(savedUser))
        .catch(e => next(e));
  }

module.exports = { load, get, list, create, update };
