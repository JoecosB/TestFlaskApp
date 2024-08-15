module.exports = {
  devServer: {
    hot: false,
    liveReload: false,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
};