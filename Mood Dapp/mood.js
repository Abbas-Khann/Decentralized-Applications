// Time to build Dapps
const contractAddress = "0x9899DA27023386bcEe56F0daD279617d3dd26f8b"
const contractABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_mood",
                "type": "string"
            }
        ],
        "name": "setMood",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getMood",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

let network = {
    chainId: 80001,
    name: 'Polygon Testnet'
}


let moodContract
let signer
let provider = new ethers.providers.Web3Provider(window.ethereum, network)

// Let's request access to the user's wallet and connect the signer to the metamask account

provider.send('eth_requestAccounts', []).then(()=> {
    provider.listAccounts().then((accounts)=> {
        signer = provider.getSigner(accounts[0]);
        moodContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
    })
})

async function getMood() {
    const getMoodPromise = moodContract.getMood()
    const Mood = await getMoodPromise
    document.querySelector('.show-mood').textContent = `Your Mood is ${Mood}`
    console.log(Mood)
}

async function setMood() {
    const mood = document.getElementById('mood').value;
    const setMoodPromise = moodContract.setMood(mood)
    await setMoodPromise;
}