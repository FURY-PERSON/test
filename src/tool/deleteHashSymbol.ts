export function deleteHashSymbols(text:string) {
  let newText = '';
  for(let i=0; i<text.length; i++) {
    if(text[i] !== '#') {
      newText += text[i];
    }
  }
  return newText;
}