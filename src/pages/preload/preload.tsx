import "./styles.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
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

        const result = await Api.CheckToken(token);
        if (!result) {
            setAuth(null);
            setLoginChecked(true);
            navigate("/login", { replace: true });
            return;
        }
  
        setAuth(token);
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