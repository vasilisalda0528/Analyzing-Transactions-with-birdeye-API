"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertHumanTimeToUnixTime = void 0;
function convertHumanTimeToUnixTime(humanTime) {
    var unixTime = Date.parse(humanTime) / 1000; // Convert the humanTime to Unix time
    return unixTime;
}
exports.convertHumanTimeToUnixTime = convertHumanTimeToUnixTime;
// const humanTime = "March 20, 2022 12:00:00"; // Input humanTime
// const unixTime = convertHumanTimeToUnixTime(humanTime);
// console.log(`Human time: ${humanTime}`);
// console.log(`Unix time: ${unixTime}`);
