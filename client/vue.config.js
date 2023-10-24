const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 18192, // Nếu tệp ảnh nhỏ hơn 8KB, nó sẽ được chuyển thành dạng base64
        name: 'img/[name].[hash:8].[ext]', // Đường dẫn lưu trữ tệp ảnh sau khi build
      });
  },
})
