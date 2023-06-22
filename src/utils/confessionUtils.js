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
  const regex2 = /#\[\w+\]\((\d+)\)/g;

  const matches = body.match(regex);
  const matches2 = body.match(regex2);
  const hashtags = [];
  const ids = [];
  if (matches) {
    matches.forEach(match => {
      const start = match.split('](');
      const end = start[1].split(')');
      const hashtag = end[0];
      // check if hashtag is already in hashtags
      if (!hashtags.includes(hashtag)) {
        hashtags.push(hashtag);
      }
    });
  }
  if (matches2) {
    matches2.forEach(match => {
      const start = match.split('](');
      const end = start[1].split(')');
      const id = end[0];
      ids.push(id);
    });
  }
  return { hashtags, ids };
}

// after extracting body replace format "#[new](16)" or  "#[tech](tech)" with #tech like this
const replaceHashtags = body => { 
  const pattern = /#\[(\w+)\]\(\w+\)/g;
  const matches = body.match(pattern);
  if (matches) {
    // replace number inside () with the word inside []
    matches.forEach(match => {
      const start = match.split('](');
      const tagName = start[0].split('[')[1];
      const tagId = start[1].split(')')[0];
      if (Number(tagId)) {
        // replace the tagId with tagName
        body = body.replace(match, `#[${ tagName }](${ tagName })`);
      }
    }
    );
  }
  return body;

};

export { sanitizeInput, extractHashtags, replaceHashtags };