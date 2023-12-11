// main.js
// Display an array on the web
function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join('<br>');
}

// Run the sorting algorithm and update the web
function runSortingAlgorithm()
{
    const originalArray = [64, 25, 12, 22, 11];
    const n = originalArray.length;

    // Display original array
    displayArray(originalArray, 'originalArray');

    // Copy original array (for immutability)
    const arrForSorting = originalArray.slice();

    // Run selection sort
    selectionSort(arrForSorting, n);
    // recursiveSelectionSort(arrForSorting, 0, n);

    // Display the sorted array
    setTimeout(() => {
        displayArray(arrForSorting, 'sortedArray');
    }, 1500); 
}

document.addEventListener('DOMContentLoaded', runSortingAlgorithm);
