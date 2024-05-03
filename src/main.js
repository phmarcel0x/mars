// main.js
import { selectionSort } from './SortingAlgorithms/selectionSort.js';

const originalArray = [240, 6, 31, 29, 34, 40, 2, 35, 22, 26, 4, 19, 8, 25, 1, 37, 17, 38, 23, 15, 10, 14, 16, 39, 5, 9, 18, 27, 13, 20, 3, 32, 33, 28, 12, 7, 36, 11, 21, 30];
function createBars(arr, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    arr.forEach((value, index) => {
        // Create a container for each bar and its value
        const barContainer = document.createElement('div');
        barContainer.className = 'barContainer';
        barContainer.style.display = 'flex';
        barContainer.style.flexDirection = 'column';
        barContainer.style.alignItems = 'center';

        // Create the bar element
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${Math.abs(value) * 1.5}px`; // Height based on absolute value
        bar.style.backgroundColor = value >= 0 ? 'black' : 'red'; // Color based on positive or negative value

        // Create the value label element
        const valueLabel = document.createElement('div');
        valueLabel.className = 'valueLabel';
        valueLabel.textContent = value; // Set the text content to the value of the element

        // Append the bar and value label to the bar container
        barContainer.appendChild(bar);
        barContainer.appendChild(valueLabel);

        // Append the bar container to the main container
        container.appendChild(barContainer);
    });
}


async function visualizeSwap(arr, idx1, idx2, containerId) {
    if (idx1 === idx2) return;

    const container = document.getElementById(containerId);
    const barContainers = container.getElementsByClassName('barContainer'); // Get the barContainers

    // Swap the elements in the array
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;

    // Visually highlight the bars being swapped
    barContainers[idx1].children[0].style.backgroundColor = 'orange'; // First child is the bar
    barContainers[idx2].children[0].style.backgroundColor = 'orange';

    // Wait for some time to visualize swap
    await new Promise(resolve => setTimeout(resolve, getSelectedDelay()));

    // Swap the DOM elements by swapping their heights
    let tempHeight = barContainers[idx1].children[0].style.height;
    barContainers[idx1].children[0].style.height = barContainers[idx2].children[0].style.height;
    barContainers[idx2].children[0].style.height = tempHeight;

    // Swap the textContent of the value labels
    let tempText = barContainers[idx1].children[1].textContent;
    barContainers[idx1].children[1].textContent = barContainers[idx2].children[1].textContent;
    barContainers[idx2].children[1].textContent = tempText;

    // Reset the color back to black after swap
    barContainers[idx1].children[0].style.backgroundColor = 'black';
    barContainers[idx2].children[0].style.backgroundColor = 'black';
}


async function visualizeComparison(containerId, idx1, idx2) {
    const container = document.getElementById(containerId);
    const barContainers = container.getElementsByClassName('barContainer'); // Get the barContainers

    if (barContainers[idx1] && barContainers[idx2]) {
        // Highlight bars being compared
        barContainers[idx1].children[0].style.backgroundColor = 'orange';
        barContainers[idx2].children[0].style.backgroundColor = 'orange';

        // Wait for some time to visualize comparison
        await new Promise(resolve => setTimeout(resolve, getSelectedDelay()));

        // Reset the colors after comparison
        barContainers[idx1].children[0].style.backgroundColor = 'black';
        barContainers[idx2].children[0].style.backgroundColor = 'black';
    } else {
        // If either bar doesn't exist, log an error or handle it appropriately
        console.error(`Bar at index ${idx1} or ${idx2} is undefined.`);
    }
}


function displayArray(arr, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}


function getSelectedDelay() {
    const selectedSpeed = document.getElementById('speedSelector').value;
    const baseDelay = 75;
    return baseDelay/selectedSpeed;
}

function getSelectedAlgorithm() {
    return document.getElementById('algorithmSelector').value;
}

// Run the sorting algorithm and update the web with visualization
async function runSortingAlgorithm() {
    console.log('Sorting algorithm triggered'); // Added for debugging

    const sortButton = document.getElementById('startSortingButton');
    sortButton.disabled = true;

    const arrForSorting = originalArray.slice(); // Copy original array (for immutability)
    createBars(arrForSorting, 'visualizationContainer');

    await selectionSort(arrForSorting, visualizeSwap, visualizeComparison, 'visualizationContainer');

    displayArray(arrForSorting, 'sortedArray');
    sortButton.disabled = false;
}


document.addEventListener('DOMContentLoaded', () => {
    displayArray(originalArray, 'originalArray');

    // Set up the button to start sorting when clicked
    const sortButton = document.getElementById('startSortingButton');
    sortButton.addEventListener('click', runSortingAlgorithm);

});

document.addEventListener('DOMContentLoaded', function() {
    var copyrightLink = document.getElementById('copyrightLink');
    copyrightLink.setAttribute('target', '_blank');
});