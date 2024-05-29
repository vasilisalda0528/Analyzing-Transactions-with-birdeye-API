export function convertHumanTimeToUnixTime(humanTime: string): number {
    const unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
    return unixTime;
}

// const humanTime = "March 20, 2022 12:00:00"; // Input humanTime
// const unixTime = convertHumanTimeToUnixTime(humanTime);

// console.log(`Human time: ${humanTime}`);
// console.log(`Unix time: ${unixTime}`);
