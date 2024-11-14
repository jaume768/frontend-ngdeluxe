import React from "react";
import "./css/TiendaComponent.css";

const TiendaComponent = () => {
    return (
        <div className="tumbler-card">
            <div className="tumbler-content">
                <img
                    src="/assets/main.jpeg"
                    alt="Logo"
                    className="tumbler-logo"
                />
                <div className="tumbler-text">
                    <div className="tumbler-title">
                        <span>NG DELUXE</span>
                        <div className="social-icons">
                            <a href="https://www.instagram.com/ng.deluxe5/?igsh=bWx0Z2JmMGY4emZ1" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/assets/instagram.png"
                                    alt="Instagram"
                                    className="social-icon"
                                />
                            </a>
                            <a href="https://t.me/+I4e9wL19AAw5ZGRk" target="_blank" rel="noopener noreferrer">
                                <img
                                    src="/assets/telegram.png"
                                    alt="Telegram"
                                    className="social-icon"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TiendaComponent;