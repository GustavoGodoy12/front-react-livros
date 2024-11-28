// componentes/AdicionarLivro/index.js

import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { BooksContext } from '../../context/BooksContext';
import { AuthContext } from '../../context/AuthContext'; // Importar AuthContext
import { useNavigate } from 'react-router-dom';

const AdicionarLivroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f5f5f5;
    min-height: 80vh;
`;

const Form = styled.form`
    background-color: #FFF;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 100%;
`;

const Titulo = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #002F52;
`;

const Campo = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #CCC;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
`;

const BotaoCadastrar = styled.button`
    width: 100%;
    background-color: #EB9B00;
    color: white;
    padding: 14px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background-color: #d88e00;
    }
`;

const Mensagem = styled.p`
    text-align: center;
    font-size: 18px;
    color: ${props => props.error ? 'red' : 'green'};
    margin-top: 20px;
`;

function AdicionarLivro() {
    const { addBook } = useContext(BooksContext);
    const { isAuthenticated } = useContext(AuthContext); // Verificar autenticação
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: 100 
    });
    const [mensagem, setMensagem] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nome, descricao, preco, estoque } = form;

        if (nome && descricao && preco && estoque) {
            try {
                await addBook({
                    nome,
                    descricao,
                    preco: parseFloat(preco),
                    estoque: parseInt(estoque)
                });
                setMensagem('Livro adicionado com sucesso!');
                setError(false);
                setForm({
                    nome: '',
                    descricao: '',
                    preco: '',
                    estoque: 100
                });
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } catch (error) {
                setMensagem('Erro ao adicionar livro.');
                setError(true);
                console.error(error);
            }
        } else {
            setMensagem('Por favor, preencha todos os campos.');
            setError(true);
        }
    };

    if (!isAuthenticated) {
        return (
            <AdicionarLivroContainer>
                <Mensagem error={true}>Você precisa estar logado para adicionar um livro.</Mensagem>
            </AdicionarLivroContainer>
        );
    }

    return (
        <AdicionarLivroContainer>
            <Form onSubmit={handleSubmit}>
                <Titulo>Adicionar Novo Livro</Titulo>
                <Campo>
                    <Label>Nome do Livro</Label>
                    <Input
                        type="text"
                        name="nome"
                        value={form.nome}
                        onChange={handleChange}
                        placeholder="Ex: JavaScript Avançado"
                        required
                    />
                </Campo>
                <Campo>
                    <Label>Descrição</Label>
                    <Input
                        type="text"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        placeholder="Descrição do livro"
                        required
                    />
                </Campo>
                <Campo>
                    <Label>Preço (R$)</Label>
                    <Input
                        type="number"
                        name="preco"
                        value={form.preco}
                        onChange={handleChange}
                        placeholder="29.99"
                        step="0.01"
                        required
                    />
                </Campo>
                <Campo>
                    <Label>Estoque</Label>
                    <Input
                        type="number"
                        name="estoque"
                        value={form.estoque}
                        onChange={handleChange}
                        placeholder="100"
                        required
                    />
                </Campo>
                <BotaoCadastrar type="submit">Adicionar Livro</BotaoCadastrar>
                {mensagem && <Mensagem error={error}>{mensagem}</Mensagem>}
            </Form>
        </AdicionarLivroContainer>
    );
}

export default AdicionarLivro;
