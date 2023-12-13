/* 
Implementation of SELECTION SORT algorithm:
A simple and efficient sorting algorithm that works by repeatedly 
selecting the smallest (or largest) element from the unsorted portion 
of the list and moving it to the sorted portion of the list.

COMPLEXITY ANALYSIS:
- Time Complexity: The time complexity of Selection Sort is O(N^2) as there are two nested loops:
    - One loop to select an element of Array one by one = O(N)
    - Another loop to compare that element with every other Array element = O(N)
    - Therefore overall complexity = O(N) * O(N) = O(N*N) = O(N^2)

- Auxiliary Space: O(1) as the only extra memory used is for temporary variables 
    while swapping two values in Array. The selection sort never makes more than O(N) 
    swaps and can be useful when memory writing is costly. 

ADVANTAGES:
- Simplicty, ease of understanding
- Works well with small datasets
- IN-SITU  as it does not require extra memory space for temporary storage

DISADVANTAGES:
- Time complexity of O(N^2) in average and worst case
- Does not work well with large datasets
- NOT STABLE as it does not preserve the relative order of items with equal keys

*/
import { swap } from '../../lib/utilities.js';

// Selection sort (iterative) implementation
export async function selectionSort(arr, visualizeSwap, containerId) 
{
    var n = arr.length;

    // Traverse unsorted subarray
    for (var i = 0; i < n - 1; i++) 
    {
        // Find the minimum element in unsorted array
        var min_idx = i;
        for (var j = i + 1; j < n; j++) 
        {
            if (arr[j] < arr[min_idx]) 
            {
                min_idx = j;
            }
        }
        // Visualize the swap and wait for it to complete before continuing
        if (min_idx != i) 
        {
            await visualizeSwap(arr, i, min_idx, containerId);
        }
    }
}