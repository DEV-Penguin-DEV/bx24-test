const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  mode: "development",
  optimization: {
    minimize: false, // Отключаем минимизацию JavaScript
  },
  performance: {
    hints: false, // Отключает предупреждения о размере ассетов и точки входа
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/, // Обрабатываем файлы .scss
        use: [
          "style-loader", // Вставляет стили в DOM
          "css-loader", // Загружает CSS-файлы
          "sass-loader", // Компилирует SCSS в CSS
        ],
      },
      // Другие правила для обработки стилей, изображений и других ресурсов
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
    // Другие плагины, если необходимо
  ],
  devServer: {
    port: 8080,
    onAfterSetupMiddleware(devServer) {
      devServer.app.post("*", (req, res) => {
        res.redirect(req.originalUrl);
      });
    },
    static: {
      directory: "./dist",
    },
  },
};
