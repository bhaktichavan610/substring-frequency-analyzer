// Function to normalize input by converting to lowercase and removing non-alphabetic characters
function normalizeInput(input) {
    return input.toLowerCase().replace(/[^a-z]/g, '');
}

// Function to extract substrings of length k using a sliding window approach
function extractSubstrings(input, k) {
    const substrings = [];
    for (let i = 0; i <= input.length - k; i++) {
        substrings.push(input.substring(i, i + k));
    }
    return substrings;
}

// Function to count frequency of substrings and store in a hashmap
function countFrequencies(substrings) {
    const frequencyMap = new Map();
    substrings.forEach(substring => {
        if (frequencyMap.has(substring)) {
            frequencyMap.set(substring, frequencyMap.get(substring) + 1);
        } else {
            frequencyMap.set(substring, 1);
        }
    });
    return frequencyMap;
}

// Function to rank substrings by frequency and return the top n
function rankSubstrings(frequencyMap, n, exclusionList = []) {
    // Convert exclusion list to a Set for faster lookup
    const exclusionSet = new Set(exclusionList);

    // Filter and sort the substrings
    const sortedSubstrings = Array.from(frequencyMap.entries())
        .filter(([substring]) => !exclusionSet.has(substring))
        .sort((a, b) => b[1] - a[1]);

    // Return the top n substrings
    return sortedSubstrings.slice(0, n);
}

// Main function to process the input and return the most frequent substrings
function findMostFrequentSubstrings(input, k, n = 10, exclusionList = []) {
    const normalizedInput = normalizeInput(input);
    const substrings = extractSubstrings(normalizedInput, k);
    const frequencyMap = countFrequencies(substrings);
    return rankSubstrings(frequencyMap, n, exclusionList);
}

// Example usage
const inputString = "This is a sample string for testing the substring frequency analysis. This string contains repeated substrings.";
const k = 3; // Length of substrings
const topN = 5; // Top N frequent substrings
const exclusionList = ["the", "and", "for", "this"];

const result = findMostFrequentSubstrings(inputString, k, topN, exclusionList);
console.log("Top substrings:", result);