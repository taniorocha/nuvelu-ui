import "./styles.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";
import Api from "../../Api";
import { useTheme } from "../../contexts/theme-context";

export default function Preload() {
    const navigate = useNavigate();
    const { setAuth, getToken } = useAuth();
    const { getTheme } = useTheme();
    const [loginChecked, setLoginChecked] = useState(false);

    useEffect(() => {
        handleStartApplication();
    }, []);

    async function handleStartApplication() {
        await handleThemeColor();
        await handleAuthUser();
    }

    async function handleThemeColor() {
        var root: any = document.querySelector(':root');
        
        const theme = getTheme();
        if (theme === 'dark') {
            root.style.setProperty('--background', '#202d36');
            root.style.setProperty('--text-color', '#e7e7e7');
            root.style.setProperty('--header-background', '#213441');
            root.style.setProperty('--header-text-color', '#616161');
            root.style.setProperty('--card-background', '#213441');
            root.style.setProperty('--knob-text-color', '#e7e7e7');
    
            return;
        }

        root.style.setProperty('--background', '#fff');
        root.style.setProperty('--text-color', '#616161');
        root.style.setProperty('--header-background', '#fff');
        root.style.setProperty('--header-text-color', '#616161');
        root.style.setProperty('--card-background', '#fff');
        root.style.setProperty('--knob-text-color', '#575757');
    }

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