const Fontmin = require('fontmin');

const srcPath = 'src/assets/font/HYQingYaTiF.ttf'; // 字体源文件
const destPath = 'src/assets/extract_font'; // 输出路径
const text = '早上上午中午下午晚上好哟';

// 初始化
const fontmin = new Fontmin()
  .src(srcPath) // 输入配置
  .use(
    Fontmin.glyph({
      // 字型提取插件
      text: text // 所需文字
    })
  )
  .dest(destPath); // 输出配置

// 执行
fontmin.run(function(err, files, stream) {
  if (err) {
    // 异常捕捉
    console.error(err);
  }

  console.log('done'); // 成功
});
