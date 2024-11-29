import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './componentes/Header';
import Pesquisa from './componentes/Pesquisa';
import UltimosLancamentos from './componentes/UltimosLancamentos';
import Carrinho from './componentes/Carrinho';
import AdicionarLivro from './componentes/AdicionarLivro';
import Auth from './componentes/Auth/Auth'; 
import Fornecedores from './componentes/Fornecedores/Fornecedores.js';
import TesteComponente from './componentes/TesteComponente'; 
import { CartProvider } from './context/CartContext';
import { BooksProvider } from './context/BooksContext';
import EditarLivro from './componentes/EditarLivro.js';
import { AuthProvider, AuthContext } from './context/AuthContext';
import styled from 'styled-components';
import { useContext } from 'react';

const AppContainer = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-image: linear-gradient(90deg,#002F52 35%,#326589 165%);
`;

// Componente para Proteger Rotas Privadas
const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/cadastro" />;
};

function App() {
  return (
    <Router>
      <AuthProvider> {/* passar no auth tudo */}
        <BooksProvider>
          <CartProvider>
            <AppContainer>
              <Header />
              <Routes>
                <Route path="/" element={<><Pesquisa /><UltimosLancamentos /></>} />
                <Route path="/cadastro" element={<Auth />} />
                
                <Route path="/carrinho" element={<Carrinho />} />
                {/* addbook */}
                <Route path="/adicionar-livro" element={
                  <PrivateRoute>
                    <AdicionarLivro />
                  </PrivateRoute>
                } />
                <Route path="/teste" element={<TesteComponente />} />
                {/* editbook */}
                <Route path="/editar-livro/:id" element={
                  <PrivateRoute>
                    <EditarLivro />
                  </PrivateRoute>
                } />
                <Route path="/fornecedores" element={<Fornecedores />} />
              </Routes>
            </AppContainer>
          </CartProvider>
        </BooksProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
