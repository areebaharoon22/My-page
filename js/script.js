// =========Background image changer===========
const backgrounds = ["url('../images/bgimg.jpg')", "url('../images/img4.jpg')"]; // Replace with actual image URLs
let currentIndex = 0;
function changeBackground() {
    document.body.style.backgroundImage = backgrounds[currentIndex];
    currentIndex = (currentIndex + 1) % backgrounds.length;
}
setInterval(changeBackground, 3000); // Change background every 5 seconds

//==============Time =====================
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert hours to 12-hour format
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
    
    document.getElementById('time-container').textContent = timeString;
}

// Update time every second
setInterval(updateTime, 1000);

// Call updateTime initially to display the time immediately
updateTime();

// ===========Calling quotes =======================
async function fetchQuote() {
    const url = 'https://api.quotable.io/random';
    const options = { method: 'GET' };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        
        // Display the quote and author in the quote-container div
        const quoteContainer = document.getElementById('quote-container');
        quoteContainer.innerHTML = `<p>"${data.content}"</p><p>- ${data.author}</p>`;
    } catch (error) {
        console.error(error);
    }
}

// Fetch a quote initially when the page loads
fetchQuote();

// Fetch a new quote every 1 minutes
setInterval(fetchQuote, 1 * 60 * 1000); // 1 minutes in milliseconds

//============ creating the list ==================
document.getElementById('create-list-button').addEventListener('click', () => {
    const popupWidth = 650; // Adjust as needed
    const popupHeight = 500; // Adjust as needed
    const leftPosition = (window.screen.width - popupWidth) / 2;
    const topPosition = (window.screen.height - popupHeight) / 2;

    const popup = window.open('', 'List Input', `width=${popupWidth},height=${popupHeight},left=${leftPosition},top=${topPosition}`);

    
    // Write HTML content to the popup window
    popup.document.write(`
    <html>
    <head>
        <title>Be Productive!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 20px;
                color: #ca7f68;
            }
            h2 {
                margin-bottom: 10px;
            }
            #list-input {
                width: 100%;
                height: 20rem;
                margin-bottom: 10px;
                padding: 5px;
                resize: none;
            }
            #create-button {
                font-size: 20px;
                padding: 8px 16px;
                background-color: #ca7f68;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                border: black solid 2px;
            }
            #create-button:hover {
                background-color: #faebd7;
                color: #ca7f68;
            }
        </style>
    </head>
    <body>
        <h2>Create your list here:</h2>
        <p>Type your tasks on separate lines in the textarea below:</p>
        <textarea id="list-input" rows="50" cols="50"></textarea>
        <br>
        <button id="create-button">Create</button>
    </body>
    </html>
`);

    // Add functionality to the "create" button in the popup window
    popup.document.getElementById('create-button').addEventListener('click', () => {
        // Get the list input value
        const listInput = popup.document.getElementById('list-input').value;
        
        // Close the popup window
        popup.close();
        
        // Create and display the list on the main page
        displayList(listInput.split('\n')); // Split the input by newline character to create an array
    });
});

function displayList(items) {
    const listContainer = document.getElementById('list-container');
    listContainer.innerHTML = ''; // Clear previous content
    
    // Create a heading
    const heading = document.createElement('h2');
    heading.textContent = 'My Tasks:';
    listContainer.appendChild(heading);

    // Create and display the list in the div container
    const listElement = document.createElement('ol');
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        listElement.appendChild(listItem);
    });
    listContainer.appendChild(listElement);

    // Create "I'm done!" button
    const doneButton = document.createElement('button');
    doneButton.textContent = "I'm done!";
    doneButton.classList.add("button"); // Add a class for styling
    doneButton.addEventListener('click', () => {
        location.reload();
    });
    listContainer.appendChild(doneButton);
}
