const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/articles',
    createProxyMiddleware({
      target: 'http://localhost:9292',
      changeOrigin: true,
    })
  );
};
