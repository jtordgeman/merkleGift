const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

const MERKLE_ROOT = "54eb6651de7643b4d4dc5b3eb39e747cad12fd7542ee1f3b0047b0360dac2ea2";

app.post("/gift", (req, res) => {
    // grab the parameters from the front-end here
    const { proof, name } = req.body;
    const isInTheList = verifyProof(proof, name, MERKLE_ROOT);

    if (isInTheList) {
        res.send("You got a toy robot!");
    } else {
        res.send("You are not on the list :(");
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
