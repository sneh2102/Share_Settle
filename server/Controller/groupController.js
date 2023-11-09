const Group = require("../Models/groupModel");

// create a new group
const createGroup = async (req, res) => {
    console.log(req.body);
    var responseStatus = 200;
    var response = {};
    if(!req.body ||!req.body.name || !req.body.members){
        responseStatus = 404;
        response = { 
            errorMessage: "Invalid request body"
        };
    } else {
        const group = new Group({
            name: req.body.name,
            members: req.body.members
        });
    
        console.log(response);
        try {
            const savedGroup = await group.save();
            response = savedGroup;
        } catch (err) {
            console.log({ message: err });
            responseStatus = 500;
            response = {
                errorStatus: 500, 
                errorMessage: "Internal server error", 
                cause: "Error while saving group"
            };
        }
    }
    res.status(responseStatus).send(response);
};

// fetch all groups of a user by user email
const fetchUserGroups = async (req, res) => {
    console.log(req.body);
    var responseStatus = 200;
    var response;
    if(!req.body && !req.body.email){
        responseStatus = 404;
        response = {
            errorMessage: "Invalid request body"
        };
    } else{
        try{
            const queryResults = await Group.find({"members": req.body.email});
            response = {
                groups: queryResults
            };
            console.log(response);
        } catch(err) {
            console.log({message: err});
            responseStatus = 500;
            response = {
                errorStatus: 500, 
                errorMessage: "Internal server error", 
                cause: "Error while fetching user groups"
            };
        }
    }
    res.status(responseStatus).send(response);
}

const fetchGroup = async (req, res) => {
    const { id } = req.params;
    var responseStatus = 200;
    var response;
        try{
            const queryResults = await Group.findById(id);
            response = {
                group: queryResults
            };
            console.log(response);
        } catch(err) {
            console.log({message: err});
            responseStatus = 500;
            response = {
                errorStatus: 500, 
                errorMessage: "Internal server error", 
                cause: "Error while fetching user groups"
            };
        }
    res.status(responseStatus).send(response);
}



module.exports = {createGroup, fetchUserGroups, fetchGroup};