import gulp from "gulp";

const copySvg = () => gulp.src("source/img/**/*.svg", { base: "source" }).pipe(gulp.dest("../newBuild"));

const copyImages = () => gulp.src("source/img/**/*.{png,jpg,webp}", { base: "source" }).pipe(gulp.dest("../newBuild"));

const copy = () =>
  gulp
    .src(["source/**.html", "source/fonts/**", "source/img/**", "source/favicon/**"], {
      base: "source",
    })
    .pipe(gulp.dest("../newBuild"));

export { copy, copyImages, copySvg };
