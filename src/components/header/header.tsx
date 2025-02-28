import { useState } from "react";
import "./styles.css"

export default function Header() {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <header>
            {menuActive &&
                <div className="block-touch" onClick={() => setMenuActive(false)}></div>
            }
            <div className="top-header">
                <button onClick={() => setMenuActive(true)}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h1>NovelU | Minha Meta</h1>
            </div>
            <div className={`menu${menuActive ? " active" : ""}`}>
                <div className="menu-content">
                    <div className="user-info">
                        <div className="user-details">
                            <div className="user-cover">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-cover" />
                            </div>
                            <div className="user-name">
                                <h2>Fulano Silva</h2>
                                <span>Metas 2025</span>
                            </div>
                        </div>
                        <div className="back-button">
                            <button onClick={() => setMenuActive(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                    </div>
                    <div className="menu-options">
                        <ul>
                            <li>
                                <button onClick={() => setMenuActive(false)}>
                                    <span className="material-symbols-outlined">home</span>
                                    Início
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setMenuActive(false)}>
                                    <span className="material-symbols-outlined">ads_click</span>
                                    Ajustar Meta
                                </button>
                            </li>
                            <li>
                                <button onClick={() => setMenuActive(false)}>
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                    Lançamento
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span className="material-symbols-outlined">notifications</span>
                                    Notificações
                                </button>
                            </li>
                            <li>
                                <button>
                                    <span className="material-symbols-outlined">manufacturing</span>
                                    Configurações
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="menu-logout">
                        <button onClick={() => setMenuActive(false)}>
                            <span className="material-symbols-outlined">logout</span>
                            Sair
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}