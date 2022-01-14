let ethers = require('ethers').ethers

let chain = {
    url: "https://rpc-mumbai.maticvigil.com",
    chainId: 80001
}
let contractAddress = "xxxxxxxxxxxxxxxxx"
let privateKey = "xxxxxxxxxxxxxxxxx"
let accounts = [
    "0x557B249FF727584cBC7b8CC355ddE8f570681f0b",
    "0x8b6FeaF277C855ab6f688EcB7aD13F2fB7e0Bf13",
    "0xCf5275889D888d175B9609B917FE4432068BC87C",
    "0xb949D9Ec0D7E890d69204b5f09a17e71184673Ec",
    "0x36882ae6917fEBD5E97aD786CccFF7600E98A3af",
    "0x6ec7aC915C2041765C63E2e4C34E0e31f59424f7",
    "0xF98a253D0E3aC132a01e9a4B215B9C5026b506E5",
    "0xCBB17810CeeC76f3C904E61e5067200794196290",
    "0x216C7ea127f20d1C95de3c1dC427307969E99254",
    "0xC38b4F0Ffd2F4Fa6614E6028137D756ccF86a4bB"
]
let abiJson = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "contract Delegator",
                "name": "delegator",
                "type": "address"
            }
        ],
        "name": "_become",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address[]",
                "name": "accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "simpleAmount",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "fromToken",
                "type": "address"
            }
        ],
        "name": "multiTransferERC20Token",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address[]",
                "name": "accounts",
                "type": "address[]"
            },
            {
                "internalType": "uint256",
                "name": "simpleAmount",
                "type": "uint256"
            }
        ],
        "name": "multiTransferNativeToken",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "multiToolImplementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pendingAdmin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "pendingMultiToolImplementation",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]

const provider = new ethers.providers.JsonRpcProvider(chain.url, chain.chainId);
const wallet = new ethers.Wallet(privateKey, provider)

async function mainTokenTransfer() {
    const evmAddress = await wallet.getAddress()
    const contract = new ethers.Contract(contractAddress, abiJson, wallet);

    let amount = 1000000000000000;
    let num = 100;
    let fromToken = "0x0000000000000000000000000000000000000000"
    let receives = []
    for (let i = 0; i < num; i++) {
        receives.push(accounts[i])
    }

    let result = await contract.multiTransfer(receives, amount.toString(10), fromToken, {value: (amount * num).toString(10)})

    console.log(result.gasLimit.toString(10))
    console.log(result)
}

async function tokenTransfer() {
    const evmAddress = await wallet.getAddress()
    const contract = new ethers.Contract(contractAddress, abiJson, wallet);

    let amount = 1000000000000000;
    let num = 1;
    let fromToken = "0xcA15B68866242cCf84d71Ef4A7fCea912a25952c"
    let receives = []
    for (let i = 0; i < num; i++) {
        receives.push(accounts[i])
    }

    let result = await contract.multiTransfer(receives, amount.toString(10), fromToken)

    console.log(result.gasLimit.toString(10))
    console.log(result)
}

tokenTransfer()
