const { Router, response } = require("express");
const express= require("express");
const axios= require("axios");

const route= express.Router();

const controller= require("../controller/controller");



route.get("/", (req,res)=> {

    axios.get('http://localhost:9090/api/users')
    .then((response)=> {
        
        res.render("index",{users: response.data});


    })
    .catch(err=> {

        res.send(err)
    })
    

    
})

route.get("/add_user",(req,res)=> {

    res.render("add_user")
})

route.get("/update_user",(req,res)=> {

    res.render("update_user")
})


//API

route.post("/api/users" ,controller.create);
route.get("/api/users" ,controller.find);
route.put("/api/users/:id" ,controller.update);
route.delete("/api/users/:id" ,controller.delete);




module.exports= route;