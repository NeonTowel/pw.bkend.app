export interface PasswordVariations {
  noSpaces: string;
  hyphenated: string;
}

export function processQuoteWithVariations(quote: string): PasswordVariations | null {
  // Clean up the incoming quote sentence
  let processedQuote = quote.replace(/[^\w\s]/gi, '');

  // Pick a short sentence with more than 8 characters and less than 45 characters
  if (processedQuote.length <= 8 || processedQuote.length >= 45) {
    return null;
  }

  // Capitalize each word of the sentence
  const capitalizedWords = processedQuote.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1));

  // Create the no-spaces version
  const noSpacesPassword = capitalizedWords.join('')
    .replace(/a/g, '4')
    .replace(/e/g, '3')
    .replace(/i/g, '1') + (Math.random() > 0.5 ? '!' : '#');

  // Create the hyphenated version
  const hyphenatedWords = capitalizedWords.map(word => {
    const lastChar = word.slice(-1);
    switch (lastChar) {
      case 'a': return word.slice(0, -1) + '4';
      case 'e': return word.slice(0, -1) + '3';
      case 'i': return word.slice(0, -1) + '1';
      default: return word;
    }
  });

  const hyphenatedPassword = hyphenatedWords.join('-') + (Math.random() > 0.5 ? '!' : '#');

  return {
    noSpaces: noSpacesPassword,
    hyphenated: hyphenatedPassword,
  };
}


export function processQuote(quote: string): string {
  // Clean up the incoming quote sentence
  let processedQuote = quote.replace(/[^\w\s]/gi, '');

  // Pick a short sentence with more than 8 characters and less than 45 characters
  if (processedQuote.length <= 8 || processedQuote.length >= 45) {
    // This is a simple way to handle it, we could also try to find a substring
    // that fits the criteria, but for now, we'll just return an empty string
    // to indicate that the quote is not suitable.
    return '';
  }

  // Capitalize each word of the sentence
  processedQuote = processedQuote.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Replace lower case characters
  processedQuote = processedQuote.replace(/a/g, '4')
                                 .replace(/e/g, '3')
                                 .replace(/i/g, '1');

  // Add randomly either exclamation mark or hash sign to the end of the sentence
  processedQuote += Math.random() > 0.5 ? '!' : '#';

  // Replace whitespaces randomly either with hyphens or remove whitespaces entirely between words
  if (Math.random() > 0.5) {
    processedQuote = processedQuote.replace(/\s/g, '-');
  } else {
    processedQuote = processedQuote.replace(/\s/g, '');
  }

  return processedQuote;
} 