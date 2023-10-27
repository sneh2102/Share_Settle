const Group = require("../model/group.model");
// const Expense = require("/model/expense.model");
// const User = require("../model/user.model");

// create a new group
const createGroup = async (req, res) => {
    const body = req.body;
    console.log(body);
    responseStatus = 200;
    response = {};
    if(!body ||!body.name || !body.description || !body.groupOwner || !body.members){
        responseStatus = 404;
        response = { 
            errorMessage: "Invalid request body"
        }
    }

    const group = new Group({
        name: req.body.name,
        description: req.body.description,
        groupOwner: req.body.groupOwner,
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
        }
    }

    res.status(responseStatus).send(response);
};

module.exports = {createGroup};