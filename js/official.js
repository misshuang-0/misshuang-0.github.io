// 导航栏点击切换字体颜色
$(function () {
    $('nav ul li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
})