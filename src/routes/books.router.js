import { Router } from "express";
import { getBooks, getBook, postBook } from "../controllers/books.controller.js";


const router = Router();

router.get("/", getBooks);
router.get("/:id", getBooks);

router.post("/", postBook);

export default router;