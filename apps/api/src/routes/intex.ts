import { Router } from "express";

const router = Router();

router.get("/transaction", (req,res)=>(
    res.json({
        message: "well done"
    })
))

export default router