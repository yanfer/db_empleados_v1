import { useState } from 'react';

import Axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const MySwal = withReactContent(Swal);

function App() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState();
  const [pais, setPais] = useState('');
  const [cargo, setCargo] = useState('');
  const [anios, setAnios] = useState();
  const [id, setId] = useState();

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleadosList] = useState([]);

  const add = () => {
    Axios.post('http://aws.connect.psdb.cloud:3001/create', {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        MySwal.fire({
          title: 'Empleado Registrado',
          //text: 'Empleado registrado exitosamente',
          html:
            '<i><strong>' + nombre + '</strong> fue registrado con exito</i>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch(function (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logró crear el registro!',
          footer:
            JSON.parse(JSON.stringify(error)).message === 'Network Error'
              ? 'Error de servidor, intente mas tarde'
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const update = () => {
    Axios.put('http://aws.connect.psdb.cloud:3001/update', {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    })
      .then(() => {
        getEmpleados();
        limpiarCampos();
        MySwal.fire({
          title: 'Actualización exitosa!',
          //text: 'Empleado actualizado exitosamente',
          html:
            '<i> el registro de <strong>' +
            nombre +
            '</strong> fue actualizado exitosamente</i>',
          icon: 'success',
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch(function (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logró actualizar el registro!',
          footer:
            JSON.parse(JSON.stringify(error)).message === 'Network Error'
              ? 'Error de servidor, intente mas tarde'
              : JSON.parse(JSON.stringify(error)).message,
        });
      });
  };

  const deleteEmpleado = (val) => {
    MySwal.fire({
      title: '¿Eliminar el registro?',
      //text: 'Empleado actualizado exitosamente',
      html:
        '<i> ¿Desea realmente borrar a <strong>' +
        val.nombre +
        '</strong>?</i>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://aws.connect.psdb.cloud:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados();
            limpiarCampos();
            MySwal.fire({
              title: 'Borrado!',
              text: 'El registro de ' + val.nombre + ' fue eliminado.',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500,
            });
          })
          .catch(function (error) {
            MySwal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se logró eliminar el registro!',
              footer:
                JSON.parse(JSON.stringify(error)).message === 'Network Error'
                  ? 'Error de servidor, intente mas tarde'
                  : JSON.parse(JSON.stringify(error)).message,
            });
          });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre('');
    setEdad('');
    setPais('');
    setCargo('');
    setAnios('');
    setId('');
  };

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get('http://aws.connect.psdb.cloud:3001/empleados').then(
      (response) => {
        setEmpleadosList(response.data);
      }
    );
  };

  getEmpleados();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              value={edad}
              placeholder="Ingrese una edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              País:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              value={pais}
              placeholder="Ingrese un País"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              value={cargo}
              placeholder="Ingrese un cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de Exp:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              value={anios}
              placeholder="Ingrese años trabajados"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="card-footer text-body-secondary">
          {editar ? (
            <div className="container">
              <button
                className="btn btn-info m-2"
                onClick={() => {
                  update();
                  setEditar(false);
                }}
              >
                Actualizar
              </button>
              <button
                className="btn btn-warning m-2"
                onClick={() => {
                  limpiarCampos();
                  setEditar(false);
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años de Exp.</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              //siempre tiene que llevar key una lista creada con base de datos
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      type="button"
                      className="btn btn-info"
                    >
                      Editar
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteEmpleado(val);
                      }}
                      className="btn btn-danger"
                    >
                      Borrar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
