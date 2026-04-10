import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
remotePatterns: [
{ protocol: 'https', hostname: 'avatars.githubusercontent.com' },
{ protocol: 'https', hostname: 'ui-avatars.com' }
]
},
webpack: (config) => {
config.resolve.alias = {
...config.resolve.alias,
'@': './src',
};
return config;
}
};
export default withNextIntl(nextConfig);