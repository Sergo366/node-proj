import express, {Request, Response} from "express"

export const app = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
    res.send("Hello Harismatic")
})

app.get('/courses', (req: Request, res: Response) => {
    res.json([])
})


app.listen(port, () => {
    console.log("Listen node js")
})