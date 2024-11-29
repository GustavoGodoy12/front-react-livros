import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; 

const Opcao = styled.li`
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    padding: 0 5px;
    cursor: pointer;
    min-width: 120px;
`

const Opcoes = styled.ul`
    display: flex;
`

const textoOpcoes = ['FORNECEDORES', 'FAVORITOS', 'MINHA ESTANTE']

function OpcoesHeader() {
    return (
        <Opcoes>
            {textoOpcoes.map((texto) => (
                <Opcao key={texto}>
                    {texto === 'FORNECEDORES' ? (
                        <Link to="/fornecedores" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>{texto}</p>
                        </Link>
                    ) : (
                        <p>{texto}</p>
                    )}
                </Opcao>
            ))}
        </Opcoes>
    )
}

export default OpcoesHeader
