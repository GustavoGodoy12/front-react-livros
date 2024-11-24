

import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);

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
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    const addBook = async (novoLivro) => {
        try {
           //para q seja numero
            const livroToAdd = {
                ...novoLivro,
                preco: parseFloat(novoLivro.preco)
            };
            const response = await api.post('/products', livroToAdd);
            setBooks([...books, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
        }
    };

    return (
        <BooksContext.Provider value={{ books, addBook, fetchBooks }}>
            {children}
        </BooksContext.Provider>
    );
};
