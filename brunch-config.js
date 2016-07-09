module.exports = {
  notifications: false,
  files: {
    javascripts: {
      joinTo: {
        'vendor.js': /^(?!app)/,
        'app.js': /^app/
      }
    },
    stylesheets: {joinTo: 'app.css'}
  },

  plugins: {
    babel: {
      pattern: /\.js$/
    }
  },
  server: {
    port: 5010
  }
};
