import React, { useEffect, useState } from 'react';
import api from '../api';

const TesteComponente = () => {
    const [mensagem, setMensagem] = useState('');

    useEffect(() => {
        const fetchTeste = async () => {
            try {
                const response = await api.get('/teste');
                setMensagem(response.data);
            } catch (error) {
                console.error('Erro ao testar comunicação:', error);
            }
        };
        fetchTeste();
    }, []);

    return (
        <div>
            <h1>Teste de Comunicação</h1>
            <p>{mensagem}</p>
        </div>
    );
};

export default TesteComponente;
