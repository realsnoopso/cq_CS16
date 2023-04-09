export function padLeft(num) {
  const str = String(num);
  return new Array(2 - str.length + 1).join(' ') + str;
}

export function getSets(coordinates) {
  const result = [];
  coordinates.forEach((coordinate, i) => {
    const a = coordinate;
    const b = coordinates[i + 1];
    if (b) result.push([a, b]);
    else result.push([a, coordinates[0]]);
  });
  return result;
}
