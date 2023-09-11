const passport = require("passport");
const passportJwt = require("passport-jwt");
const StrategyJwt = passportJwt.Strategy;

const cookieExtract = function (req:any) {
  let token = null
  if (req && req.headers) token = req.cookies['auth-token'];
  return token;
};

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: cookieExtract,
      secretOrKey   : process.env.TOKEN_KEY
    },
    function (jwtPayload:any, done:any) {
      return done(null, jwtPayload);
    }
  )
);