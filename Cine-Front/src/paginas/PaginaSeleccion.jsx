import { useState, useEffect } from "react"
import "./PaginaSeleccion.css"
import { Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const [peliculas, setPeliculas] = useState([]);
    const [peliculaSeleccionada, setPeliculaSeleccionada] = useState([])
    const [overlayHorario, setOverlayHorario] = useState(false);
    
    const getPeliculas = async () => {
        const response = await fetch("http://localhost:3000/peliculas/titulos");
        if (response.ok) {
          const { peliculas } = await response.json();
          setPeliculas(peliculas);
        }
      };
    
      useEffect(() => {
        getPeliculas();
      }, []);

      const handleButtonClick = (pelicula) => {
        setPeliculaSeleccionada(pelicula); 
        setOverlayHorario(true);
      };

      const cerrarOverlay = () => {
        setOverlayHorario(false); 
        setPeliculaSeleccionada(null); 
      };
    
    return (
      <>
      <h1>Menú Principal</h1>
     
      <Link to="/PaginaPeliculas">
        <button>Peliculas</button>
      </Link>
      <Link to="/PaginaFunciones">
        <button>Funciones</button>
      </Link>
      <Link to="/PaginaReservas">
        <button>Entradas</button>
      </Link>
      </>
    );
  }
  
  export default App;