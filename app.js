const express = require('express')
const app = express()
const itemRoutes = require('./routes')
const ExpressError = require('./ExpressError');
app.use(express.json()); 
app.use('/items', itemRoutes)

app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
});
  
  /** general error handler */
  
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: err.message,
    });
});



module.exports = app

