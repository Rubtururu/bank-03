const Web3 = require('web3');
const contractAbi = [[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"ceoAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceoAddress2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeFunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendsPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDepositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendsPaymentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]]; // Pega aquí el ABI de tu contrato
const contractAddress = '0x863364617697dEEc32653FFf98c1ff5Cf04d5e71'; // Pega aquí la dirección del contrato

let web3;
let contract;

// Conectar a MetaMask
async function connectToContract() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractAbi, contractAddress);
            console.log('Conectado a MetaMask con la cuenta:', account);
            updateBalance();
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Por favor, instala MetaMask o otro navegador compatible con Ethereum para usar esta dapp.');
    }
}

// Depositar BNB
async function deposit() {
    const amount = web3.utils.toWei(document.getElementById('deposit-amount').value, 'ether');
    try {
        const result = await contract.methods.deposit().send({ value: amount, from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Retirar BNB
async function withdraw() {
    const amount = web3.utils.toWei(document.getElementById('withdraw-amount').value, 'ether');
    try {
        const result = await contract.methods.withdraw(amount).send({ from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Reclamar dividendos
async function claim() {
    try {
        const result = await contract.methods.claimDividends().send({ from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Actualizar saldo
async function updateBalance() {
    const balance = await contract.methods.balanceOf(contract.defaultAccount).call();
    document.getElementById('balance').innerHTML = web3.utils.fromWei(balance, 'ether') + ' BNB';
}

// Botones de acción
document.getElementById('deposit-btn').addEventListener('click', deposit);
document.getElementById('withdraw-btn').addEventListener('click', withdraw);
document.getElementById('claim-btn').addEventListener('click', claim);
