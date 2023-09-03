import { Router } from "express";

const staticRouter = Router();

staticRouter.get('/test', (req,res)=> {
  res.send('test')
})

export default staticRouter;