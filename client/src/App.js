import { useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState(0);

  const add = () => {
    Axios.post('http://localhost:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      alert('Empleado Registrado');
    });
  };

  return (
    <div className="App">
      <div className="datos">
        <label>
          Nombre:{' '}
          <input
            onChange={(event) => {
              setNombre(event.target.value);
            }}
            type="text"
          ></input>
        </label>

        <label>
          Edad:{' '}
          <input
            onChange={(event) => {
              setEdad(event.target.value);
            }}
            type="text"
          ></input>
        </label>

        <label>
          País:{' '}
          <input
            onChange={(event) => {
              setPais(event.target.value);
            }}
            type="text"
          ></input>
        </label>

        <label>
          Cargo:{' '}
          <input
            onChange={(event) => {
              setCargo(event.target.value);
            }}
            type="text"
          ></input>
        </label>

        <label>
          Años:{' '}
          <input
            onChange={(event) => {
              setAnios(event.target.value);
            }}
            type="number"
          ></input>
        </label>

        <button onClick={add}>Registrar</button>
      </div>
    </div>
  );
}

export default App;
