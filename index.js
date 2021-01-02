const express = require('express');
const port = 8001;
const app = express();
app.listen(port, function(err){
    if(err){
        console.log(`Error in port ${err}`);
    }
    console.log(`Server is running on port ${port}`);
});
