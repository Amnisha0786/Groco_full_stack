function responseFormat(res, message, data, status) {
  return res.status(status).json({
    message: message,
    data: data,
  });
}

module.exports = { responseFormat };
