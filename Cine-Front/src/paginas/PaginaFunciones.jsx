import { useEffect, useState } from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import "./PaginaFunciones.css"

function App() {
  const [peliculas, setPeliculas] = useState([]);
  const [peliculaId, setPeliculaId] = useState(0);
  const [funciones, setFunciones] = useState([])
  const [funcionId, setFuncionId] = useState(0)
  const [fecha, setFecha] = useState(new Date())
  const [horario, setHorario] = useState([])

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
    e.preventDefault();
    const response = await fetch("http://localhost:3000/peliculas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fecha,
        horario,
        peliculaId 
      }),
    });

    if (response.ok) {
      const { funciones: nuevaFuncion } = await response.json();
      setFunciones([...funciones, nuevaFuncion]);
      setFecha("");
      setHorario("");
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
      const response = await fetch(`http://localhost:3000/peliculas/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setFunciones(funciones.filter((f) => f.id !== id));
      }
    }
  }

    return (
      <>
      <LocalizationProvider
        dateAdapter={AdapterDayjs}>
          {<DatePicker/>}
        </LocalizationProvider>
      <h1>Peliculas</h1> 
      
      {/* <form onSubmit={(e) => {e.preventDefault()
          if (peliculaId === 0) {
            handleSubmit(e)
          } else {
            modificarPeliculaApi()
          }}}>
        <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required/>
        <label htmlFor="descripcion">Descripción:</label>
          <input type="text" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required/>
        <label htmlFor="año">Año:</label>
          <input type="number" id="año" value={año} onChange={(e) => setAño(e.target.value)} required/>
        <label htmlFor="duracion">Duración:</label>
          <input type="number" id="duracion" value={duracion} onChange={(e) => setDuracion(e.target.value)} required/>
        <label htmlFor="genero">Género:</label>
          <input type="text" id="genero" value={genero} onChange={(e) => setGenero(e.target.value)} required/>
        <label htmlFor="director">Director:</label>
          <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)} required/>
          

          {peliculaId === 0 && <button type="submit" className="boton-agregar">Agregar Película</button>}
          {peliculaId !== 0 && (
            <>
            <button className="boton-editar" onClick={modificarPeliculaApi}>Editar Película</button>
            <button onClick={() => {
              setPeliculaId(0)
              setTitulo("")
              setDescripcion("")
              setAño("")
              setDuracion("")
              setGenero("")
              setDirector("")
            }}>Cancelar</button>
            </>
          )}
      </form>

      <ul>
        {funciones.map((funcion) => (
          <li key={funcion.id}>  
            {`${funcion.id}: ${funcion.fecha} ${funcion.horario} ${funcion.idpelicula}`} 
            <div className="button-container">
              <button className="boton-eliminar" onClick={() => quitarFuncion(funcion.id)}>Quitar Función</button>
            </div>
          </li>
        ))}
      </ul> */}
      </>
    );
  }

  export default App;