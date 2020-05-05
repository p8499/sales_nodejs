function parameters(dict: any): string {
  const result = Object.keys(dict).map((value, i, array) => `${array[i]}=${dict[array[i]]}`).join('&');
  return Object.keys(dict).length > 0 ? `?${result}` : '';
}

export {
  parameters,
};
