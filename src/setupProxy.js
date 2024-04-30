// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://aligned.corvo.com.np',
      changeOrigin: true,
      secure: false, // if your API uses HTTPS with a self-signed certificate
      pathRewrite: {
        '^/api': '/Authentication/register', // replace /api with your actual API route if necessary
      },
    })
  );
};