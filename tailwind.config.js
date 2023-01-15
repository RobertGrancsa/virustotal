/** @type {(tailwindConfig: object) => object} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ],
});
