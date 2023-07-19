//   find comment milestone for 1, 10, 50, 100, 1k and so on and set as notification to user
const commentMileStone = (numOfComments, confessionTitle) => {
  const milestones = [1, 10, 50, 100, 1000, 10000, 100000, 1000000];
  const milestone = milestones.find(ms => numOfComments === ms);
  const k = 1000;
  const m = 1000000;
  const b = 1000000000;
        
  if (milestone >= b) {
    return `Your confession "${ confessionTitle }" has reached ${ numOfComments / b }b comments`;
  }
  if (milestone >= m) {
    return `Your confession "${ confessionTitle }" has reached ${ numOfComments / m }m comments`;
  }
  if (milestone >= k) {
    return `Your confession "${ confessionTitle }" has reached ${ numOfComments / k }k comments`;
  }
  if (milestone) {
    return `Your confession "${ confessionTitle }" has reached ${ milestone } comments`;
  }
  return null;
};

export { commentMileStone };