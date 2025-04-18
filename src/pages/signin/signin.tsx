import "./styles.css";
import { useState } from "react";
import Api from "../../Api";
import { useAuth } from "../../contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DEFAULT_USER_COVER } from "../../constanst";
import { SigninRequest } from "../../types";

export default function SignIn() {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [signInErrorMessage, setSignInErrorMessage] = useState('');

    async function handleSignIn() {
        setSignInErrorMessage('');
        if (!name || !username || !password) {
            setSignInErrorMessage("Preencha os campos para fazer o cadastro!");
            return;
        }

        setLoading(true);
        var data = { 
            name: name, 
            username: username, 
            password: password, 
            cover: DEFAULT_USER_COVER
        } as SigninRequest;
        var result = await Api.Signin(data);
        if (!result) {
            setSignInErrorMessage("Não foi possível criar um usuário, verifique suas informações e tente novamente!");
            setLoading(false);
            return;
        }

        setLoading(false);
        await Swal.fire({
            title: "Cadastro realizado com sucesso!",
            icon: "success",
            draggable: true
        });
        navigate("/login", { replace: true });
    }

    return (
        <div className="signin-container">
            <div className="signin-content">
                <div className="signin-logo">
                    <div className="signin-logo-img">
                        <img src="favicon.png" alt="" />
                    </div>
                </div>
                <div className="signin-logo-info">
                    <div>
                        <h1>NuveLu</h1>
                        <span>GOAL ANALYSIS</span>
                    </div>
                </div>
                <div className="signin-form">
                    <input
                        type="name"
                        placeholder="Preencha seu Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Preencha seu usuário"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Preencha sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span>{signInErrorMessage}</span>
                    <div className="form-bottom">
                        <span className="signin-redirector">
                            Já possui um cadastro?
                            <Link to="/login"> Faça seu login.</Link>
                        </span>
                        <button onClick={() => handleSignIn()} disabled={loading}>
                            {loading ? "Carregando..." : "Enviar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}