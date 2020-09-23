import React from 'react';
import { Link } from "react-router-dom";

import './NotFound.css';

const NotFound = () => {
  return (
    <div id="NotFound">
  		<div className="notfound">
  			<div>
  				<div className="notfound-404">
  					<h1>!</h1>
  				</div>
  				<h2>Erreur 404</h2>
  			</div>
  			<p>La page que vous recherchez peut avoir été supprimée ou est temporairement indisponible. <Link to="/">Retour à l'accueil</Link></p>
  		</div>
  	</div>
  );
}

export default NotFound;
