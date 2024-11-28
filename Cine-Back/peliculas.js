import express from "express"
import { db } from "./db.js"

const router = express.Router()

router.get("/", async(req, res) => {
    const [peliculas] = await db.execute("SELECT * FROM peliculas")
    res.send({
        peliculas: peliculas.map(({ id_pelicula, ...elemento }) => ({
            id: id_pelicula,
            ...elemento
        }))
    })
})

router.get("/titulos", async(req, res) => {
    const [peliculas] = await db.execute("SELECT titulo FROM peliculas")
    res.send({
        peliculas: peliculas.map((elemento) => ({
            id: elemento.id_pelicula,
            ...elemento
        }))
    })
})

router.get("/:id", async(req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM peliculas WHERE id_pelicula=?"
    const [peliculas] = await db.execute(sql, [id])

    if (peliculas.length === 0) {
        res.status(204).send()
    } else {
        res.send({ pelicula: peliculas[0] })
    }
})

router.post("/", async(req, res) => {
    const titulo = req.body.titulo
    const descripcion = req.body.descripcion
    const año = req.body.año
    const duracion = req.body.duracion
    const genero = req.body.genero
    const director = req.body.director

    const [result] = await db.execute(
        "INSERT INTO peliculas(titulo, descripcion, año, duracion, genero, director) VALUE(?,?,?,?,?,?)",
        [titulo, descripcion, año, duracion, genero, director]
    )

    res.status(201).send({
        peliculas: {
            id: result.insertId,
            titulo,
            descripcion,
            año,
            duracion,
            genero,
            director
        }
    })
})

router.put("/:id", async(req, res) => {
    const id = req.params.id
    const titulo = req.body.titulo
    const descripcion = req.body.descripcion
    const año = req.body.año
    const duracion = req.body.duracion
    const genero = req.body.genero
    const director = req.body.director

    await db.execute(
        "UPDATE peliculas SET titulo=?, descripcion=?, año=?, duracion=?, genero=?, directar=? WHERE id_peliculas=?"
        [titulo, descripcion, año, duracion, genero, director, id]
    )

    res.status(201).send({
        peliculas: {
            id: parseInt(id),
            titulo,
            descripcion,
            año,
            duracion,
            genero,
            director
        }
    })
})

router.delete(":/id", async(req, res) => {
    const id = req.params.id
    await db.execute("DELETE FROM peliculas WHERE id_peliculas=?", [id])
    res.send({ id: parseInt(id) })
})

export default router