import express from "express";
import Post from "../Model/Post.js";

export const generatepost = (req,res)=>{
    const {imageURL,descripition} = req.body;

    try {
        let result =req.user.createPost({imageURL,descripition});
        res.status(200).json({message:"Post added Successfully"})
    }
    catch (error){
        res.status(500).send("Some Error occured!!")
    }
}