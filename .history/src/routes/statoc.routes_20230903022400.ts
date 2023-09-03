import { Router } from "express";

const staticRouter = Router();

staticRouter.get('/static', (req,res)=> {
  res.send('test')
})

export default staticRouter;