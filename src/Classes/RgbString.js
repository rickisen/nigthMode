function isRgbString(suspect) {
  return suspect.lastIndexOf('rgb(', 0) === 0;
}

export { isRgbString };
