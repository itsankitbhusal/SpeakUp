export default {
  control: {
    fontSize: '1rem',
    fontWeight: 'normal'
  },
  
  '&multiLine': {
    control: {
      fontFamily: 'inter, sans-serif',
      minHeight: 260
    },
    highlighter: {
      padding: 9,
      border: '1px solid transparent'
    },
    input: {
      padding: 9,
      border: '1px solid silver'
    }
  },
  
  '&singleLine': {
    display: 'inline-block',
    width: 180,
  
    highlighter: {
      padding: 1,
      border: '2px inset transparent'
    },
    input: {
      padding: 1,
      border: '2px inset'
    }
  },
  
  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid rgba(0,0,0,0.15)',
      fontSize: 14
    },
    item: {
      padding: '5px 15px',
      borderBottom: '1px solid rgba(0,0,0,0.15)',
      '&focused': {
        backgroundColor: '#cee4e5'
      }
    }
  }
};