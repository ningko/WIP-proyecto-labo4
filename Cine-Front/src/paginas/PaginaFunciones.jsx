import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import "./PaginaFunciones.css"
import dayjs from "dayjs"
import { Dropdown } from 'primereact/dropdown';

import { Link, useNavigate } from "react-router-dom";

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [idpelicula, setIdPelicula] = useState(0);
  const [funciones, setFunciones] = useState([])
  const [funcionId, setFuncionId] = useState(0)
  const [fecha, setFecha] = useState(dayjs(Date()))
  const [fechatxt, setFechatxt] = useState("")
  const [horario, setHorario] = useState("")
  const [value, setValue] = useState("Fruit")

  const getPeliculas = async() => {
    const response = await fetch("http://localhost:3000/peliculas")
    if (response.ok) {
      const { peliculas } = await response.json()
      setPeliculas(peliculas)
    }
  }

  useEffect(() => {
    getPeliculas();
    getFunciones();
  }, [])

  const handleSubmit = async (e) => {
    const response = await fetch("http://localhost:3000/funciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idpelicula,
        horario,
        fecha
      }),
    });

    if (response.ok) {
      const { funciones: nuevaFuncion } = await response.json();
      nuevaFuncion.titulo=peliculas.find((element) => element.id == idpelicula).titulo
      setFunciones([...funciones, nuevaFuncion]);
    }
  }

  const getFunciones = async() => {
    const response = await fetch("http://localhost:3000/funciones")
    if (response.ok) {
      const { funciones } = await response.json()
      setFunciones(funciones)
    }
  }

  const quitarFuncion = async (id) => {
    if (confirm(`¿Quitar ${id}?`)) {
      const response = await fetch(`http://localhost:3000/funciones/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFunciones(funciones.filter((f) => f.id !== id));
      }
    }
  }

  const handleChange = (a)=>{
    var b=new Date()
    setFecha(a)
    setFechatxt(a.$y.toString()+"-"+(a.$M+1).toString()+"-"+(a.$D).toString())
    console.log(a.$y.toString()+"-"+(a.$M+1).toString()+"-"+(a.$D).toString())
  }

  const handleChangeSelectHorario = (a)=>{
    setHorario(a);
    console.log(a);
  }

  const handleChangeSelectPelicula = (a)=>{
    setIdPelicula(a);
    console.log(a);
  }

    return (
      <>
      <h1>Funciones</h1> 
        <LocalizationProvider
          dateAdapter={AdapterDayjs}>
            {<DatePicker  format="YYYY-MM-DD" value={fecha} onChange={(nuevaFecha) =>{handleChange(nuevaFecha)}}/>}
        </LocalizationProvider>

        <Dropdown value={idpelicula} onChange={(e) => handleChangeSelectPelicula(e.value)} options={peliculas} optionLabel="titulo" optionValue="id" placeholder="Seleccionar Película..." style={{width:'300px'}} />

        <Dropdown value={horario} onChange={(e) => handleChangeSelectHorario(e.value)} options={[{hr:"15:00"},{hr:"18:00"},{hr:"21:00"}]} optionLabel="hr"  optionValue="hr" placeholder="Seleccionar Horario..." style={{width:'300px'}}/>
        
        <button onClick={()=>handleSubmit()} type="submit"  className="boton-agregar">Agregar Función</button>

      <ul>
        {funciones.map((funcion) => (
          <li key={funcion.id}>  
          <p>{`${funcion.id}: Día: ${funcion.fecha.slice(0, 10)}
          Hora:${funcion.horario} 
          Película:(${funcion.titulo})`}  
            </p>  
            <div className="button-container">
              <button className="boton-eliminar" onClick={() => quitarFuncion(funcion.id)}>Quitar Función</button>
            </div>
          </li>
        ))}
      </ul> 
      
      <Link to="/PaginaSeleccion">
        <button>Volver</button>
      </Link>
      </>
    );
  }

  export default App;