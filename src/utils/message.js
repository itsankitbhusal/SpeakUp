const error = (message, status = 400) => ({
  success: false,
  message,
  status
});
const success = data => ({
  success: true,
  data
});

export default { error, success };