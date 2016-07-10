function isRgbString(suspect) {
  return suspect.lastIndexOf('rgb(', 0) === 0;
}

function isRgbaString(suspect) {
  return suspect.lastIndexOf('rgba(', 0) === 0;
}

export { isRgbString, isRgbaString };
