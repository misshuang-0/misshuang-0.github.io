$(window).on('load',function () {
    waterFall();
})

// 瀑布流方法
function waterFall(){
    // 1.求出列数
    var box = $('.box');
    var boxWidth = box.outerWidth();             //当前图片的宽度
    var screenWidth = $('#main').width();    //图片展示区的宽度
    var columns = parseInt(screenWidth / boxWidth);   //列数
    // 2.创建数组,存放图片的高度值
    var heightArr = [];
    // 3.对图片进行遍历循环，第一排图片不需要定位，取出其高度值，其它排进行定位处理
    $.each(box,function (index,item) {
        // 取出对应图片的高度
        var boxHeight = $(item).outerHeight();
        // 判断是否是第一排的图片
        if(index < columns){    //如果是第一排
            // 将图片的高度存入数组
            heightArr[index] = boxHeight;
        }else{      //如果不是第一排
            // 求最小图片的索引，和其高度
            var minHeight = Math.min(...heightArr);
            // 索引
            var minIndex = $.inArray(minHeight,heightArr);
            $(item).css({
                position: 'absolute',
                // left: 最小图片高度的索引*图片的宽度
                left: minIndex * boxWidth + 'px',
                // top: 最小图片高度
                top: minHeight + 'px'
            })
            // 高度追加
            heightArr[minIndex] += boxHeight;
        }
    })
}