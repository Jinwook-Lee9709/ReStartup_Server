import express from "express";
import routes from "./routes/index.mjs"
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //

//Routing
app.use(routes);

app.get('/', (req, res) => {
    res.send(`
        <h1>Log in</h1>
        <a href="/login">Log in</a>
    `);
});


export default app;

