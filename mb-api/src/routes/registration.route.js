import { Router } from "express";
import { get, create } from "../controllers/registration.controller.js";
import { validateCreateUser } from '../validations/create-user.validation.js';
import { sanitizeBody } from "../middleware/sanitize-body.js";

const router = Router();

router.get("/", get);
  
router.post("/", sanitizeBody(['phone', 'cpf', 'cnpj']), validateCreateUser, create);

export default router;