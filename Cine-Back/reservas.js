import express from "express";
import { db } from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [reservas] = await db.execute("select * from reservas");
  res.send({ reservas });
});

router.post("/", async (req, res) => {
  const idusuario = 7;
  const funcionId = req.body.funcionId;
  const asientosSeleccionados = req.body.asientosSeleccionados;
  console.log(idusuario);
  var idventa;

  const [ven] = await db.execute(
    "insert into ventas (idusuario) values (?)",
    [idusuario]
  );
  idventa=ven.insertId;

  for(var i=0;i<asientosSeleccionados.length;i++){
    const [result] = await db.execute(
      "insert into reservas (idfuncion, idasiento,idventa) values (?,?,?)",
      [funcionId, asientosSeleccionados[i], idventa]
    );
    
  };
  
  const [reservas] = await db.execute("select * from reservas");
  res
  .status(201)
  .send({ reservas });
});

export default router;
