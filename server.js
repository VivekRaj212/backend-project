const express= require("express");
const dotenv= require("dotenv");
const morgan= require("morgan");
const bodyparser= require("body-parser");
const path= require("path");
const connectDB= require("./server/database/connection");
const app= express();
dotenv.config({path: '.env'})
const port= process.env.PORT || 8080

//log requests
app.use(morgan('tiny'));


//mongodb connection

connectDB();


//parse request to body-parser
app.use(bodyparser.urlencoded({extended: true}));


// setview engine
app.set('view engine','ejs');


// load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")));
app.use("/img",express.static(path.resolve(__dirname,"assets/img")));
app.use("/js",express.static(path.resolve(__dirname,"assets/js")));

// load routers

app.use("/",require("./server/routes/router"));



app.listen(port,()=> {

    console.log(`Server running at http://localhost:${port}`);
})