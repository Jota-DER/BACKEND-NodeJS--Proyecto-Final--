import { listBooks, findBook } from "../services/books.service.js";


export const getBooks = async (req, res) => {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

export const getBook = async (req, res) => {
    try {
        const book = await findBook(req.params.id);

        if (!book) {
            return res.status(404).json({
                error: "Libro no encontrado",
            });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el libro" });
    }
};
