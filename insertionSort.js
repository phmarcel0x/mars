// Implement the insertion sort algorithm

// Complexity Analysis:
// - Time Complexity: O(N^2) in average and worst case
// - Auxiliary Space: O(1) as the only extra memory used is for temporary variables
// - Insertion sort is IN-SITU as it does not require extra memory space for temporary storage

// Advantages:
// - Simplicty, ease of understanding
// - Works well with small datasets
// - Stable as it preserves the relative order of items with equal keys

// Disadvantages:
// - Time complexity of O(N^2) in average and worst case
// - Does not work well with large datasets

// Insertion sort (iterative) implementation
export async function insertionSort(arr, visualizeSwap, visualizeComparison, containerId) {
    var n = arr.length;

    // Traverse through all elements in the array
    for (var i = 1; i < n; i++) {
        var key = arr[i];
        var j = i - 1;

        // Move elements of arr[0..i-1] that are greater than key to one position ahead of their current position
        while (j >= 0 && arr[j] > key) {
            // Visualize comparison
            await visualizeComparison(containerId, j, j + 1);

            // Move the element to the right
            arr[j + 1] = arr[j];
            await visualizeSwap(arr, j, j + 1, containerId);
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}