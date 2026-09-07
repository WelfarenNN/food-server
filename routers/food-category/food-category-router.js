import express from "express";

const router = express.Router();

router.post("/create", async(request, response)=>{
    response.status(200).json({message: "food category post"})
});
router.delete("/delete", async(request, response)=>{
    response.status(200).json({message: "food category delete"})
});
router.put("/update", async(request, response)=>{
    response.status(200).json({message: "food category update"})
});
router.get("/get", async(request, response)=>{
    response.status(200).json({message: "food category get"})
});

export default router;
