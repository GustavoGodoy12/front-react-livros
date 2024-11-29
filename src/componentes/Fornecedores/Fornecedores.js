import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import api from '../../api';

const FornecedoresContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    background-color: #f5f5f5;
    min-height: 80vh;
`;

const FormContainer = styled.div`
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin-bottom: 40px;
`;

const Titulo = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #002F52;
`;

const Campo = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px 15px;
    border: 1px solid #CCC;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
`;

const Botao = styled.button`
    width: 100%;
    background-color: #326589;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    margin-top: 10px;

    &:hover {
        background-color: #274e6d;
    }
`;

const Mensagem = styled.p`
    text-align: center;
    font-size: 16px;
    color: ${props => props.error ? 'red' : 'green'};
    margin-top: 10px;
`;

const ListaFornecedores = styled.div`
    width: 100%;
    max-width: 600px;
`;

const FornecedorCard = styled.div`
    background-color: #FFF;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
`;

const FornecedorNome = styled.h3`
    margin: 0 0 5px 0;
    color: #002F52;
`;

const FornecedorEmail = styled.p`
    margin: 0;
    color: #555;
`;

function Fornecedores() {
    const [isRegister, setIsRegister] = useState(true);
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [mensagem, setMensagem] = useState('');
    const [error, setError] = useState(false);
    const [fornecedores, setFornecedores] = useState([]);

    useEffect(() => {
        fetchFornecedores();
    }, []);

    const fetchFornecedores = async () => {
        try {
            const response = await api.get('/fornecedores');
            setFornecedores(response.data);
        } catch (err) {
            console.error('Erro ao buscar fornecedores:', err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = form;

        if (isRegister) {
            // Cadastro
            if (name && email && password) {
                try {
                    await api.post('/fornecedores/register', { name, email, password }); 
                    setMensagem('Cadastro realizado com sucesso!');
                    setError(false);
                    setForm({ name: '', email: '', password: '' });
                    fetchFornecedores();
                } catch (err) {
                    setMensagem(err.response?.data?.message || 'Erro no cadastro.');
                    setError(true);
                }
            } else {
                setMensagem('Por favor, preencha todos os campos.');
                setError(true);
            }
        } else {
            // Login
            if (email && password) {
                try {
                    const res = await api.post('/fornecedores/login', { email, password });
                    localStorage.setItem('fornecedoresToken', res.data.token);
                    setMensagem('Login realizado com sucesso!');
                    setError(false);
                    setForm({ name: '', email: '', password: '' });
                } catch (err) {
                    setMensagem(err.response?.data?.message || 'Erro no login.');
                    setError(true);
                }
            } else {
                setMensagem('Por favor, preencha todos os campos.');
                setError(true);
            }
        }
    };

    return (
        <FornecedoresContainer>
            <FormContainer>
                <Titulo>{isRegister ? 'Cadastro de Fornecedor' : 'Login de Fornecedor'}</Titulo>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <Campo>
                            <Label>Nome</Label>
                            <Input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nome do Fornecedor"
                                required
                            />
                        </Campo>
                    )}
                    <Campo>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="email@exemplo.com"
                            required
                        />
                    </Campo>
                    <Campo>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Senha"
                            required
                        />
                    </Campo>
                    <Botao type="submit">{isRegister ? 'Cadastrar' : 'Login'}</Botao>
                </form>
                <Botao onClick={() => { setIsRegister(!isRegister); setMensagem(''); }}>
                    {isRegister ? 'Já tem uma conta? Faça Login' : 'Não tem uma conta? Cadastre-se'}
                </Botao>
                {mensagem && <Mensagem error={error}>{mensagem}</Mensagem>}
            </FormContainer>

            <ListaFornecedores>
                <Titulo>Fornecedores Cadastrados</Titulo>
                {fornecedores.map(fornecedor => (
                    <FornecedorCard key={fornecedor.id}>
                        <FornecedorNome>{fornecedor.name}</FornecedorNome>
                        <FornecedorEmail>{fornecedor.email}</FornecedorEmail>
                    </FornecedorCard>
                ))}
            </ListaFornecedores>
        </FornecedoresContainer>
    );
}

export default Fornecedores;
