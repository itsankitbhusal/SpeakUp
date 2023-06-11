import { createContext, useState } from 'react';

const CommentContext = createContext();

const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);

  const addComment = comment => {
    setComments(prevData => [comment, ...prevData]);
    setCommentCount(prevCount => prevCount + 1);
  };

  return(
    <CommentContext.Provider value={{ comments, setComments, commentCount, setCommentCount, addComment, page, setPage, size, setSize }}>
      {children}
    </CommentContext.Provider>
  );
};

export { CommentContext, CommentProvider };