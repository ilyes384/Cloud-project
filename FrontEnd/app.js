// Fetch data from the backend API
async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/api/data');
        const data = await response.json();

        // Display the fetched data
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Display data in a table within the 'data-container' div
function displayData(data) {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    if (data && data.length > 0) {
        const table = document.createElement('table');
        const headerRow = table.insertRow();

        // Create table headers
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        });

        // Create table rows
        data.forEach(item => {
            const row = table.insertRow();
            Object.values(item).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
        });

        dataContainer.appendChild(table);
    } else {
        dataContainer.textContent = 'No data available';
    }
}
