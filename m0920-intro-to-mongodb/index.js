const express = require('express');
const path = require('path');

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');
const mongoConnect = require('./util/database').mongoConnect;

//--------------------Setups--------------------
const app = express();
app.use(express.urlencoded({extended:false}));

//app.set = allows us to set any values globally on our express application
app.set('view engine', 'ejs');
//views is set to default path of views but I am just implicitly showing
app.set('views','views');

//serve file statically
app.use(express.static(path.join(__dirname, 'public')))

//--------------------Middleware--------------------
app.use('/admin',adminRouters);
app.use(shopRouters);

// catch all middleware
app.use((req,res,next)=>{
    res.render('404', {
        pageTitle: 'Page not found'
    });
});
//----------------End of Middleware-----------------

mongoConnect(() => {
    app.listen(5000, () => console.log('Server connected to port 5000'));
})
