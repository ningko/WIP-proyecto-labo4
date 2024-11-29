import express from "express"
import { db } from "./db.js"

const router = express.Router()

router.get("/", async(req, res) => {
    const [funciones] = await db.execute("SELECT f.idfuncion,f.idpelicula,f.horario,f.fecha,p.titulo FROM funciones f INNER JOIN peliculas p on (f.idpelicula = p.idpelicula) where f.disponible=true")
    res.send({
        funciones: funciones.map(({ idfuncion, ...elemento }) => ({
            id: idfuncion,
            ...elemento
        }))
    })
})

router.post("/", async(req, res) => {
    const idpelicula = req.body.idpelicula
    const horario = req.body.horario
    const fecha = req.body.fecha
    const disponible = 1;

    const [result] = await db.execute(
        "INSERT INTO funciones (idpelicula, horario, fecha, disponible) VALUES(?,?,?,1)",
        [idpelicula, horario, fecha.slice(0,10)]
    )

    res.status(201).send({
        funciones: {
            id: result.insertId,
            idpelicula, 
            horario, 
            fecha,
            disponible
        }
    })
})

router.delete("/:id", async(req, res) => {
    const id = req.params.id
    await db.execute("UPDATE funciones SET disponible=false WHERE idfuncion=?", [id])
    res.send({ id: parseInt(id) })
})

export default router