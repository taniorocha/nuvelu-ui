import './App.css';
import './logo.svg';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Chart as ChartJS, registerables } from 'chart.js';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Preload from './pages/preload/preload';
import { AuthProvider } from './contexts/auth-context';
import { ThemeProvider } from './contexts/theme-context';
import SignIn from './pages/signin/signin';
ChartJS.register(...registerables);

declare global {
    interface Window {
        JSConfetti?: any;
    }
}

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Preload />}>
                            <Route path="login" element={<Login />} />
                            <Route path="signin" element={<SignIn />} />
                            <Route path="home" element={<Home />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}