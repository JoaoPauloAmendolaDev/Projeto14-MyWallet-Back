import { Router } from "express";
import { getExtract, postExtract } from "../controllers/extract.controller.js";
import { postSchemaValidation } from "../middlewares/postSchemaValidation.middleware.js";
import sessionTest from "../middlewares/session.middleware.js";

const router = Router();

router.use(sessionTest);
router.get("/extract", getExtract);
router.post("/extract", postSchemaValidation, postExtract);

export default router;
