const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://45.12.73.11:5001/',
                ws: true,
                changeOrigin: true,
            },
        },
    },
});
