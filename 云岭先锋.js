auto.waitFor()

// 将设备保持常亮
device.keepScreenDim();

setScreenMetrics(1080, 2340);

// 模拟随机时间
function random_time(time) {
    return time + random(100, 1000);
}

function sleep_random_time(time) {
    sleep(random_time(time));
}

// 模拟点击不可以点击元素
function click_non_clickable(target) {
    text(target).waitFor();
    let tmp = text(target).findOne().bounds();
    click(tmp.centerX(), tmp.centerY());
}

// 模拟点击可点击元素
function click_clickable(target) {
    text(target).waitFor();
    click(target);
}


// 点击文章标题
function click_article_title(target) {
    let text = target;
    if (target.length > 25) {
        text = text.substring(0, 25) + "...";
    }
    click_non_clickable(text);
}


function login() {
    sleep_random_time(500);
    if (!text('已获0先锋值/每天递增,最高3先锋值').exists()) {
        return;
    }
    toast("登录");
    click_non_clickable('登录签到');
    sleep_random_time(500);
    if (text('close-btn').exists()) {
        click_non_clickable('close-btn');
    }
    if (text('好的').exists()) {
        click_non_clickable("好的");
    }
}

function share() {
    sleep_random_time(500);
    if (text('已获5先锋值/每天最多5先锋值').exists()) {
        return;
    }
    toast("分享内容");
    click_non_clickable("分享内容");
    sleep_random_time(500);

    click_non_clickable('推荐');
    sleep_random_time(500);

    let tmp = className("android.view.View").depth(18).find();
    click_article_title(tmp[9].text());
    sleep_random_time(1000);
    // 顺便点赞
    click_non_clickable("点赞");
    sleep_random_time(500);
    for (let i = 0; i < 5; i++) {
        click_non_clickable("分享");
        sleep(1100);
        click_non_clickable("微信好友");
        sleep(1300);
        back();
        sleep(1100);
    }
    back();
    if (!text('好的').exists()) {
        back();
    }
    toast('分享成功');
    sleep_random_time(500);
    me();
    sleep_random_time(1000);
}


// 微党课学习
function micro_party_lecture_study() {
    sleep_random_time(500);
    if (text('已获4先锋值/每天最多4先锋值').exists()) {
        return;
    }
    toast("微党课学习");
    click_non_clickable("微党课学习");
    sleep_random_time(500);

    let tmp = className("android.widget.TextView").depth(16).find();
    let target = tmp[0].text();
    click_article_title(target);
    let sleep_time = 120000;
    sleep_random_time(sleep_time);
    back();
    sleep_random_time(500);
    click_article_title(target);
    sleep_random_time(sleep_time);
    back();
    sleep_random_time(500);
    back();
    sleep_random_time(500);
}

// 微视频观看
function micro_video_view() {
    sleep_random_time(500);
    if (text('已获6先锋值/每天最多6先锋值').exists()) {
        return;
    }
    toast("微视频观看");
    click_non_clickable("微视频观看");
    sleep_random_time(500);
    let tmp = className("android.view.View").depth(14).find();
    let target = tmp[0].text();
    click_non_clickable(target);
    let sleep_time = 183000;
    sleep_random_time(sleep_time);
    back();
    sleep_random_time(500);
    click_non_clickable(target);
    sleep_random_time(sleep_time);
    back();
    sleep_random_time(500);
    back();
}

// 近期重点学习
function recent_key_study() {
    sleep_random_time(500);

    let tmp = className("android.view.View").depth(16).find();
    if (tmp[50].text() === '已获10先锋值/每天最多10先锋值') {
        return;
    }

    toast("近期重点学习");
    sleep_random_time(500);
    click_non_clickable('近期重点学习');
    sleep_random_time(500);

    // 本来准备用<<中国共产党党章党规>>，但是云岭先锋有bug，有时候会刷不出来
    while (!text('没有更多数据了').exists()) {
        swipe(500, 2200, 500, 300, random_time(500));
    }

    click_non_clickable("不忘初心 牢记使命主题教育");
    sleep_random_time(1200);
    for (let i = 0; i < 5; i++) {
        click_non_clickable("论学习贯彻习近平总书记在主题教育总结大会上重要讲话");
        sleep_random_time(124000);
        back();
        sleep_random_time(500);
    }
    back();
    sleep_random_time(500);
    back();
}

// 党员随身听
function walkman() {
    sleep_random_time(500);
    if (!textContains('/每天最多10先锋值/每月最多310先锋值').exists()) {
        return;
    }
    toast("党员随身听");
    sleep_random_time(500);
    click_non_clickable('党员随身听');
    sleep_random_time(500);

    while (!text('中国共产党党徽党旗条例').exists()) {
        swipe(500, 1700, 500, 500, random_time(500));
    }
    click_non_clickable("中国共产党党徽党旗条例");
    sleep_random_time(1200);
    click_non_clickable('第一条')
    sleep_random_time(2000);
    // 党员随身听经常会出问题打不开，遇到则提示
    if (text("加载中，请稍候...").exists()) {
        sleep_random_time(5000);
    }
    if (text("加载中，请稍候...").exists()) {
        toast("党员随身听加载错误，请手动处理或待恢复后再执行一遍脚本");
    }
    back();
    sleep_random_time(500);
    back();
    sleep_random_time(500);
    back();
    sleep_random_time(500);
}

// 跳转到积分列表
function me() {
    if (text('先锋值明细').exists()) {
        for (let i = 0; i < 3; i++) {
            swipe(500, 500, 500, 1700, random_time(500));
        }
        return;
    }
    click_non_clickable('我');
    sleep_random_time(2000);
    click_non_clickable('先锋值');
}

app.launchApp('云岭先锋');
me();
login();
share();
swipe(500, 2000, 500, 500, random_time(500));
micro_party_lecture_study();
micro_video_view();
walkman();
recent_key_study();

device.cancelKeepingAwake();

//震动一秒
device.vibrate(1000);
toast('脚本运行完成');
exit();
