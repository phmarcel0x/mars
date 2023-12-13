// Common utility functions
// Swap array elements
export function swap(arr, xp, yp) 
{
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}
