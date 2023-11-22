import express, {Request, Response} from "express"

export const app = express()
const port = process.env.PORT || 3001

const jsonBody = express.json()
app.use(jsonBody)

const db = {
    courses: [
        {id: 0, title: "Frontend"},
        {id: 1, title: "Backend"},
    ]
}

app.get('/', (req: Request, res: Response) => {
    res.send("Hello Harismatic")
})

app.get('/courses', (req: Request, res: Response) => {
    res.json(db.courses)
})

app.get('/courses/:id', (req: Request, res: Response) => {
    const requestId = +req.params.id
    const foundCourse = db.courses.find(i => i.id === requestId)

    if (!requestId || !foundCourse) {
        res.sendStatus(404)
        return
    }

    res.json(foundCourse)
})

app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }

    const newCourse = {
        id: +new Date(),
        title: req.body.title
    }
    db.courses.push(newCourse)
    res.json(newCourse)
})

app.put('/courses/:id', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400)
        return
    }

    const foundCourse = db.courses.find(el => el.id === +req.params.id)
    if (!foundCourse) {
        res.sendStatus(404)
        return
    }

    foundCourse.title = req.body.title
    res.sendStatus(204)
})

app.delete('/__test__/data', (req, res) => {
    db.courses = []
    res.sendStatus(204)
})

app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(el => el.id !== +req.params.id)

    res.sendStatus(204)
})

app.listen(port, () => {
    console.log("Listen node js")
})