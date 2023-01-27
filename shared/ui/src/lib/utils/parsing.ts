export function parseValue(value: any) {
    value = value.title;
    const charCode = value.charCodeAt(value.length - 1);
    const consonantCode = (charCode - 44032) % 28;
    if (consonantCode === 0) {
      return `${value}로 검색`;
    }
    return `${value}으로 검색`;
  }
  