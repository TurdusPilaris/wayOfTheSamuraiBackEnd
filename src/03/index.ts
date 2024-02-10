import express, {Request, Response, NextFunction} from 'express'
const app = express()
const port = 3000

import bodyParser from 'body-parser'

//const jsonBodyMiddleware = express.json()
//const jsonBodyMiddleware = bodyParser.json();
const jsonBodyMiddleware = bodyParser({});

const authGardMiddleware = (req:Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123'){
        next();
    } else  {
        res.send(401)
    }
}
let  requestCounter = 0;

const requestCounterMiddleware = (req:Request, res: Response, next: NextFunction) => {
    requestCounter++;
    next();
}

app.use(requestCounterMiddleware);
app.use(jsonBodyMiddleware);
app.use(authGardMiddleware);

const db = {
    courses: [
        {id: 1, title: 'front-end'},
        {id: 2, title: 'back-end'},
        {id: 3, title: 'dev'},
        {id: 4, title: 'QA'}
    ]
}

app.get('/',  (req: Request, res: Response) => {

    res.json({value:'hello ' + requestCounter})
})
app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = foundCourses.filter(c => c.title.indexOf(req.query.title as string) > -1)
    }
    res.json(foundCourses)
})
app.get('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(a => a.id === +req.params.id);

    if (!foundCourse) {
        res.sendStatus(404);
        return;
    }
    res.json(foundCourse)
})

app.post('/courses',(req, res) =>{
    if(!req.body.title) {
        res.sendStatus(400)
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title,
    };
    db.courses.push(createdCourse)
    res.status(201).json(createdCourse)
})

app.delete('/courses/:id', (req, res) => {

    // db.courses = db.courses.filter(a => a.id !== +req.params.id);

    for(let i=0; i < db.courses.length; i++) {
        if (db.courses[i].id === +req.params.id) {
            db.courses.splice(i, 1);
            res.sendStatus(204);
            return;
        }
    }
    res.sendStatus(404);
})

app.put('/courses/:id', (req, res) => {
    const foundCourse = db.courses.find(a => a.id === +req.params.id);

    if (foundCourse){
        foundCourse.title = req.body.title;
        res.json(foundCourse);
    }else {
        res.sendStatus(404);
        return;
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})