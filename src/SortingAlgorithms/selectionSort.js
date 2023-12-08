/* 
Implementation of selection sort algorithm

A simple and efficient sorting algorithm that works by repeatedly 
selecting the smallest (or largest) element from the unsorted portion 
of the list and moving it to the sorted portion of the list.

ANALYSIS:
TIME COMPLEXITY: Best Case O(n) | Average Case O(n^2) | Worst Case O(n^2) |
SPACE COMPLEXITY: Worst Case O(1) |
*/

// Swap array elements
function swap(arr, xp, yp)
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

// Algorithm implementation
function selectionSort(arr, n)
{
    var i, j, min_idx;

    // Traverse unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted subarray
        min_idx = i;
        for (j = i + 1; j < n; j++)
        if (arr[j] < arr[min_idx])
            min_idx = j;

        // Swap the found minimum element with first element
        swap(arr, min_idx, i);
    }
}

// Print the freshly sorted array
function printArray(arr, size)
{
    var i;
    for (i = 0; i < size; i++)
        document.write(arr[i] + " ");
    document.write(" <br>");
}

// Driver to test the algorithm
var arr = [64, 25, 12, 22, 11];
var n = 5;
selectionSort(arr, n);
document.write("Sorted array: <br>");
printArray(arr, n);
