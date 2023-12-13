// main.js
// Display an array on the web
import { selectionSort } from './SortingAlgorithms/selectionSort.js';

function createBars(arr, containerId) 
{
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 5}px`; // Multiplier is adjustable
        bar.dataset.value = value; // Store the value in the dataset for reference
        bar.dataset.index = index;
        bar.textContent = value; // Set the text content to the value of the element
        bar.style.color = 'white'; // Set the text color to white for visibility
        bar.style.display = 'flex'; // Use flex to center the content
        bar.style.alignItems = 'flex-end'; // Align text to the bottom
        bar.style.justifyContent = 'center'; // Center text horizontally
        container.appendChild(bar);
    });
}

async function visualizeSwap(arr, idx1, idx2, containerId) 
{
    // Early exit if there's nothing to swap
    if (idx1 === idx2) return;

    const container = document.getElementById(containerId);
    const bars = container.children;
    
    // Swap the elements in the array
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;

    // Visually highlight the bars being swapped
    bars[idx1].style.backgroundColor = 'orange';
    bars[idx2].style.backgroundColor = 'orange';

    // Wait for some time to visualize swap
    await new Promise(resolve => setTimeout(resolve, 2000)); // Shorten this delay if the sort takes too long

    // Swap the DOM elements by swapping their styles and textContent
    let tempHeight = bars[idx1].style.height;
    bars[idx1].style.height = bars[idx2].style.height;
    bars[idx2].style.height = tempHeight;

    let tempText = bars[idx1].textContent;
    bars[idx1].textContent = bars[idx2].textContent;
    bars[idx2].textContent = tempText;

    // Reset the color back to blue after swap
    bars[idx1].style.backgroundColor = 'blue';
    bars[idx2].style.backgroundColor = 'blue';
}

function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}

// Run the sorting algorithm and update the web with visualization
async function runSortingAlgorithm() 
{
    const originalArray = [55,38,85,41,80,19,15,92,57,15,22,38,41,79,97,19,23,58,11,82,84,93,69,4,46,98,79,30,31,78,35,70,92,30,86,52,55,32,80,93,16,40,79,94,62,54,71,83,27,19];
    displayArray(originalArray, 'originalArray');
    
    const arrForSorting = originalArray.slice(); // Copy original array (for immutability)
    createBars(arrForSorting, 'visualizationContainer'); // Create initial visualization bars

    // Run selection sort with visualization and wait for it to complete
    await selectionSort(arrForSorting, visualizeSwap, 'visualizationContainer');

    // Ensure the sorted array is displayed after the sorting is complete
    displayArray(arrForSorting, 'sortedArray');
}

document.addEventListener('DOMContentLoaded', runSortingAlgorithm);
