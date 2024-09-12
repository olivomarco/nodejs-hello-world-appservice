const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  packageJsonPath: isProduction
    ? path.resolve(__dirname, '../package.json') // Adjust path for production
    : path.resolve(__dirname, '../../package.json'), // Adjust path for development
  // Add other configurations as needed
};
