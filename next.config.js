/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
module.exports = {
  env: {
    NEXT_PUBLIC_GOOGLE_ANALYTICS_ID: 'UA-50805440-1',
  },

  experimental: {
    modern: true,
  },

  future: {
    strictPostcssConfiguration: true,
  },

  webpack5: true,

  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/:slug*.html', // Old url with .html
        destination: '/:slug*', // Redirect without .html
      },
    ];
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
};
