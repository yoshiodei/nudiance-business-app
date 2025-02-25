export const setSalaryRange = (lower: string = '0', upper: string = '0') => {
    if(Number(lower) === Number(upper)) return upper;
    if(Number(upper) > Number(lower)) return `${lower} - ${upper}`
    return '0'; 
  }