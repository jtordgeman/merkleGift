const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
    const tree = new MerkleTree(niceList);

    const nameToFind = process.argv[2] || "Chris Windler";
    const nameIndex = niceList.findIndex((name) => name === nameToFind);

    const proof = tree.getProof(nameIndex);

    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
        proof,
        name: nameToFind,
    });

    console.log({ gift });
}

main();
