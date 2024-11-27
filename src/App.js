import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './componentes/Header';
import Pesquisa from './componentes/Pesquisa';
import UltimosLancamentos from './componentes/UltimosLancamentos';
import Carrinho from './componentes/Carrinho';
import AdicionarLivro from './componentes/AdicionarLivro';
import Auth from './componentes/Auth/Auth'; 
import TesteComponente from './componentes/TesteComponente'; 
import { CartProvider } from './context/CartContext';
import { BooksProvider } from './context/BooksContext';
import EditarLivro from './componentes/EditarLivro.js';
import styled from 'styled-components';

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`;

function App() {
  return (
    <Router>
      <BooksProvider>
        <CartProvider>
          <AppContainer>
            <Header />
            <Routes>
              <Route path="/" element={<><Pesquisa /><UltimosLancamentos /></>} />
              <Route path="/cadastro" element={<Auth />} /> {}
              <Route path="/carrinho" element={<Carrinho />} />
              <Route path="/adicionar-livro" element={<AdicionarLivro />} />
              <Route path="/teste" element={<TesteComponente />} /> {}
              <Route path="/editar-livro/:id" element={<EditarLivro />} />
            </Routes>
          </AppContainer>
        </CartProvider>
      </BooksProvider>
    </Router>
  );
}

export default App;