// const { closeFlashWindow } = global.require('douyinUtils.js');
// const { closeFlashWindow } = require("./common/douyinUtils.js");
let { start_app, click_item, set_volume, wait_befor_click } = require('/sdcard/脚本/dypublish/common/lib.js');

// const { forceStopApp } = require("/sdcard/脚本/dypublish/common/common");

const { closeFlashWindow } = global.require("/sdcard/脚本/dypublish/common/douyinUtils.js");
// const { closeFlashWindow } = global.require("/sdcard/脚本/dypublish/common/douyinUtils.js");

// 导入 AutoJS 的相关模块
var packageName = "com.ss.android.ugc.aweme"; // 视频App的包名

// // 需要root
// forceStopApp(packageName);
// console.log("after forceStopApp");

closeFlashWindow();
console.log("after closeFlashWindow");

// 打开视频App
console.log("launch->"+packageName);
launch(packageName);

// 等待视频App加载完成
console.log("waitForPackage->"+packageName);
waitForPackage(packageName);

// 自动刷视频
console.log("before publish");
// publish();

console.log("after publish");


function findByDescAndClickAtBoundsCenter(desc) {
  try {
    var find = descContains(desc).findOne();
    log("enter->findByDescAndClickAtBoundsCenter desc:"+desc+",bounds="+find.bounds())
    click(find.bounds().centerX(), find.bounds().centerY())
  } catch (error) {
    log("findByDescAndClickAtBoundsCenter->error:"+error)
  }
}

function findByTextAndClickAtBoundsCenter(text) {
  try {
    var find = textContains(text).findOne();
    log("enter->findByTextAndClickAtBoundsCenter desc:"+text+",bounds="+find.bounds())
    click(find.bounds().centerX(), find.bounds().centerY())
  } catch (error) {
    log("findByTextAndClickAtBoundsCenter->error:"+error)
  }
}

// 自动刷视频函数
function publish() {

  try {
    log("enter publish")
    // var publishBtn = className("ImageView").find().length();
    // log(publishBtn)
    findByDescAndClickAtBoundsCenter("拍摄")

    // sleep(1000)

    findByDescAndClickAtBoundsCenter("相册")

    var count = id("com.ss.android.ugc.aweme:id/root_view").findOne().childCount();
    log("count->"+count)

    var find = id("com.ss.android.ugc.aweme:id/root_view").findOne().children()
    .forEach(function(child){
      log("className->"+child.className());
    });

    var findClickItem = id("com.ss.android.ugc.aweme:id/root_view").findOne().children().find(clickable());

    log("findClickItem->"+findClickItem)
    // if(findClickItem.nonEmpty()){
    //   log("find first"+findClickItem[0])
    // }
    var first = findClickItem.get(0);
    click(first.bounds().centerX(), first.bounds().centerY())
    sleep(1000)

    log("begin click 下一步")
    findByTextAndClickAtBoundsCenter("下一步")

    sleep(1000)
    log("begin click 编辑页面->下一步")
    findByTextAndClickAtBoundsCenter("下一步")
  
    log("1331")
  } catch (error) {
    log(error)
  }

}

start_app(publish, '抖音', '发布作品', true)