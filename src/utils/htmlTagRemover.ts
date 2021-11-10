export function htmlTagRemover(str: string): string {
  let resultString = str;
  if (resultString[0] === "<") {
    const lastIndex = resultString.indexOf(">");
    resultString = resultString.substring(lastIndex + 1);
  }
  if (resultString[resultString.length - 1] === ">") {
    const lastIndex = resultString.indexOf("<", resultString.length - 8);
    resultString = resultString.substring(0, lastIndex);
  }
  return resultString;
}
