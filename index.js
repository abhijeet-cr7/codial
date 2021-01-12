const express = require('express');
const port = 8001;
const app = express();
const expressLayouts = require('express-ejs-layouts');
app.use(express.static('./assests'));
app.use(expressLayouts);
//route k upar lena hai layout 

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
// use express router
app.use('/', require('./routes'));
// set up the view engine

app.set('view engine', 'ejs');
app.set('views', './views');
app.listen(port, function(err){
    if(err){
        console.log(`Error in port ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
