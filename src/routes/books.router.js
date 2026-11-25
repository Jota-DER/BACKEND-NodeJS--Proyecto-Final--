import { Router } from "express";
import { getBooks, getBook, postBook, removeBookById } from "../controllers/books.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/", getBooks);
router.get("/:id", getBook);

router.post("/", verifyToken, postBook);

router.delete("/:id", verifyToken, removeBookById);

export default router;