import "./styles.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import { User } from "../../types";
import Api from "../../Api";

export default function Preload() {
    const navigate = useNavigate();
    const { setAuth, getToken } = useAuth();
    const [loginChecked, setLoginChecked] = useState(false);

    async function handleAuthUser() {
        const token = await getToken();
        if (!token) {
            setAuth(null);
            setLoginChecked(true);
            navigate("/login", { replace: true });
            return;
        }

        // here is just an example, if the token was a JWT, it cold be just sent to the refresh endpoint to get a newer one
        let username = token.split("%%")[0];
        let password = token.split("%%")[1];

        const result: User = await Api.Login(username, password);
        if (!result) {
            setAuth(null);
            setLoginChecked(true);
            navigate("/login", { replace: true });
            return;
        }

        setAuth(result);
        setLoginChecked(true);
        navigate("/home", { replace: true });
    }

    useEffect(() => {
        handleAuthUser();
    }, []);

    if (!loginChecked) {
        return (
            <div className="preload-container">
                <div className="preload-content">
                    <div className="logo">
                        <div className="logo-img">
                            <img src="favicon.png" alt="" />
                        </div>
                    </div>
                    <div className="logo-info">
                        <div>
                            <h1>NuveLu</h1>
                            <span>GOAL ANALYSIS</span>
                        </div>
                    </div>
                    <div className="preload-loading">
                        <div className="preload-spinner"></div>
                    </div>
                </div>
            </div>
        )
    }

    return <Outlet />;
}