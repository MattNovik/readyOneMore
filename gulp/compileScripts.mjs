import gulp from "gulp";
import webpackStream from "webpack-stream";
import webpackConfig from "../webpack.config.cjs";

const compileScripts = () =>
  gulp.src(["source/js/main.js"]).pipe(webpackStream(webpackConfig)).pipe(gulp.dest("../newBuild/js"));
export default compileScripts;
