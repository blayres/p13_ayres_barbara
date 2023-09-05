import Header from "../../components/Header/Header.js";
import "./Error.css";
import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error">
      <Header />

      <div className="error-texte">
        <p className="number">404</p>
        <p className="soustitre">
          Oups! La page que vous demandez n'existe pas.
        </p>
      </div>

      <div className="retourne">
        <Link to="/">Retourner sur la page d’accueil</Link>
      </div>
    </div>
  );
}

export default Error;
