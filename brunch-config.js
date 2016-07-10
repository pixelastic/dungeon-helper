module.exports = {
  notifications: false,
  files: {
    javascripts: {
      joinTo: {
        'vendors.js': /^(?!app)/,
        'app.js': /^app\/js/
      }
    },
    stylesheets: {
      joinTo: {
        'vendors.css': /^app\/vendors\/css/,
        'app.css': /^app\/css/
      }
    }
  },

  plugins: {
    babel: {
      pattern: /\.js$/
    },
    postcss: {
      processors: [
       require('autoprefixer')(['last 8 versions'])
      ]
    }
  },
  server: {
    port: 5010
  }
};
