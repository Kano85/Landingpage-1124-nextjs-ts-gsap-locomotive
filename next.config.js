// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Iterate through all module rules
    config.module.rules.forEach((rule) => {
      // Check if the rule has a 'oneOf' property and it's an array
      if (rule.oneOf && Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach((oneOfRule) => {
          // Check if the rule handles SCSS/SASS files
          if (
            oneOfRule.test &&
            oneOfRule.test.toString().includes('scss') &&
            oneOfRule.use
          ) {
            // Ensure 'use' is an array before mapping
            if (Array.isArray(oneOfRule.use)) {
              oneOfRule.use = oneOfRule.use.map((useLoader) => {
                if (
                  useLoader.loader &&
                  useLoader.loader.includes('sass-loader')
                ) {
                  return {
                    ...useLoader,
                    loader: 'sass-loader', // Ensure it's using the latest sass-loader
                    options: {
                      ...useLoader.options,
                      implementation: require('sass'), // Use Dart Sass
                      // No additional options needed for the Modern JS API in sass-loader v13+
                    },
                  };
                }
                return useLoader;
              });
            }
          }
        });
      }
    });

    return config;
  },
};

module.exports = nextConfig;
