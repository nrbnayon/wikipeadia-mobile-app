const {check, validationResult} = require('express-validator');
const { validate } = require('../models/post');

exports.postValidator = [
    check("title").trim().not().isEmpty().withMessage("Post Title is Missing!"),
    check("content").trim().not().isEmpty().withMessage("Post Content is Missing!"),
    check("meta").trim().not().isEmpty().withMessage("Meta Discripting is Missing!"),
    check("slug").trim().not().isEmpty().withMessage("Post Slug is Missing!"),
    check("tags")
        .isArray()
        .withMessage("Tags Must be array of string!")
        .custom((tags) => {
            for(let t of tags){
                if (typeof t !== "string") {
                    throw Error("Tags must be array  of string!");
                }
            }
            return true;
        }),  
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    if (error.length){
        return res.status(401).json({error: error[0].msg})
    }
    next();
};