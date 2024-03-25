export const urlNotFound = (req,res,next)=>{
    res.status(404).send("Page Not found");
}