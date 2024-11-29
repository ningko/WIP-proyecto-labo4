import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaLogin from "./paginas/PaginaLogin";
import PaginaPeliculas from "./paginas/PaginaPeliculas";
import PaginaSeleccion from "./paginas/PaginaSeleccion";
import Menu from "./paginas/Menu"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/PaginaPeliculas" element={<PaginaPeliculas />} />
        <Route path="/PaginaSeleccion" element={<PaginaSeleccion />} />
        <Route path="/Menu" element={<Menu/>}/>
      </Routes>
    </Router>
  );
}

export default App;
