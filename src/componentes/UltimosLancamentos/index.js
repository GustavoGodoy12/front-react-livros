import React, { useContext } from 'react';
import { BooksContext } from '../../context/BooksContext';
import { Titulo } from '../Titulo';
import styled from 'styled-components';
import { CartContext } from '../../context/CartContext';

const UltimosLancamentosContainer = styled.section`
    background-color: #EBECEE;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NovosLivrosContainer = styled.div`
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
`;

const LivroCard = styled.div`
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 200px;
`;

const LivroNome = styled.p`
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
`;

const LivroDescricao = styled.p`
    font-size: 14px;
    text-align: center;
    margin-bottom: 10px;
`;

const LivroPreco = styled.p`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Botao = styled.button`
    background-color: ${props => props.remover ? '#FF4C4C' : '#EB9B00'};
    color: #FFF;
    padding: 10px 20px;
    font-size: 14px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px 0;
    width: 100%;

    &:hover {
        background-color: ${props => props.remover ? '#d83a3a' : '#d88e00'};
    }
`;

function UltimosLancamentos() {
    const { books } = useContext(BooksContext);
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

    return (
        <UltimosLancamentosContainer>
            <Titulo
                cor="#EB9B00"
                tamanhoFonte="36px"
            >
                ÚLTIMOS LANÇAMENTOS
            </Titulo>
            <NovosLivrosContainer>
                {books.map(livro => (
                    <LivroCard key={livro.id}>
                        <LivroNome>{livro.nome}</LivroNome>
                        <LivroDescricao>{livro.descricao}</LivroDescricao>
                        <LivroPreco>
                            R$ {livro.preco ? livro.preco.toFixed(2) : 'Preço indisponível'}
                        </LivroPreco>
                        {!cartItems.find(item => item.id === livro.id) ? (
                            <Botao onClick={() => addToCart(livro)}>Adicionar ao Carrinho</Botao>
                        ) : (
                            <Botao remover onClick={() => removeFromCart(livro.id)}>
                                Remover do Carrinho
                            </Botao>
                        )}
                    </LivroCard>
                ))}
            </NovosLivrosContainer>
        </UltimosLancamentosContainer>
    );
}

export default UltimosLancamentos;
