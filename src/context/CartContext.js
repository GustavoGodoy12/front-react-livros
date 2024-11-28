// src/context/CartContext.js

import React, { createContext, useState, useEffect } from 'react';
import api from '../api';
import { jwtDecode } from 'jwt-decode'; // Importação atualizada

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserId(decoded.userId);
            } catch (error) {
                console.error('Erro ao decodificar token:', error);
                setUserId(null);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchCart = async () => {
                try {
                    const response = await api.get('/cart/view');
                    if (response.data && response.data.Products) {
                        const itensProcessados = response.data.Products.map(product => ({
                            id: product.id, 
                            nome: product.nome,
                            preco: product.preco,
                            descricao: product.descricao,
                            quantity: product.CartProduct.quantity,
                            total: product.CartProduct.total
                        }));
                        setCartItems(itensProcessados);
                    } else {
                        setCartItems([]);
                    }
                } catch (error) {
                    console.error('Erro ao buscar o carrinho:', error);
                }
            };

            fetchCart();
        }
    }, [userId]);

    const addToCart = async (livro) => {
        try {
            const response = await api.post('/cart/add', {
                productId: livro.id,
                quantity: 1
            });
            if (response.data && response.data.Products) {
                const itensProcessados = response.data.Products.map(product => ({
                    id: product.id, 
                    nome: product.nome,
                    preco: product.preco,
                    descricao: product.descricao,
                    quantity: product.CartProduct.quantity,
                    total: product.CartProduct.total
                }));
                setCartItems(itensProcessados);
            }
        } catch (error) {
            console.error('Erro ao adicionar ao carrinho:', error);
        }
    };

    const removeFromCart = async (livroId) => {
        try {
            const response = await api.delete(`/cart/remove/${livroId}`);
            if (response.data && response.data.Products) {
                const itensProcessados = response.data.Products.map(product => ({
                    id: product.id, 
                    nome: product.nome,
                    preco: product.preco,
                    descricao: product.descricao,
                    quantity: product.CartProduct.quantity,
                    total: product.CartProduct.total
                }));
                setCartItems(itensProcessados);
            }
        } catch (error) {
            console.error('Erro ao remover do carrinho:', error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
