$(function () {
    // 顶部导航：地址选项卡，鼠标点击，切换province的active状态
    $('.address .dropdown_ads .province .pro_item').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

    // 搜索栏：搜索框 placeholder 和热门关键词第一个 内容切换
    var keywords = ['九阳电水壶','空气净化器','口罩','蚕丝被','闪迪存储卡'];
    var firstWords = ['生鲜春节送','萌宝闹元宵','飞利浦电视']
    // 1.设置默认值
    $('#setText').attr('placeholder',keywords[0]);
    $('#firstWord').text(firstWords[0]);
    // 2.切换关键词
    var i = 1;
    // 设置搜索框切换内容
    function changekeywords() {
        $('#setText').attr('placeholder',function () {
            var key;
            key = keywords[i];
            return key;
        })
        i++;
        if(i == keywords.length){
            i = 0;
        }
    }
    var searchT = setInterval(changekeywords,3500);
    
    // 设置热门关键词第一个切换内容
    var j = 1;
    function changefirstWord() {
        $('#firstWord').text(firstWords[i]);
        j++;
        if(j == firstWords.length){
            j = 0;
        }
    }
    setInterval(changefirstWord,2600);

    // 当鼠标聚焦搜索框时，不切换关键词
    $('#setText').focus(function () {
        clearInterval(searchT);
    })

    // 当搜索框失去焦点时，切换关键词
    $('#setText').blur(function () {
        searchT = setInterval(changekeywords,3500);
    })

    // section1  banner 轮播图
    var bannerTime,
        count = 1;
    bannerTime = setInterval(bannerMove,2500);
    function bannerMove() {
        if(count > 4){
            count = 0;      //0~4,共5张图
        }
        changeBanner(count);
        count ++;
    }
    // 切换图片  切换点
    function changeBanner(n) {
        $('.center_banner ul.img_list li').removeClass('active').eq(n).addClass('active');
        $('.center_banner ul.spot_list li').removeClass('choosed').eq(n).addClass('choosed');
    }
    // 鼠标移入和移出图片
    $('.center_banner ul.img_list li').mouseenter(function () {
        clearInterval(bannerTime);
    }).mouseleave(function () {
        bannerTime = setInterval(bannerMove,2000);
    });
    // 鼠标移入和移出圆点
    $('.center_banner ul.spot_list li').mouseenter(function () {
        clearInterval(bannerTime);
        changeBanner($(this).index());
        count = $(this).index() + 1;
    }).mouseleave(function () {
        bannerTime = setInterval(bannerMove,2000);
    });
    
    // 左右切换按钮
    $('#btn_left').click(function () {
        count --;
        if(count <= 0){
            count = 5;
        }
        changeBanner(count - 1);
    })
    $('#btn_right').click(function () {
        if(count > 4){
            count = 0;
        };
        count ++;
        changeBanner(count - 1);
    })
})

// section1  center_右侧轮播
$(function () {
    var wheelTime,
        count = 1;
    // 切换图片
    wheelTime = setInterval(wheelMove,4000)
    function wheelMove() {
        if(count > 2){
            count = 0;
        }
        changeWheel(count);
        count ++;
    }
    function changeWheel(n) {
        $('.center_right .right_wheel ul li').removeClass('active').eq(n).addClass('active');
    }
    // 鼠标移入li 暂停轮播
    $('.section1_center .center_right .right_wheel').mouseenter(function () {
        clearInterval(wheelTime);
    }).mouseleave(function () {
        wheelTime = setInterval(wheelMove,2000);
    })
    // 左右切换按钮
    $('#wheel_left').click(function () {
        count --;
        if(count <= 0){
            count = 3;
        }
        changeWheel(count - 1);
    });
    $('#wheel_right').click(function () {
        if(count > 2){
            count = 0;
        }
        changeWheel(count);
        count ++;
    })
})

// section1 右侧 底部icon 鼠标滑过效果
$(function () {
    var time;
    var time2;
    $('.service_inner ul.icon_list li.can_drop').mouseenter(function () {
        var num = 0;
        var $this = $(this);
        time = setInterval(function () {
            num += 5;
            if(num < 150){
                return;
            }
            $('.section1_right .right_bottom .service_inner ul.icon_list').addClass('active');
            $('#dropdown_box').addClass('show');
            $this.addClass('turnRed').siblings().removeClass('turnRed');
        },5)
    }).mouseleave(function () {
        clearInterval(time);
    })
    // 滑过游戏时，特殊处理（上拉距离更多）
    $('.service_inner ul.icon_list li#game_drop').mouseenter(function () {
        var num = 0;
        time2 = setInterval(function () {
            num += 5;
            if(num < 150){
                return;
            }
            $('.service_inner ul.icon_list li#game_drop').addClass('active');
        },5)
    }).mouseleave(function () {
        clearInterval(time2)
    })

    // 上拉盒子  title滑过时添加class 'selected',移出其它li 的'selected'
    $('#dropdown_box ul.title li').mouseenter(function () {
        $(this).addClass('selected').siblings().removeClass('selected');
    })

    // 点击 x 关闭上滑出的盒子,icon_list回到原处  游戏li回到原处,取消li选中状态
    $('#close_btn').click(function () {
        $('.section1_right .right_bottom .service_inner ul.icon_list').removeClass('active');
        $('#dropdown_box').removeClass('show');
        $('.service_inner ul.icon_list li#game_drop').removeClass('active');
        $('.service_inner ul.icon_list li.can_drop').removeClass('active');
    })
})
