import { listBooks, findBook, addBook, removeBook } from "../services/books.service.js";


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

export const postBook = async (req, res) => {
  try {
    const { title, price } = req.body ?? {};

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof price !== "number" ||
      price <= 0
    ) {
      return res.status(400).json({
        error: "Título y precio válidos son obligatorios",
      });
    }

const book = await addBook({ title, price });

res.status(201).json(book);
} catch (error) {
    console.error(error);
    res.status(500).json({ 
        error: "Error al crear   el libro" ,
    });
}
};
export const removeBookById = async (req, res) => {
  try {
    const book = await removeBook(req.params.id);

    if (!book) {
      return res.status(404).json({
        error: "Libro no encontrado",
      });
    }

    res.json({
      message: "Libro eliminado",
      book,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al eliminar libro",
    });
  }
};
