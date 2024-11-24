import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [userId] = useState(1);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await api.get(`/cart/${userId}`);
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
    }, [userId]);

    const addToCart = async (livro) => {
        try {
            const response = await api.post('/cart/add', {
                userId,
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
            const response = await api.delete(`/cart/remove/${livroId}`, {
                data: { userId }
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
