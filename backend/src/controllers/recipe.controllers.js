const RecipeModel = require('../models/Recipe.model');


exports.createRecipe = asyncHandler(async (req, res) => {

    const { name, ingredients, instructions, imageUrl, cookingTime } = req.body;

    const recipe = await RecipeModel({
        name,
        ingredients,
        instructions,
        imageUrl,
        cookingTime,
        userOwner
    });

    const createdRecipe = recipe.create();

    if (!createdRecipe) {
        throw new Error("Failed to create recipe");
    } else {
        res.status(201).json({
            success: true,
            message: "Recipe created successfully",
            createdRecipe
        });
    }



});

exports.getRecipes = asyncHandler(async (req, res) => { });

exports.getRecipe = asyncHandler(async (req, res) => { });

exports.updateRecipe = asyncHandler(async (req, res) => { });

exports.deleteRecipe = asyncHandler(async (req, res) => { })

exports.saveRecipe = asyncHandler(async (req, res) => { });

exports.getSavedRecipes = asyncHandler(async (req, res) => { });
