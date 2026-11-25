import { Router } from "express";
import { getBooks, getBook, postBook } from "../controllers/books.controller.js";


const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);

router.post("/", verifyToken, postBook);

export default router;