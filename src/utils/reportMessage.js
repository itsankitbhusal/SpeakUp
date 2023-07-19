const reportMessage = (reportType, confessionTitle) => { 
  if (reportType === 'confession') {
    return `Your confession "${ confessionTitle }" has been reported`;
  }
  if (reportType === 'comment') {
    return `Your comment "${ confessionTitle }" has been reported`;
  }
  return null;
};

export { reportMessage };