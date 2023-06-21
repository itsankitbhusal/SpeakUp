import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

const { window } = new JSDOM('');
const purify = DOMPurify(window);

function sanitizeInput(input) {
  // Validate input type and length
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }

  if (input.length === 0) {
    throw new Error('Input cannot be empty');
  }

  // Remove any HTML tags and attributes from the input
  const sanitizedInput = purify.sanitize(input);

  // Trim the input to a maximum of 3000 characters
  const trimmedInput = sanitizedInput.substring(0, 3000);

  return trimmedInput;
}

// extract hashtags from a body of text
function extractHashtags(body) {
  const regex = /#(\[([^\]]+)\])\(\2\)/g;
  const matches = body.match(regex);
  const hashtags = [];
  if (matches) {
    matches.forEach(match => {
      const start = match.split('](');
      const end = start[1].split(')');
      const hashtag = end[0];
      hashtags.push(hashtag);
    });
  }
  return hashtags;
}


export { sanitizeInput, extractHashtags };