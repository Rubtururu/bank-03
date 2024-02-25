const Web3 = window.Web3;
const web3 = new Web3(new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/'));
const contractAddress = 'CONTRACT_ADDRESS_HERE';
const contractAbi = [
    // ABI for contract
];
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