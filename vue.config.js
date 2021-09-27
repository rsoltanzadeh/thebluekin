const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        }
    },

    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/styles/_shared.scss";`,
            },
        },
    },

    lintOnSave: false
};
