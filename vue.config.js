module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        host: 'localhost',
        port: 8000,
        open: true,
    },

    pwa: {
        iconPaths: {
            favicon32: 'zkl.png',
            favicon16: 'zkl.png',
            appleTouchIcon: 'zkl.png',
            maskIcon: 'zkl.png',
            msTileImage: 'zkl.png'
        }
    }
}