import React from 'react';
import './loader.css';
import logo from 'img/Logo-Insee.jpg';

const Loader = ({ info }) => (
  <figure className="loading">
    <img src={logo} alt="Logo de l'Insee" />
    <figcaption>{`Chargement ... ${info ? info : ''}`}</figcaption>
  </figure>
);

export default Loader;
