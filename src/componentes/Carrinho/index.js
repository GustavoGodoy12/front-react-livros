// componentes/Carrinho/index.js

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { CartContext } from '../../context/CartContext';
import api from '../../api';

const CarrinhoContainer = styled.div`
    padding: 40px;
    background-color: #f5f5f5;
    min-height: 80vh;
`;

const TituloCarrinho = styled.h2`
    color: #EB9B00;
    font-size: 36px;
    text-align: center;
    margin-bottom: 20px;
`;

const ListaCarrinho = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: 30px;
`;

const ItemCarrinho = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #FFF;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
`;

const NomeLivro = styled.p`
    font-size: 18px;
    margin: 0;
`;

const BotaoRemover = styled.button`
    background-color: #FF4C4C;
    color: #FFF;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #d83a3a;
    }
`;

const Total = styled.div`
    text-align: right;
    font-size: 20px;
    margin-bottom: 30px;
`;

const FormPagamento = styled.form`
    background-color: #FFF;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
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
    padding: 10px;
    border: 1px solid #CCC;
    border-radius: 5px;
    box-sizing: border-box;
`;

const BotaoPagamento = styled.button`
    width: 100%;
    background-color: #EB9B00;
    color: #FFF;
    padding: 12px;
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
    color: green;
    margin-top: 20px;
`;

function Carrinho() {
    const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
    const [metodoPagamento, setMetodoPagamento] = useState('credit-card');
    const [form, setForm] = useState({
        numeroCartao: '',
        cvv: '',
        dataValidade: '',
        pix: ''
    });
    const [mensagem, setMensagem] = useState('');

    const valorTotal = cartItems.reduce((acc, item) => acc + item.total, 0);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (metodoPagamento === 'credit-card') {
                const { numeroCartao, cvv, dataValidade } = form;
                if (!numeroCartao || !cvv || !dataValidade) {
                    setMensagem('Por favor, preencha todos os campos do cartão.');
                    return;
                }
                const response = await api.post('/payment/credit-card', {
                    valorTotal,
                    numeroCartao,
                    cvv,
                    dataValidade
                });
                if (response.status === 201) {
                    setMensagem('Pagamento com cartão de crédito realizado com sucesso!');
                    clearCart();
                }
            } else if (metodoPagamento === 'pix') {
                const { pix } = form;
                if (!pix) {
                    setMensagem('Por favor, insira o código PIX.');
                    return;
                }
                const response = await api.post('/payment/pix', {
                    valorTotal,
                    pix
                });
                if (response.status === 201) {
                    setMensagem('Pagamento via PIX realizado com sucesso!');
                    clearCart();
                }
            }
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            setMensagem('Erro ao processar pagamento.');
        }
    };

    return (
        <CarrinhoContainer>
            <TituloCarrinho>Carrinho de Compras</TituloCarrinho>
            {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Seu carrinho está vazio.</p>
            ) : (
                <>
                    <ListaCarrinho>
                        {cartItems.map(item => (
                            <ItemCarrinho key={item.id}>
                                <NomeLivro>{item.nome}</NomeLivro>
                                <BotaoRemover onClick={() => removeFromCart(item.id)}>Remover</BotaoRemover>
                            </ItemCarrinho>
                        ))}
                    </ListaCarrinho>
                    <Total>Total: R$ {valorTotal.toFixed(2)}</Total>
                    <FormPagamento onSubmit={handleSubmit}>
                        <h3>Processar Pagamento</h3>
                        <Campo>
                            <Label>Escolha o Método de Pagamento</Label>
                            <select
                                value={metodoPagamento}
                                onChange={(e) => setMetodoPagamento(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #CCC' }}
                            >
                                <option value="credit-card">Cartão de Crédito</option>
                                <option value="pix">PIX</option>
                            </select>
                        </Campo>
                        {metodoPagamento === 'credit-card' && (
                            <>
                                <Campo>
                                    <Label>Número do Cartão</Label>
                                    <Input
                                        type="text"
                                        name="numeroCartao"
                                        value={form.numeroCartao}
                                        onChange={handleChange}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                    />
                                </Campo>
                                <Campo>
                                    <Label>CVV</Label>
                                    <Input
                                        type="text"
                                        name="cvv"
                                        value={form.cvv}
                                        onChange={handleChange}
                                        placeholder="123"
                                        required
                                    />
                                </Campo>
                                <Campo>
                                    <Label>Data de Validade</Label>
                                    <Input
                                        type="text"
                                        name="dataValidade"
                                        value={form.dataValidade}
                                        onChange={handleChange}
                                        placeholder="MM/AA"
                                        required
                                    />
                                </Campo>
                            </>
                        )}
                        {metodoPagamento === 'pix' && (
                            <Campo>
                                <Label>Código PIX</Label>
                                <Input
                                    type="text"
                                    name="pix"
                                    value={form.pix}
                                    onChange={handleChange}
                                    placeholder="Insira o código PIX"
                                    required
                                />
                            </Campo>
                        )}
                        <BotaoPagamento type="submit">Confirmar Pagamento</BotaoPagamento>
                        {mensagem && <Mensagem>{mensagem}</Mensagem>}
                    </FormPagamento>
                </>
            )}
        </CarrinhoContainer>
    );
}

export default Carrinho;
