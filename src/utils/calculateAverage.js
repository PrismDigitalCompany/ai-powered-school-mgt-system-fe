export function calculateAvg(numbers) {
  if (!numbers.length) {
    throw new Error(
      "Cannot calculate the average because no scores were provided.",
    );
  } else {
    return numbers.reduce((sum, number) => sum + number, 0) / numbers.length;
  }
}
