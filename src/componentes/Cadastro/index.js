import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const CadastroContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    background-color: #f5f5f5;
`;

const Form = styled.form`
    background-color: #FFF;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 10px 0;
    border: 1px solid #CCC;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
`;

const BotaoCadastrar = styled.button`
    width: 100%;
    background-color: #EB9B00;
    color: white;
    padding: 14px 20px;
    margin-top: 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;

    &:hover {
        background-color: #d88e00;
    }
`;

const TituloCadastro = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #002F52;
`;

const Mensagem = styled.p`
    text-align: center;
    font-size: 18px;
    color: ${props => props.error ? 'red' : 'green'};
    margin-top: 20px;
`;

function Cadastro() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: ''
    });
    const [mensagem, setMensagem] = useState('');
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email } = form;

        if (name && email) {
            try {
                const response = await api.post('/users', {
                    name,
                    email
                });
                if (response.status === 201) {
                    setMensagem('Cadastro realizado com sucesso!');
                    setError(false);
                    setForm({
                        name: '',
                        email: ''
                    });
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            } catch (error) {
                console.error('Erro ao cadastrar usuário:', error);
                setMensagem('Erro ao cadastrar usuário.');
                setError(true);
            }
        } else {
            setMensagem('Por favor, preencha todos os campos.');
            setError(true);
        }
    };

    return (
        <CadastroContainer>
            <Form onSubmit={handleSubmit}>
                <TituloCadastro>Cadastro</TituloCadastro>
                <Input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                />
                <Input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <BotaoCadastrar type="submit">Cadastrar</BotaoCadastrar>
                {mensagem && <Mensagem error={error}>{mensagem}</Mensagem>}
            </Form>
        </CadastroContainer>
    );
}

export default Cadastro;
