// main.js
import { selectionSort } from './SortingAlgorithms/selectionSort.js';

function createBars(arr, containerId) 
{
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous bars

    const barWidth = container.clientWidth / arr.length - 5; // Calculate width dynamically

    arr.forEach((value, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${value * 2}px`; // Height based on value
        bar.textContent = value; // Set the text content to the value of the element
        bar.style.color = 'white'; // Text color
        container.appendChild(bar);
    });
}

async function visualizeSwap(arr, idx1, idx2, containerId) 
{
    // Early exit if there's nothing to swap
    if (idx1 === idx2) return;

    const container = document.getElementById(containerId);
    const bars = container.children;
    
    // Swap the elements in the array
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;

    // Visually highlight the bars being swapped
    bars[idx1].style.backgroundColor = 'orange';
    bars[idx2].style.backgroundColor = 'orange';

    // Wait for some time to visualize swap
    await new Promise(resolve => setTimeout(resolve, 10)); // Shorten this delay if the sort takes too long

    // Swap the DOM elements by swapping their styles and textContent
    let tempHeight = bars[idx1].style.height;
    bars[idx1].style.height = bars[idx2].style.height;
    bars[idx2].style.height = tempHeight;

    let tempText = bars[idx1].textContent;
    bars[idx1].textContent = bars[idx2].textContent;
    bars[idx2].textContent = tempText;

    // Reset the color back to blue after swap
    bars[idx1].style.backgroundColor = 'blue';
    bars[idx2].style.backgroundColor = 'blue';
}

async function visualizeComparison(containerId, idx1, idx2) 
{
    const container = document.getElementById(containerId);
    const bars = container.children; // Consistent with visualizeSwap

    console.log(`Comparing indices: ${idx1}, ${idx2}`);
    console.log(`Total bars: ${bars.length}`); // Debugging log

    const bar1 = bars[idx1];
    const bar2 = bars[idx2];

    console.log(`Bar1: ${bar1}, Bar2: ${bar2}`); // Debugging log

    if (bar1 && bar2) 
    {
        // Highlight bars being compared
        bar1.style.backgroundColor = 'orange';
        bar2.style.backgroundColor = 'orange';

        // Wait for some time to visualize comparison
        await new Promise(resolve => setTimeout(resolve, 10)); // Adjust time as needed

        // Reset the colors after comparison
        bar1.style.backgroundColor = 'blue';
        bar2.style.backgroundColor = 'blue';
    } else {
        // If either bar doesn't exist, log an error or handle it appropriately
        console.error(`Bar at index ${idx1} or ${idx2} is undefined.`);
    }
}

function displayArray(arr, containerId)
{
    const container = document.getElementById(containerId);
    container.innerHTML = arr.join(', ');
}

// Run the sorting algorithm and update the web with visualization
async function runSortingAlgorithm() 
{
    const originalArray = [596, 832, 806, 71, 33, 772, 743, 623, 104, 548, 74, 289, 858, 399, 520, 775, 688, 152, 967, 238, 321, 32, 149, 597, 636, 284, 449, 52, 134, 678, 455, 235, 994, 29, 779, 789, 76, 19, 964, 983, 310, 526, 893, 649, 484, 271, 463, 413, 582, 144, 600, 481, 222, 86, 996, 988, 210, 460, 719, 490, 616, 709, 734, 282, 576, 114, 625, 968, 446, 158, 283, 330, 683, 626, 313, 327, 66, 363, 974, 900, 304, 394, 415, 67, 762, 218, 652, 105, 113, 357, 123, 447, 408, 416, 692, 563, 332, 342, 476, 232, 168, 528, 816, 317, 873, 657, 80, 730, 698, 706, 471, 141, 686, 965, 523, 519, 725, 705, 502, 164, 573, 341, 819, 666, 424, 751, 758, 26, 58, 39, 667, 227, 248, 631, 639, 181, 379, 280, 918, 990, 301, 54, 665, 515, 805, 640, 670, 201, 949, 699, 439, 687, 434, 139, 782, 485, 204, 975, 961, 798, 981, 331, 804, 325, 405, 64, 127, 643, 173, 750, 217, 464, 37, 822, 285, 6, 403, 163, 752, 808, 198, 991, 818, 944, 618, 533, 68, 314, 879, 414, 358, 90, 100, 234, 854, 101, 733, 980, 845, 165, 395, 231, 448, 761, 371, 604, 711, 351, 482, 615, 299, 365, 261, 43, 704, 768, 8, 352, 529, 81, 132, 316, 870, 46, 759, 444, 588, 87, 765, 497, 486, 955, 3, 810, 592, 154, 1, 565, 443, 4, 495, 213, 70, 724, 559, 305, 977, 838, 167, 128, 41, 956, 377, 273, 309, 722, 791, 796, 585, 112, 504, 568, 540, 47, 773, 390, 969, 740, 241, 545, 138, 333, 315, 240, 536, 902, 23, 611, 915, 945, 952, 857, 663, 458, 190, 451, 275, 948, 674, 292, 875, 917, 311, 494, 429, 841, 721, 599, 658, 766, 396, 584, 61, 88, 465, 947, 813, 102, 850, 512, 607, 258, 392, 274, 265, 372, 220, 211, 987, 92, 933, 603, 714, 849, 83, 534, 745, 823, 905, 595, 7, 25, 422, 73, 442, 236, 723, 970, 783, 831, 872, 942, 767, 696, 130, 318, 886, 126, 272, 418, 398, 505, 199, 356, 129, 647, 140, 430, 359, 270, 99, 929, 679, 914, 347, 685, 475, 243, 950, 250, 28, 530, 564, 196, 435, 178, 979, 364, 288, 162, 833, 579, 441, 881, 42, 999, 466, 45, 726, 800, 108, 630, 531, 103, 648, 55, 943, 840, 337, 224, 839, 962, 245, 794, 345, 926, 195, 638, 307, 294, 770, 786, 869, 552, 569, 246, 923, 115, 488, 257, 735, 574, 524, 216, 627, 350, 614, 30, 731, 538, 624, 197, 629, 777, 260, 931, 293, 286, 169, 628, 393, 771, 65, 170, 544, 763, 221, 503, 247, 209, 891, 366, 225, 878, 244, 776, 156, 182, 14, 344, 122, 700, 349, 193, 470, 509, 469, 191, 885, 506, 982, 256, 404, 124, 200, 874, 367, 868, 785, 828, 1000, 712, 916, 62, 932, 320, 78, 680, 978, 677, 386, 821, 605, 958, 566, 728, 420, 701, 295, 48, 343, 995, 989, 737, 691, 233, 411, 848, 262, 348, 953, 253, 717, 353, 421, 300, 277, 263, 671, 335, 264, 830, 298, 59, 656, 157, 659, 489, 194, 847, 934, 676, 511, 703, 291, 189, 254, 635, 570, 541, 653, 24, 654, 75, 40, 228, 111, 769, 423, 383, 561, 567, 986, 17, 15, 106, 142, 16, 829, 95, 340, 834, 391, 109, 219, 842, 593, 452, 215, 436, 136, 255, 780, 97, 72, 179, 913, 651, 401, 862, 707, 836, 437, 27, 801, 681, 746, 479, 928, 590, 206, 467, 94, 908, 887, 137, 172, 84, 518, 892, 901, 855, 281, 608, 788, 5, 971, 230, 326, 290, 177, 966, 744, 747, 606, 208, 562, 143, 684, 612, 632, 715, 438, 669, 812, 815, 118, 79, 20, 729, 539, 580, 675, 846, 661, 867, 899, 44, 98, 267, 727, 31, 491, 575, 753, 920, 637, 507, 778, 483, 571, 802, 302, 787, 53, 146, 760, 749, 827, 12, 18, 259, 445, 161, 354, 237, 478, 757, 131, 997, 145, 492, 406, 792, 10, 954, 77, 551, 159, 941, 388, 387, 633, 861, 308, 690, 859, 589, 501, 843, 888, 355, 175, 513, 542, 121, 930, 601, 660, 748, 522, 202, 214, 56, 174, 468, 864, 741, 412, 269, 906, 825, 884, 361, 287, 710, 784, 940, 882, 807, 279, 450, 963, 432, 133, 694, 499, 96, 835, 895, 598, 907, 51, 155, 457, 716, 477, 454, 207, 525, 689, 375, 510, 642, 107, 91, 203, 912, 880, 581, 655, 368, 619, 69, 664, 959, 252, 591, 433, 622, 824, 117, 389, 382, 147, 183, 866, 407, 378, 972, 682, 865, 148, 951, 93, 346, 516, 602, 871, 336, 303, 556, 381, 578, 795, 668, 517, 249, 742, 119, 187, 904, 514, 268, 594, 814, 461, 537, 856, 554, 764, 374, 85, 116, 428, 402, 312, 650, 487, 373, 609, 380, 811, 459, 924, 957, 150, 555, 826, 186, 50, 180, 946, 176, 296, 837, 973, 860, 369, 935, 229, 498, 306, 11, 550, 739, 718, 153, 890, 9, 543, 921, 937, 976, 883, 939, 577, 125, 756, 135, 617, 38, 508, 425, 472, 844, 693, 547, 919, 993, 817, 242, 925, 803, 60, 790, 527, 239, 205, 852, 702, 560, 2, 151, 89, 898, 673, 853, 462, 57, 549, 820, 410, 911, 708, 877, 417, 34, 610, 427, 480, 797, 903, 338, 938, 188, 521, 278, 754, 695, 646, 557, 474, 276, 426, 419, 297, 755, 166, 909, 63, 192, 319, 385, 587, 662, 897, 985, 927, 992, 212, 799, 894, 328, 409, 223, 35, 851, 362, 360, 324, 251, 672, 645, 697, 36, 376, 936, 644, 736, 120, 496, 720, 621, 82, 586, 558, 732, 793, 910, 998, 266, 535, 889, 334, 13, 400, 781, 922, 960, 713, 185, 322, 634, 876, 896, 431, 863, 171, 329, 546, 370, 440, 493, 160, 500, 49, 738, 21, 532, 184, 774, 583, 384, 397, 572, 809, 110, 323, 613, 22, 641, 620, 453, 553, 473, 984, 226, 339, 456];
    displayArray(originalArray, 'originalArray');
    
    const arrForSorting = originalArray.slice(); // Copy original array (for immutability)
    createBars(arrForSorting, 'visualizationContainer'); // Create initial visualization bars

    // Run selection sort with visualization and wait for it to complete
    await selectionSort(arrForSorting, visualizeSwap, visualizeComparison, 'visualizationContainer');

    // Ensure the sorted array is displayed after the sorting is complete
    displayArray(arrForSorting, 'sortedArray');
}

document.addEventListener('DOMContentLoaded', runSortingAlgorithm);
