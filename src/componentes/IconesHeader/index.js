import perfil from '../../imagens/perfil.svg';
import sacola from '../../imagens/sacola.svg';
import adicionar from '../../imagens/adicionar.svg'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const Icone = styled.li`
    margin-right: 40px;
    width: 25px;
    position: relative;
`;

const Icones = styled.ul`
    display: flex;
    align-items: center;
`;

const Badge = styled.span`
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: #FF4C4C;
    color: #FFF;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 12px;
`;

const IconeAuth = styled.li`
    margin-right: 40px;
    width: 25px;
`;

function IconesHeader() {
    const { cartItems } = useContext(CartContext);

    return (
        <Icones>
            <IconeAuth>
                <Link to="/cadastro">
                    <img src={perfil} alt="Perfil/Autenticação" />
                </Link>
            </IconeAuth>
            <Icone>
                <Link to="/carrinho">
                    <img src={sacola} alt="Carrinho" />
                    {cartItems.length > 0 && <Badge>{cartItems.length}</Badge>}
                </Link>
            </Icone>
            <Icone>
                <Link to="/adicionar-livro">
                    <img src={adicionar} alt="Adicionar Livro" />
                </Link>
            </Icone>
        </Icones>
    );
}

export default IconesHeader;