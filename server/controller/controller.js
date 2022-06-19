const Userdb= require("../model/model");

// create and save new user

exports.create=(req,res)=> {

    // validate request

    if(!req.body) {

        res.send({

            message: "Content Cannot be empty!"
        })
        
        return;
    }

    const user= new Userdb({


        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
    })

    // save user in the database

    user.save(user).then(data=> {


        res.redirect("/add_user")
    }).catch(err=> {

        res.send({

            message: err.message || 'Some error occured while creating a create operation'
        });
    });


}


// retrieve and return all users/ retrieve and return a single user

exports.find=(req,res)=> {


    if(req.query.id){

        const id= req.query.id;

        Userdb.findById(id)
        .then(data=> {

            if(!data) {

                res.send({

                    message: "Not find user with id"+ id
                })
            }

            else {

                res.send(data)
            }
        })
        .catch(err=> {

            res.send({
                message: "Error retreiving user with id"+ id
            })
        })



    }


    else {

    

    Userdb.find()
    .then(user=> {

        res.send(user)
    })
    .catch(err=> {
        res.send({

        message: err.message || "Error occured while retreiving user information"
        })
    })

}     


}


// Update a new identified user by user id
exports.update=(req,res)=> {

    if(!req.body) {

        res.send({

            message:"Data to update cannot be empty"
        })


    }

    const id= req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=> {

        if(!data)
        {

            res.send({messsage: `cannot update user by ${id}.Maybe user not found `})
        }

        else {


            res.send(data)
        }
    })
    .catch(err=> {

        res.send({

            message: "Error update user information"
        })
    })

}

// Delete a user with specified user id in the request

exports.delete=(req,res)=> {

    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=> {

        if(!data) {

            res.send({

                message: `Cannot delete user data with id ${id}.Maybe id is wrong.`
            })

        }


        else {


            res.send({

                message: "User data delected successfully!!!"
            })
        }

    })
    .catch(err=> {


        res.send({

            message: `Couldn't delete user with id ${id}`
        })
    })



}