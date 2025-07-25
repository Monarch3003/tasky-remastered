import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import { ToastContainer } from 'react-toastify';
import Header from './components/PublicHeader';
import Home from './pages/Home';
import Register from './pages/Register';
import LoginPage from './pages/Login';
import TasksPage from "./pages/TasksPage";
import CreateTaskPage from "./pages/CreateTaskspage";
import { Footer } from './components/Footer'; 


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
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/tasks/create-task" element={<CreateTaskPage />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
