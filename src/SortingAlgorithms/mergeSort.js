// Implement merge sort algorithm

// Complexity Analysis:
// - Time Complexity: O(N log N) in average and worst case
// - Auxiliary Space: O(N) as it requires temporary storage for merging
// - Merge sort is NOT IN-SITU as it requires extra memory space for temporary storage

// Advantages:
// - Stable as it preserves the relative order of items with equal keys
// - Efficient for large datasets
// - Time complexity of O(N log N) in average and worst case

// Disadvantages:
// - Requires extra memory space for temporary storage
// - Time complexity of O(N log N) in average and worst case
// - Not efficient for small datasets
// - Recursive implementation may lead to stack overflow for large datasets

// Merge sort (recursive) implementation
export async function mergeSort(arr, visualizeSwap, visualizeComparison, containerId) {
    var n = arr.length;
    if (n <= 1) {
        return arr;
    }

    await mergeSortRecursive(arr, 0, n - 1, visualizeSwap, visualizeComparison, containerId);
}
