import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import { Cesta } from "./componentes/Cesta";
import { Home } from "./componentes/Home";
import { Productos } from "./componentes/Productos";
import { Producto } from "./componentes/Producto";

const queryClient = new QueryClient();
export const Context = createContext(null);

function App() {
    const [estado, setEstado] = useState({
        cesta: []
    });

    return (
        <Context.Provider value={[estado, setEstado]}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />}>
                            <Route index element={<Productos />} />
                            <Route path="*" element={<Productos />} />
                            <Route path="productos" element={<Productos />} />
                            <Route path="productos/:id" element={<Producto />} />
                            <Route path="cesta" element={<Cesta />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </Context.Provider>
    );
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
