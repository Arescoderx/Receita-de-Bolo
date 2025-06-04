import express from "express";
const app = express();
const port = 5000;

import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  credetials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions))

app.use ( express.urlencoded ({ extended:true }))
app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).send("Tá funcionando")
})

app.listen(port, () => {
    console.log("Servidor iniciado na porta 5000");
})
