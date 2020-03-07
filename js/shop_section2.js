// section2 秒杀倒计时
$(function () {
        
        // 设置定时器  改变时间
        var time = setInterval(function () {
            var $hour = $('#count_down_hour').text();
            var $minute = $('#count_down_minute').text();
            var $second = $('#count_down_second').text();
            
            
            // 当时分秒都为0时，停止定时器
            if($hour == 0 & $minute == 0 & $second == 0){
                clearInterval(time);
                return;
            }

            
            // 当 秒 为0时，
            if($second == 0){
              
                // 分 减1，
                if($minute <= 10){
                    // 当 分 小于10  前面加'0'
                    // $minute-1  隐示转换成整型
                    $('#count_down_minute').text('0'+($minute-1));
                    // 当 分 为0时，
                    if($minute == 0){
                        // 当 时 不为0时，执行以下代码
                        if($hour != 0){
                            // 时 减1，
                            if($hour <= 10){
                                $('#count_down_hour').text('0' + ($hour - 1));
                            }else{
                                $('#count_down_hour').text($hour - 1);
                            }
                            // 分 变为59,
                            $('#count_down_minute').text(59);
                            
                            
                        }
                    }
                }else{
                    // 大于10 正常进行减1
                     $('#count_down_minute').text($minute-1);
                 }
                // 秒 变为60,
                $('#count_down_second').text(60);
            }
            // 秒 每隔1s减1
            if($('#count_down_second').text() <= 10){
                $('#count_down_second').text('0'+($second-1));
            }else{
                 $('#count_down_second').text($('#count_down_second').text()-1);
            }
            
        },1000);

})


// section2_center 滑动轮播图
$(function () {
    // 变量： 定时器，移动的距离
    var time1,time2,
        left1 = 0,left2 = 0;
    // 点击左按钮切换轮播图
    $('#center_btn_left').click(function () {
        
        time1 = setInterval(function () {
            if(left1 == 0){
                left1 = -2400;
                $('#center_img_list').css('marginLeft',left1);
            }
            
            left1 = parseInt($('#center_img_list').css('marginLeft')) + 50;
            // console.log($left)
            $('#center_img_list').css('marginLeft',left1);
            if(left1 % 800 == 0){
                clearInterval(time1);
            }
        },20)
    })
    // 点击右按钮切换轮播图
    $('#center_btn_right').click(function () {
        
        time2 = setInterval(function () {
            if(left2 <= -2400){
                left2 = 0;
                $('#center_img_list').css('marginLeft',left2);
            }
            
            left2 = parseInt($('#center_img_list').css('marginLeft')) - 50;
            // console.log($left)
            $('#center_img_list').css('marginLeft',left2);
            if(left2 % 800 == 0){
                clearInterval(time2);
            }
        },20)
    })
})


// section2_right 滑动轮播图
$(function () {
    // 变量： 定时器，移动的距离
    var time,
        left = 0,
        count;
    // 启动移动函数
    move();
    function move() {
        if(left <= -360){
            left = 0;
            $('#slide_wheel').css('marginLeft',0);
        }
        // 滑动的间隔时间
        var n = (left%180) == 0 ? 2400 : 16;
        
        // 将left的值赋值给 ul的marginLeft
        changeLeft();
        // 获取当前圆点的下标
        count = Math.floor(-left / 180);
        // 当下标等于2时，归零
        if(count == 2){
            count = 0;
        }

        // 左移的距离，逐渐递减
        left -= 10;

        //执行圆点函数，传进序号数的实参
        changeSpot(count);
        
        // 计时器 自调用
        time = setTimeout(move,n);
    }
    // 移动ul 函数
    function changeLeft() {
        $('#slide_wheel').css('marginLeft',left);
    }
    // 切换圆点
    function  changeSpot(count) {
        $('#spot_list li').eq(count).addClass('selected').siblings().removeClass('selected');
    }
    // 鼠标移入圆点，切换到指定的图片和圆点
    $('#spot_list li').mouseenter(function () {
        // 鼠标移入，停止定时器
        clearTimeout(time);
        // console.log($(this).index()), index()获取当前的下标
        var i = $(this).index();
        left = -i * 180;
        changeLeft(left);
        changeSpot(i);
    }).mouseleave(function () {
        // 鼠标移开，重新启动移动函数
        move();
    })
})
