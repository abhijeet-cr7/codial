const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customWare = require('./config/middleware');

app.use(sassMiddleware({
  src : './assests/scss',
  dest: './assests/css',
  debug: true,
  outputStyle: 'extended', 
  prefix:'/css' 
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assests'));
app.use('/uploads',express.static(__dirname + '/uploads'));
// dirname shows current directory
app.use(expressLayouts);
//route k upar lena hai layout 
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router

app.set('view engine', 'ejs');
app.set('views', './views');


// mongoStore is used to store the session cookie in the db
app.use(session({
    name: 'codial', 
    // upar cookie ka naam hai
    // TODO change the secret before deployment in production mode
    secret: "blah something",
    saveUninitialized: false,
    // jab user login nahi kiya hai to extra data store nhi karega upar wla statement k karan cookie mein
    resave: false,
    // agar data saved hai aur uspar koi change nahi hua hai to upar wala statement usko waps add nahi karega
    cookie:{
        maxAge: (1000*60*100)
        // ye upar milliseconds mein hai
    },
    store : new MongoStore({

        mongooseConnection: db,
        autoRemove: 'disabled'
        // above property doesn't remove that automatically
    },
    function(err)
    {
        console.log(err || 'connect-mongodb setup ok');
    }
    )
    // store is used in order to store the data in mongo even the sever gets killed
    }
));  
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customWare.setFlash);
// use express router
app.use('/', require('./routes'));
app.listen(port, function(err){
    if(err){
        console.log(`Error in port ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
// npm i connect-flash (for flash messages)