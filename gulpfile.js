var del = require("del")
var path = require("path")
var replaceExt = require("replace-ext")
var gulp = require("gulp")
var watch = require("gulp-watch")
var pug = require("gulp-pug")
var sass = require("gulp-sass")
var coffee = require("gulp-coffee")

var src = [
  "app/layouts/**/*.pug",
  "app/views/**/*.pug",
  "app/styles/**/*.sass",
  "app/scripts/**/*.coffee",
  "app/scripts/**/*.js"
]

var dest = "dist"

var cnfg = {}
cnfg.watch = {
  ignoreInitial: false,
  verbose: true
}

var ext = {
  ".pug": ".html",
  ".sass": ".css",
  ".coffee": ".js",
  ".js": ".js"
}


gulp.task("default", [], () => {
  watcher = watch(src, cnfg.watch, (f) => {
    var f = path.relative(path.resolve(f.cwd), f.path)

    if (f.indexOf("layouts") !== -1) {
      console.log("Recompile all views")

      gulp.src("app/views/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest(dest))
      return
    }

    switch(path.extname(f)) {
      case ".pug":
        gulp.src(f)
          .pipe(pug())
          .pipe(gulp.dest(dest))
        break
      case ".sass":
        gulp.src(f)
          .pipe(sass())
          .pipe(gulp.dest(dest))
        break
      case ".coffee":
        gulp.src(f)
          .pipe(coffee())
          .pipe(gulp.dest(dest))
        break
      case ".js":
        gulp.src(f)
          .pipe(gulp.dest(dest))
        break
      default:
        console.log("Unknow extension")
    }
  })

  watcher.on("unlink", (f) => {

    var f = "dist/" + path.basename(f)
    f = replaceExt(f, ext[path.extname(f)])

    del(f)
  })
})