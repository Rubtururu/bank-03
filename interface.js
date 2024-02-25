const Web3 = window.Web3;
const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
const contractAddress = '0x863364617697dEEc32653FFf98c1ff5Cf04d5e71';
const contractAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"ceoAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ceoAddress2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimDividends","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"deposit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"deposits","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"distributeFunds","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"dividendsPool","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"lastDepositTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastDividendsPaymentTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const accountEl = document.getElementById('account');
const balanceEl = document.getElementById('balance');
const depositBtn = document.getElementById('deposit-btn');
const depositAmountEl = document.getElementById('deposit-amount');
const withdrawBtn = document.getElementById('withdraw-btn');
const withdrawAmountEl = document.getElementById('withdraw-amount');
const claimBtn = document.getElementById('claim-btn');

// Connect to the contract
async function connectToContract() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            accountEl.innerHTML = accounts[0];
            contract.setProvider(web3.currentProvider);
            contract.defaultAccount = accounts[0];
            updateBalance();
        } catch (error) {
            console.error(error);
        }
    } else {
        alert('Please install MetaMask or another Ethereum-enabled browser to use this dapp.');
    }
}

// Deposit BNB
async function deposit() {
    const amount = web3.utils.toWei(depositAmountEl.value, 'ether');
    try {
        const result = await contract.methods.deposit().send({ value: amount, from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Withdraw BNB
async function withdraw() {
    const amount = web3.utils.toWei(withdrawAmountEl.value, 'ether');
    try {
        const result = await contract.methods.withdraw(amount).send({ from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Claim dividends
async function claim() {
    try {
        const result = await contract.methods.claimDividends().send({ from: contract.defaultAccount });
        console.log(result);
        updateBalance();
    } catch (error) {
        console.error(error);
    }
}

// Update balance
async function updateBalance() {
    const balance = await contract.methods.balanceOf(contract.defaultAccount).call();
    balanceEl.innerHTML = web3.utils.fromWei(balance, 'ether') + ' BNB';
}

// Connect button
depositBtn.addEventListener('click', connectToContract);
