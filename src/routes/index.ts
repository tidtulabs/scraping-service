import { Router } from "express";
import pdaotao from "./pdaotao";
const router: Router = Router();

router.use("/pdaotao", pdaotao);

export default router;
