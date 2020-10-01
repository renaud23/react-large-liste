export { default as compose } from "./compose";
export { default as extractFromPayload } from "./extract-from-payload";
export { default as calcSumColWidth } from "./calc-sum-col-width";

/* *** */
// export function countColumns(min, max, table) {
//   const [a, b, ...rest] = table;
//   if (a !== undefined && b !== undefined && max >= a && min < b) {
//     return 1 + countColumns(min, max, [b, ...rest]);
//   }
//   return 0;
// }
