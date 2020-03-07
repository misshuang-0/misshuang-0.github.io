$(function () {
    // 调用fullpage插件
    $('#container').fullpage({
        // 显示右侧的切换圆点
        navigation: true,
        // 鼠标滑到圆点提示文字
        navigationTooltips: ['第一页', '第二页', '第三页', '第四页', '第五页'],
        // 给每一页设置锚点,a标签中href输入该名称
        anchors: ['firstPage', 'secondPage', 'thirdPage','forthPage','fifthPage']
    });
})

$(function () {
    // page01 背景随机
    var length = 3;
    $('.page01Bg li:nth-child(3)').show();
    setInterval(function () {
        var randomBgIndex = Math.round(Math.random() * length);
        // console.log(randomBgIndex)
        $('#container .page01 .page01Bg li').eq(randomBgIndex).show().siblings().hide();
    },5000)
})

$(function () {
    // 导航点击类目切换文字颜色
    $('.myNav ul li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })

})