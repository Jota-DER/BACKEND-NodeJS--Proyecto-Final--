import { getAllBooks, getBookById } from "../models/books.model.js";

export const listBooks = async () => {
  return await getAllBooks();
};

export const findBook = async (id) => {
  return await getBookById(id);
};