import gulp from "gulp";

const copySvg = () => gulp.src("source/img/**/*.svg", { base: "source" }).pipe(gulp.dest("../new"));

const copyImages = () => gulp.src("source/img/**/*.{png,jpg,webp}", { base: "source" }).pipe(gulp.dest("../new"));

const copy = () =>
  gulp
    .src(["source/**.html", "source/fonts/**", "source/img/**", "source/favicon/**"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));

export { copy, copyImages, copySvg };
