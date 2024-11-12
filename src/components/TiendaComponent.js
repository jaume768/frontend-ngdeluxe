import React from "react";
import "./css/TiendaComponent.css";

const TiendaComponent = () => {
    return (
        <div className="tumbler-card">
          <div className="tumbler-content">
            <img
              src="/assets/main.jpeg" // Reemplaza con tu logo
              alt="Logo"
              className="tumbler-logo"
            />
            <div className="tumbler-text">
              <div className="tumbler-title">
                <span>NG DELUXE</span>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default TiendaComponent;