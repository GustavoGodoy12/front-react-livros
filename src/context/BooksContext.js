import React, { createContext, useState, useEffect } from 'react';
import api from '../api'; 

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await api.get('/products');
            const booksWithNumericPrice = response.data.map(book => ({
                ...book,
                preco: parseFloat(book.preco)
            }));
            console.log('Livros recebidos:', booksWithNumericPrice);
            setBooks(booksWithNumericPrice);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
            setError(error);
            setLoading(false);
        }
    };

    const addBook = async (novoLivro) => {
        try {
            const livroToAdd = {
                ...novoLivro,
                preco: parseFloat(novoLivro.preco)
            };
            const response = await api.post('/products', livroToAdd);
            setBooks([...books, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            throw error; 
        }
    };

    const deleteBook = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            setBooks(books.filter(book => book.id !== id));
        } catch (error) {
            console.error('Erro ao deletar livro:', error);
            throw error; 
        }
    };

    const updateBook = async (updatedBook) => {
        try {
            const response = await api.put(`/products/${updatedBook.id}`, updatedBook);
            setBooks(books.map(book => book.id === updatedBook.id ? response.data : book));
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            throw error; 
        }
    };

    return (
        <BooksContext.Provider value={{ books, loading, error, addBook, fetchBooks, deleteBook, updateBook }}>
            {children}
        </BooksContext.Provider>
    );
};
