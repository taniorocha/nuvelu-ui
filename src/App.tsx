import './App.css';
import './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Chart as ChartJS, registerables } from 'chart.js';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Preload from './pages/preload/preload';
import { AuthProvider } from './contexts/auth-context';
ChartJS.register(...registerables);

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Preload />}>
                        <Route path="login" element={<Login />} />
                        <Route path="home" element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}