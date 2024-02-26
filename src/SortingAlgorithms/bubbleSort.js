/*
    Implement the bubble sort algorithm

    Complexity Analysis:
    - Time Complexity: O(N^2) in average and worst case
    - Auxiliary Space: O(1) as the only extra memory used is for temporary variables
    - Bubble sort is IN-SITU as it does not require extra memory space for temporary storage

    Advantages:
    - Simplicty, ease of understanding
    - Works well with small datasets
    - Stable as it preserves the relative order of items with equal keys

    Disadvantages:
    - Time complexity of O(N^2) in average and worst case
    - Does not work well with large datasets

*/

// Bubble sort (iterative) implementation
export async function bubbleSort(arr, visualizeSwap, visualizeComparison, containerId) {
    var n = arr.length;

    // Traverse through all elements in the array
    for (var i = 0; i < n - 1; i++) {
        for (var j = 0; j < n - i - 1; j++) {
            // Visualize comparison
            await visualizeComparison(containerId, j, j + 1);

            // Swap if the element found is greater than the next element
            if (arr[j] > arr[j + 1]) {
                await visualizeSwap(arr, j, j + 1, containerId);
            }
        }
    }
}