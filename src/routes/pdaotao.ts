import { Router } from "express";
import * as pdaotao from "@controllers/pdaotao";
const router: Router = Router();

router.get("/scraping/examlist", pdaotao.examList);
router.get("/scraping/examlist/:examId", pdaotao.getExamDownloadLink);

export default router;
