import "./styles.css";
import { useState } from "react";
import Api from "../../Api";
import { useAuth } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState('');

    async function handleLogin() {
        setLoginErrorMessage('');
        if (!username || !password) {
            setLoginErrorMessage("Preencha os campos para fazer login!");
            return;
        }

        setLoading(true);
        var result = await Api.Login(username, password);
        if (!result) {
            setLoginErrorMessage("Usuário ou senha inválidos!");
            setLoading(false);
            return;
        }

        setAuth(result.token);
        setLoading(false);
        navigate("/home");
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-logo">
                    <div className="login-logo-img">
                        <img src="favicon.png" alt="" />
                    </div>
                </div>
                <div className="login-logo-info">
                    <div>
                        <h1>NuveLu</h1>
                        <span>GOAL ANALYSIS</span>
                    </div>
                </div>
                <div className="login-form">
                    <input
                        type="email"
                        placeholder="Preencha seu nome de usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Preencha sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>{loginErrorMessage}</span>
                    <button onClick={() => handleLogin()} disabled={loading}>
                        {loading ? "Carregando..." : "Entrar"}
                    </button>
                </div>
            </div>
        </div>
    );
}