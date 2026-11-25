import express from "express";
import cors from "cors";

import booksRouter from "./src/routes/books.router.js";

const app = express();

app.use(cors());
app.use(express.json()); // Body-parser


app.get("/", (req, res) => {
  res.json({ message: "API de libros funcionando" });   
});

app.use("/api/books", booksRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});