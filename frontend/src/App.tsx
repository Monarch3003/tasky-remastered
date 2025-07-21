import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import LoginPage from './pages/Login';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
