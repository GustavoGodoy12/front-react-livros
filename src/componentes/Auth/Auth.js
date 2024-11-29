import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width: 400px;
  margin: 50px auto;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background-color: ${(props) => (props.active ? '#326589' : '#f0f0f0')};
  color: ${(props) => (props.active ? '#ffffff' : '#000000')};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #326589;
  color: #ffffff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
`;

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
  text-align: center;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setMessage('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      if (isLogin) {
        const response = await api.post('/users/login', {
          email: formData.email,
          password: formData.password
        });
        setMessage('Login bem-sucedido!');
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        const response = await api.post('/users/register', {
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setMessage('Cadastro bem-sucedido! Faça login.');
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Erro na autenticação:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Ocorreu um erro. Tente novamente.');
      }
    }
  };

  return (
    <Container>
      <ToggleContainer>
        <ToggleButton active={isLogin} onClick={handleToggle}>
          Login
        </ToggleButton>
        <ToggleButton active={!isLogin} onClick={handleToggle}>
          Cadastro
        </ToggleButton>
      </ToggleContainer>
      <Form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Senha"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit">
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </SubmitButton>
      </Form>
      {message && <Message error={message.toLowerCase().includes('erro')}>{message}</Message>}
    </Container>
  );
};

export default Auth;
