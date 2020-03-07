
// 触顶事件
$(function () {
    // 实时获取滚轮下滑的距离
    $(window).scroll(function () {
        // 滚轮滑到section2时的距离
        var topDistance = document.documentElement.scrollTop || document.body.scrollTop;
        if(topDistance >= 676){
            $('#right_nav').addClass('fixed');
            $('#form_box').addClass('fixed');
        }else if(topDistance <= 676){
            $('#right_nav').removeClass('fixed');
            $('#form_box').removeClass('fixed');
        }
    })
})