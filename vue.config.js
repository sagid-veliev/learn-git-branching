const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://45.12.73.11:5000/',
                ws: true,
                changeOrigin: true,
            },
        },
    },
});
