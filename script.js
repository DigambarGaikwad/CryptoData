const gridTab = document.getElementById('gridTab');
const listTab = document.getElementById('listTab');
const gridView = document.getElementById('gridView');
const listView = document.getElementById('listView');

async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en');
        // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en
        const data = await response.json();
        return data;
        //console.log(data)

    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}
function renderGrid(data) {
    gridView.innerHTML = '';
    data.forEach(crypto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const name = document.createElement('h3');
        name.textContent = crypto.name;
        card.appendChild(name);

        const image = document.createElement('img');
        image.src = crypto.image;
        image.alt = crypto.name;
        card.appendChild(image);

        const priceChange = document.createElement('p');
        priceChange.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;
        priceChange.classList.add('Change')

        card.appendChild(priceChange);

        const price = document.createElement('p');
        price.textContent = `$${crypto.current_price.toFixed(2)}`;
        price.classList.add('Price')
        card.appendChild(price);

        const marketCap = document.createElement('p');
        marketCap.textContent = `$${crypto.market_cap}`;
        card.appendChild(marketCap);

        

        gridView.appendChild(card);
    });
}

function renderList(data) {
    listView.innerHTML = '';
    const table = document.createElement('table');
    table.classList.add('table');

    const tableHeader = document.createElement('tr');
    const headers = ['Name','Change','Price', 'Market Cap'];
    // 'Image'
    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        tableHeader.appendChild(header);
    });
    table.appendChild(tableHeader);

    data.forEach(crypto => {
        const row = document.createElement('tr');

        const MainDiv=document.createElement('td')
        const imgDiv=document.createElement('div')
        const taxtDiv=document.createElement('div')

        const nameCell = document.createElement('div');
         nameCell.textContent = crypto.name;

        const image = document.createElement('img');
        image.src = crypto.image;
        image.alt = crypto.name;
        image.classList.add('List-image');
        nameCell.classList.add('List-Name')
        //nameCell.appendChild(image);
        
        imgDiv.appendChild(image);
        taxtDiv.appendChild(nameCell);
        MainDiv.appendChild(imgDiv);
        MainDiv.appendChild(taxtDiv);
        MainDiv.classList.add('Name-div')
        row.appendChild(MainDiv);


        // row.appendChild(nameCell);

        const priceChangeCell = document.createElement('td');
        const changeDiv=document.createElement('div')
        changeDiv.textContent = `${crypto.price_change_percentage_24h.toFixed(2)}%`;

        priceChangeCell.classList.add('ChangeList')
        priceChangeCell.appendChild(changeDiv)

        row.appendChild(priceChangeCell);

        const priceCell = document.createElement('td');
        // const priceDiv=document.createElement('div')
        priceCell.textContent = `$${crypto.current_price.toFixed(2)}`;
        priceCell.classList.add('Price')
        // priceCell.appendChild(priceDiv)
        row.appendChild(priceCell);

        const marketCapCell = document.createElement('td');
        marketCapCell.textContent = `$${crypto.market_cap}`;
        row.appendChild(marketCapCell);

      

        table.appendChild(row);
       // table.classList.add('table')

    });

    listView.appendChild(table);
}

gridTab.addEventListener('click', async () => {
    gridTab.classList.add('active');
    listTab.classList.remove('active');

    gridView.style.display = 'grid';
    listView.style.display = 'none';

    const cryptoData = await fetchCryptoData();
    renderGrid(cryptoData);
});

listTab.addEventListener('click', async () => {
    listTab.classList.add('active');
    gridTab.classList.remove('active');

    gridView.style.display = 'none';
    listView.style.display = 'block';

    const cryptoData = await fetchCryptoData();
    renderList(cryptoData);
});

// Initial load
gridTab.click();




// const toggleButton = document.querySelector('.toggle-button');

// toggleButton.addEventListener('change', () => {
    
//     const body = document.body;

//     if (toggleButton.checked) {
        
//         body.style.backgroundColor = 'white';
//         body.style.color = '#000';
//     } else {
        
//         body.style.backgroundColor = 'rgb(17, 17, 17)';
//         body.style.color = '#ccc';
//     }
// });
