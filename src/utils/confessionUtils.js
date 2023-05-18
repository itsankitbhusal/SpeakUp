import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const { window } = new JSDOM('');
const purify = DOMPurify(window);

const sanitizeInput = async input => {
  input = await input.toString();
  // remove html tags
  input = await purify.sanitize(input);
  // remove leading and trailing spaces
  input = await input.trim();
  // remove extra spaces between words
  input = await input.replace(/\s+/g, ' ');
  input = purify.sanitize(input);
  // limit to 1000 characters
  if (input.length > 1000) {
    input = await input.substring(0, 1000);
  }
  return input;
};

export { sanitizeInput };