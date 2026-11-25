import { listBooks } from "../services/books.service.js";

export const getBooks = async (req, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};
