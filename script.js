const transactions = [];
let balance = 0;

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const transactionType = document.getElementById('transactionType').value;

    if (description.trim() === '' || isNaN(amount) || amount <= 0) {
        alert('Por favor, insira uma descrição e um valor válido.');
        return;
    }

    const transaction = {
        date: new Date().toLocaleDateString(),
        description,
        type: transactionType,
        amount
    };

    transactions.push(transaction);
    updateTransactionList();
    calculateBalance();

    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function updateTransactionList() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';

    for (const transaction of transactions) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.type === 'income' ? 'Receita' : 'Despesa'}</td>
            <td>R$ ${transaction.amount.toFixed(2)}</td>
        `;
        transactionList.appendChild(row);
    }
}

function calculateBalance() {
    balance = transactions.reduce((total, transaction) => {
        return transaction.type === 'income'
            ? total + transaction.amount
            : total - transaction.amount;
    }, 0);

    document.getElementById('balance').textContent = `Saldo: R$ ${balance.toFixed(2)}`;
}
