import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.send({message:"app started successfully!"})
})

app.post("/compile", async (req, res) => {
    //getting the required data from the request
    let code = req.body.code;
    let language = req.body.language;
    let input = req.body.input;

    if (language === "python") {
        language = "py"
    }

    let data = ({
        "code": code,
        "language": language,
        "input": input
    });

    //calling the code compilation API

    const resp = await fetch(`https://codexweb.netlify.app/.netlify/functions/enforceCode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const response = await resp.json();
    res.send(response);
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
