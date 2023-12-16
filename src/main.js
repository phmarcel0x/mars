// main.js
// Display an array on the web !
import { selectionSort } from './SortingAlgorithms/selectionSort.js';

function createBars(arr, containerId) 
{
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 5}px`; // Height based on value
        bar.style.width = '20px'; // Width of the bar, adjust if necessary
        bar.style.left = `${index * (20 + 5)}px`; // Position bars next to each other
        bar.dataset.value = value; // Store the value in the dataset for reference
        bar.dataset.index = index;
        bar.textContent = value; // Set the text content to the value of the element
        bar.style.color = 'white'; // Text color
        // The rest of the flex styles are not needed now
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
    await new Promise(resolve => setTimeout(resolve, 10)); // Shorten this delay if the sort takes too long

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

async function visualizeComparison(containerId, idx1, idx2) 
{
    const container = document.getElementById(containerId);
    const bars = container.children; // Consistent with visualizeSwap

    console.log(`Comparing indices: ${idx1}, ${idx2}`);
    console.log(`Total bars: ${bars.length}`); // Debugging log

    const bar1 = bars[idx1];
    const bar2 = bars[idx2];

    console.log(`Bar1: ${bar1}, Bar2: ${bar2}`); // Debugging log

    if (bar1 && bar2) 
    {
        // Highlight bars being compared
        bar1.style.backgroundColor = 'orange';
        bar2.style.backgroundColor = 'orange';

        // Wait for some time to visualize comparison
        await new Promise(resolve => setTimeout(resolve, 10)); // Adjust time as needed

        // Reset the colors after comparison
        bar1.style.backgroundColor = 'blue';
        bar2.style.backgroundColor = 'blue';
    } else {
        // If either bar doesn't exist, log an error or handle it appropriately
        console.error(`Bar at index ${idx1} or ${idx2} is undefined.`);
    }
}

function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}

// Run the sorting algorithm and update the web with visualization
async function runSortingAlgorithm() 
{
    const originalArray = [71, 73, 50, 62, 81, 13, 63, 86, 77, 80, 9, 79, 91, 98, 21, 95];
    displayArray(originalArray, 'originalArray');
    
    const arrForSorting = originalArray.slice(); // Copy original array (for immutability)
    createBars(arrForSorting, 'visualizationContainer'); // Create initial visualization bars

    // Run selection sort with visualization and wait for it to complete
    await selectionSort(arrForSorting, visualizeSwap, visualizeComparison, 'visualizationContainer');

    // Ensure the sorted array is displayed after the sorting is complete
    displayArray(arrForSorting, 'sortedArray');
}

document.addEventListener('DOMContentLoaded', runSortingAlgorithm);
