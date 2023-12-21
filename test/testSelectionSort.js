import { selectionSort } from './selectionSort.js';

function testSortingAlgorithm() {
    const testArray = [64, 25, 12, 22, 11];
    console.log("Original Array:", testArray);
    selectionSort(testArray); 
    console.log("Sorted Array:", testArray);
}

testSortingAlgorithm();