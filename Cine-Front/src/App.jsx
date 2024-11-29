import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaLogin from "./paginas/PaginaLogin";
import PaginaPeliculas from "./paginas/PaginaPeliculas";
import PaginaSeleccion from "./paginas/PaginaSeleccion";
import PaginaFunciones from "./paginas/PaginaFunciones"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaLogin />} />
        <Route path="/PaginaPeliculas" element={<PaginaPeliculas />} />
        <Route path="/PaginaSeleccion" element={<PaginaSeleccion />} />
        <Route path="/PaginaFunciones" element={<PaginaFunciones/>}/>
      </Routes>
    </Router>
  );
}

export default App;
