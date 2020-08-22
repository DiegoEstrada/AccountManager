const passport = require('passport');

let middleware = {

    jwtAuthenticationStrategy: (req, res, next) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            console.log("*callback auth* de authenticate para estrategia jwt");
            //console.log(req);
            //In this case we dont provide any token or its corrupted
            if (info) { return res.status(401).json({ error: info.message }) }

            //In case of errors when query a user by ID
            if (err) { return res.status(500).json({ error: err }) }

            //Case when the ID its not in the DB, but a valid jwt was sent
            if (!user) { return res.status(403).json({ notAllowed: "You migh has not the correct credentials to this resource" }) }

            //Go to controller
            next();
        })(req, res, next);

    }

}
module.exports = middleware;