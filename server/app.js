const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const myReqLogger = require("./Utilities/requestLogger");
const route = require("./Routes/Routing");
const port = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const {Users} = require("./Model/Schema");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    origin: true,
  })
);
app.use(bodyparser.json());
app.use(myReqLogger);
app.use("/", route);

const clientId = "YOUR GOOGLE CLIENT ID";
const clientSecret = "YOUR GOOGLE CLIENT SECRET";


//setup session
app.use(
  session({
    secret: "223118spkey",
    resave: false,
    saveUninitialized: true,
  })
);

//setup passport
app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({ id: profile.id });
        if (!user) {
          user = new Users({
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
          });

          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// initial google ouath login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard",
    failureRedirect: "http://localhost:3000/login",
  })
);

app.get('/login/success',async(req, res)=>{
  if(req.user){
    res.status(200).json({message: "user authenticated",user:req.user})
  }else{
    res.status(401).json({message: "user not authenticated"})
  }
});

app.get('/logout',(req, res,next)=>{
  req.logout(function(err){
    if(err){return next(err)}
    res.redirect('http://localhost:3000/login');
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
