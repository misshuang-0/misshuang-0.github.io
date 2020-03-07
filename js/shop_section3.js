
$(function () {
    // section3_right 轮播滚动条_图片
    var time,
        left = 0;

    // 图片移动定时器
    time = setInterval(moveImg,24);
    // 图片移动函数
    function moveImg() {
        if(left <= -2000){
            left = 0;
        }
        // 将left的值赋值给 盒子 的marginLeft 逐渐移动
        changeLeft();

        // 滚轮随着left 的改变而移动位置
        // changeScroll()

        left -= 1;
    }

    // 将left的值赋值给 盒子 的marginLeft 逐渐移动
    function changeLeft() {
        $('#section3_right_inner').css('marginLeft',left)
    }
    // 滚轮随着left 的改变而移动位置
    function changeScroll() {
        var left2 = left/2.338;
        $('.section3_right .scroll_points').css('left',-left2);
    }
    // 鼠标移入盒子， 停止移动(关闭定时器)
    $('.section3_right').mouseenter(function () {
        // console.log('mouse---------enter')
        clearInterval(time);
    }).mouseleave(function () {
        // console.log('mouseleave')
        // 重新开启定时器
        time = setInterval(moveImg,24);
    })

    
    // 滚轮
    // 拖动滚轮  移动滚轮  和图片栏
    // var scrollLeft,imgLeft;
    // // 记录鼠标点击下去时，图片的位置，并打开鼠标移动事件
    // $('.section3_right .scroll_points').mousedown(function (e) {
    //     // // 阻止冒泡事件
    //     // e.stopPropagation();
    //     // 设变量$this,方便调用
    //     var $this = $('.section3_right .scroll_points');
    //     // 记录此时图片的位置
    //     imgLeft = parseInt($('#section3_right_inner').css('marginLeft'));

    //     //鼠标移动，滚条跟着移动函数 
    //     function move(e) {
    //         // // 阻止冒泡事件
    //         // e.stopPropagation();

    //         // 滚轮跟随鼠标的clientX变化而变化，因为离页面最左边有默认的距离，所以减去364(估算的)
    //         scrollLeft = e.clientX - 364;
    //         // console.log(e.clientX)
    //         console.log(imgLeft)
    //         // 图片跟随鼠标的clientX变化而变化
    //         myLeft = imgLeft - (e.clientX - 364);
    //         if(myLeft <= -2000){
    //             myLeft = 0;
    //         }else if(myLeft >= 0){
    //             myLeft = -2000;
    //         }

    //         $('#section3_right_inner').css('marginLeft',myLeft)
            

    //         // 当滚轮滑到最左边，停止滑动
    //         if(scrollLeft <= 0){
    //             scrollLeft = 0;
    //         // 当滚轮滑到最右边，停止滑动
    //         }else if(scrollLeft >= 852){
    //             scrollLeft = 852;
    //         }
    //         // 将scrollLeft值赋给滚轮
    //         $this.css('left',scrollLeft);
    //     }
    //     // 鼠标移动事件               鼠标抬起事件
    //     $('body').bind('mousemove',move).mouseup(function (e) {
    //         // // 阻止冒泡事件
    //         // e.stopPropagation();
    //         // 移出鼠标移动事件
    //         $('body').unbind('mousemove',move);
    //         // 改变left的值，为图片此时的marginLeft
    //         left = $('#section3_right_inner').css('marginLeft');
    //         // 执行图片移动函数
    //         changeLeft();
    //         // 执行滚轮移动函数
    //         // changeScroll();
    //     })
    // })
})

