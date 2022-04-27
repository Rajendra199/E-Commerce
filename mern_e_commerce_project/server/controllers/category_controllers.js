const {validationResult} = require('express-validator');
const Category = require('../models/Category');

class CategoryController{
    async create(req, res){
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const {name} = req.body;
            try{
                const exist = await Category.findOne({name});
                if(!exist){
                    await Category.create({name});
                    return res.status(201).json({message: 'Your category has created'})
                }else{
                    return res.status(400).json({ errors: [{msg: `${name} category is already taken`}] }); 
                }
            }catch(err){
                console.log(err.message);
                return res.status(500).json("server error...!!!");
            }
        }else{
            return res.status(400).json({ errors: errors.array() });
        }
    }

    async categories(req, res){
        const page = req.params.page;
        const perPage = 3;
        const skip = (page - 1) * 3;
        try{
            const count = await Category.find({}).countDocuments();
            const response = await Category.find({}).skip(skip).limit(perPage).sort({updatedAt: -1});
            return res.status(200).json({categories: response, perPage, count});
        }catch(error){
            console.log(error.message);
        }
    }

    async fetchParticularCategory(req, res){
        const {id} = req.params;
        try{
            const response = await Category.findOne({_id: id});
            console.log(response);
            return res.status(200).json({category: response});
        }catch(error){
            console.log(error.message);
        }
    }

    async updateCategory(req, res){
        const {id} = req.params;
        const errors = validationResult(req);
        if(errors.isEmpty()){
            const {name} = req.body;
            try{
                const exist = await Category.findOne({name});
                if(!exist){
                    await Category.updateOne({_id: id}, {$set: {name}}, {new: true});
                    return res.status(201).json({message: 'Your category has updated'})
                }else{
                    return res.status(400).json({ errors: [{msg: `${name} category is already taken`}] }); 
                }
            }catch(err){
                console.log(err.message);
                return res.status(500).json("server error...!!!");
            }
        }else{
            return res.status(400).json({ errors: errors.array() });
        }
    }

    async deleteCategory(req, res){
        const {id} = req.params;
        try{
            await Category.deleteOne({_id: id});
            return res.status(200).json({message: 'Category has deleted successfully!'})
        }catch(error){
            console.log(err.message);
            return res.status(500).json("server error...!!!");
        }
    }

    async getAllCategories(req, res){
        try{
            const categories = await Category.find({});
            return res.status(200).json({categories})
        }catch(error){
            console.log(err.message);
            return res.status(500).json("server error...!!!");
        }
    }
}

module.exports = new CategoryController;