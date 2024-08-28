// main.js

// Import the sorting algorithms
import { selectionSort } from './selectionSort.js';
import { bubbleSort } from './bubbleSort.js';
import { insertionSort } from './insertionSort.js'; 
// import { mergeSort } from './SortingAlgorithms/mergeSort.js';

let originalArray = [];
let skipToEnd = false; // Flag to control skipping the visualization

function createBars(arr, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    arr.forEach((value) => {
        const barContainer = document.createElement('div');
        barContainer.className = 'barContainer';
        barContainer.style.display = 'flex';
        barContainer.style.flexDirection = 'column';
        barContainer.style.alignItems = 'center';

        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${Math.abs(value) * 1.5}px`;
        bar.style.backgroundColor = value >= 0 ? 'black' : 'red';

        const valueLabel = document.createElement('div');
        valueLabel.className = 'valueLabel';
        valueLabel.textContent = value;

        barContainer.appendChild(bar);
        barContainer.appendChild(valueLabel);
        container.appendChild(barContainer);
    });
}

async function visualizeSwap(arr, idx1, idx2, containerId) {
    if (idx1 === idx2 || skipToEnd) return;

    const container = document.getElementById(containerId);
    const barContainers = container.getElementsByClassName('barContainer');

    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;

    barContainers[idx1].children[0].style.backgroundColor = 'orange';
    barContainers[idx2].children[0].style.backgroundColor = 'orange';

    await new Promise(resolve => setTimeout(resolve, getSelectedDelay()));

    let tempHeight = barContainers[idx1].children[0].style.height;
    barContainers[idx1].children[0].style.height = barContainers[idx2].children[0].style.height;
    barContainers[idx2].children[0].style.height = tempHeight;

    let tempText = barContainers[idx1].children[1].textContent;
    barContainers[idx1].children[1].textContent = barContainers[idx2].children[1].textContent;
    barContainers[idx2].children[1].textContent = tempText;

    barContainers[idx1].children[0].style.backgroundColor = 'black';
    barContainers[idx2].children[0].style.backgroundColor = 'black';
}

async function visualizeComparison(containerId, idx1, idx2) {
    if (skipToEnd) return;

    const container = document.getElementById(containerId);
    const barContainers = container.getElementsByClassName('barContainer');

    if (barContainers[idx1] && barContainers[idx2]) {
        barContainers[idx1].children[0].style.backgroundColor = 'orange';
        barContainers[idx2].children[0].style.backgroundColor = 'orange';

        await new Promise(resolve => setTimeout(resolve, getSelectedDelay()));

        barContainers[idx1].children[0].style.backgroundColor = 'black';
        barContainers[idx2].children[0].style.backgroundColor = 'black';
    }
}

function displayArray(arr, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}

function getSelectedDelay() {
    const selectedSpeed = document.getElementById('speedSelector').value;
    const baseDelay = 200;
    return baseDelay / selectedSpeed;
}

function generateRandomArray(size) {
    const newArray = [];
    for (let i = 0; i < size; i++) {
        newArray.push(Math.floor(Math.random() * 100) + 1);
    }
    document.getElementById('sortedArray').innerHTML = '';
    return newArray;
}

function getSelectedAlgorithm() {
    return document.getElementById('algorithmSelector').value;
}

// Map the algorithm names to their respective functions
const algorithms = {
    selectionSort,
    bubbleSort,
    insertionSort,
    // mergeSort,
    // Add more algorithms here as needed
};

async function runSortingAlgorithm() {
    console.log('Sorting algorithm triggered');
    const sortButton = document.getElementById('startSortingButton');
    const skipButton = document.getElementById('skipSortingButton');
    sortButton.disabled = true;
    skipButton.disabled = false;
    skipToEnd = false;

    const selectedAlgorithm = getSelectedAlgorithm();
    const sortingFunction = algorithms[selectedAlgorithm];

    createBars(originalArray, 'visualizationContainer');

    // Run the selected sorting algorithm with visualization unless skipToEnd is triggered
    await sortingFunction(originalArray, visualizeSwap, visualizeComparison, 'visualizationContainer');

    displayArray(originalArray, 'sortedArray');
    createBars(originalArray, 'visualizationContainer'); // Ensure the final state is shown

    sortButton.disabled = false;
    skipButton.disabled = true;
}

function skipSorting() {
    // Set skipToEnd to true and instantly sort the array without visualization
    skipToEnd = true;
    originalArray.sort((a, b) => a - b); // Perform sorting immediately
    displayArray(originalArray, 'sortedArray');
    createBars(originalArray, 'visualizationContainer'); // Display the final sorted bars
}

document.addEventListener('DOMContentLoaded', () => {
    originalArray = generateRandomArray(30);
    displayArray(originalArray, 'originalArray');

    const arraySizeSelector = document.getElementById('arraySizeSelector');
    const randomizeButton = document.getElementById('randomizeArrayButton');

    arraySizeSelector.addEventListener('change', () => {
        originalArray = generateRandomArray(parseInt(arraySizeSelector.value));
        displayArray(originalArray, 'originalArray');
    });

    randomizeButton.addEventListener('click', () => {
        originalArray = generateRandomArray(parseInt(arraySizeSelector.value));
        displayArray(originalArray, 'originalArray');
    });

    const sortButton = document.getElementById('startSortingButton');
    sortButton.addEventListener('click', runSortingAlgorithm);

    const skipButton = document.getElementById('skipSortingButton');
    skipButton.addEventListener('click', skipSorting);
});
