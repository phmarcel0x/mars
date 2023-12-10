// Display an array on the web
function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join('');
}

// Display a message on the web
function displayMessage(message, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = message;
}

// Run the sorting algorithm and update the web

