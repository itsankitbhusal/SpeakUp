export const dateConverter = dateString => {
  const timeAgo = Date.parse(dateString) / 1000;
  const currentTime = Math.floor(Date.now() / 1000);
  const timeDifference = currentTime - timeAgo;

  const timeIntervals = [
    { interval: 1, label: 'second' },
    { interval: 60, label: 'minute' },
    { interval: 3600, label: 'hour' },
    { interval: 86400, label: 'day' },
    { interval: 604800, label: 'week' },
    { interval: 2629440, label: 'month' },
    { interval: 31553280, label: 'year' }
  ];

  for (let i = timeIntervals.length - 1; i >= 0; i--) {
    const { interval, label } = timeIntervals[i];
    const count = Math.round(timeDifference / interval);

    if (count >= 1) {
      if (count === 1) {
        return `one ${ label } ago`;
      } else {
        return `${ count } ${ label }s ago`;
      }
    }
  }

  return 'Just Now';
};

