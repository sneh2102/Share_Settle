const Group = require("../Models/groupModel");

// create a new group
const createGroup = async (req, res) => {
    console.log(req);
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
    console.log(req);
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

module.exports = {createGroup, fetchUserGroups};