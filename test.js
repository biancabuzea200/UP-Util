const { ethers } = require("ethers");


// The Contract interface
let abi = [
    "function getData(bytes32 dataKey) view returns (bytes memory dataValue)",
    "function setData(bytes32 dataKey, bytes memory dataValue)"
];

// Connect to the network
const provider = new ethers.JsonRpcProvider(
    'https://rpc.testnet.lukso.network',
);

// The address from the above deployment example
let contractAddress = "0x807DA006Bedda81b0a1272D46e2F8f58DE778637";

const privateKey = ''; // your EOA private key (controller address)
const myEOA = new ethers.Wallet(privateKey).connect(provider);

// We connect to the Contract using a Provider, so we will only
// have read-only access to the Contract
let contract = new ethers.Contract(contractAddress, abi, provider);
let contractWithSigner = contract.connect(myEOA);

async function setData(address, data) {
    let tx = await contractWithSigner.setData(address, data);
    //console.log(tx); FOR DEBUGGING
}


async function getData(address) {
    let myData = await contract.getData(address);
    console.log("data is now:", ethers.toUtf8String(myData));
}

async function setAndGet(address, myData) {
    await setData(address, ethers.toUtf8Bytes(myData));
    await getData(address);
}

//example
setAndGet("0x0000000000000000000000000000000000000000000000000000000000000002", 
"Welcome to LUKSO!");