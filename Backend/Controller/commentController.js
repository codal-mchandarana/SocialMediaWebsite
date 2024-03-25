import Post from "../Model/Post.js";

export const postComment = async(req,res)=>{
    const {postId,data} = req.body;

    let comment;

    try{
        const currentPost = await Post.findOne({where:{id:postId}});

        const result = await currentPost.createComment({data});
        comment = result;

        if(!result)
            throw  new Error();

    }catch (error){
        res.status(500).json({msg:"Some Error occured !!"});
    }

    try {
        let result = await req.user.addComment(comment);

        if(!result)
            throw  new Error();

    }catch (error){
        res.status(500).json({msg:"Some Error occured !!"});
    }

    res.status(200).json({msg:"Comment added Successfully !!"});

}