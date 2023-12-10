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

/* IN JAVASCRIPT */
// Swap array elements
function swap(arr, xp, yp) 
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

// Iterative implementation
function selectionSort(arr, n)
{
    var i, j, min_idx;

    // Traverse unsorted subarray
    for (i = 0; i < n-1; i++)
    {
        // Find the minimum element in unsorted subarray
        let min_idx = i;

        for (j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx])
                min_idx = j;

        // Swap the found minimum element with first element
        swap(arr, min_idx, i);
    }
}

function recursiveSelectionSort(arr, i, n)
{
    if (i < n -1)
    {
        let min_idx = i;

        // Find the minimum element in unsorted subarray
        for (let j = i + 1; j < n; j++)
            if(arr[j] < arr[min_idx])
                min_idx = j;

        // Swap the found minimum element with first element
        swap(arr, min_idx, i);

        // Recursively sort the remaining unsorted subarray
        recursiveSelectionSort(arr, i + 1, n);

    }
}

// Print the freshly sorted array
function printArray(arr, size) 
{
    var result = [];
    for (var i = 0; i < size; i++)
        result.push(arr[i]);
    return result;
}

// Driver to test the algorithm
var arr = [64, 25, 12, 22, 11];
var n = arr.length;
selectionSort(arr, n);
recursiveSelectionSort(arr, 0, n);

// Print the sorted array to the console
console.log("Sorted array:", printArray(arr, n));


/* Iterative implementaiton in C++
#include <iostream>
using namespace std;

void selectionSort(int arr[], int n)
{
	int i, j, min_idx;

	// Traverse unsorted subarray
	for (i = 0; i < n - 1; i++) 
	{
		// Find the minimum element in unsorted subarray
		min_idx = i;
		for (j = i + 1; j < n; j++)
		{
			if (arr[j] < arr[min_idx])
				min_idx = j;
		}
		if (min_idx != i)
			swap(arr[min_idx], arr[i]);
	}
}

void printArray(int arr[], int size)
{
	int i;
	for (i = 0; i < size; i++)
	{
		cout << arr[i] << " " << endl;
	}
}

int main()
{
	int arr[] = { 64, 25, 12, 22, 11 };
	int n = sizeof(arr) / sizeof(arr[0]);

	// Function Call
	selectionSort(arr, n);
	cout << "Sorted array: \n";
	printArray(arr, n);
	return 0;
}

*/