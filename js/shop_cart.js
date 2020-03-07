// 当鼠标滚轮 下滑的距离 = 购物车商品列表底部到页面顶部的距离时，隐藏底部的结算栏
$(function () {
    // 当商品列表展示商品数量小于等于4个时 ，
    getShopCount();

    // 实时获取滚轮下滑的距离
    $(window).scroll(function () {
        // var h = document.documentElement.clientHeight;
        // 获取得到的下滑距离
        var topDistance = document.documentElement.scrollTop || document.body.scrollTop;
        // console.log(topDistance)
        // 获取商品列表底部到页面顶部的距离
        var listHeight = 164 + parseInt($('#cart_list').css('height')) - document.documentElement.clientHeight;
        // console.log(listHeight)
        if(topDistance >= listHeight){
            $('#bottom_sum').removeClass('fixed');
        }else{
            $('#bottom_sum').addClass('fixed');
        }
    })
    // console.log($('#cart_list').css('height'))
})

// 函数：监听页面商品数量
function getShopCount() {
    // 当页面商品数量小于或等于4个时，底部结算去除fixed定位
    var len = $('.cart_item .item_list_item').length;
    if(len <= 4){
        // 底部结算去除fixed定位
        $('#bottom_sum').removeClass('fixed');
    }
    // 当页面商品数量为0时，
    if(len == 0){
        // 删除商品栏
        $('.cart').remove();
        // 删除底部结算栏
        $('#bottom_sum').remove();
        // 显示 ‘空空如也’ 盒子
        $('.cart_empty').show();
    }
}

// 所有商品全选    
$(function () {
    // 点击全选 input
    $('.select_all_box').click(function () {
        // 获取 checked 的值
        var bool = $(this).prop('checked');
        // 将下面全部全选 赋一样的值
        $('.select_all_box').prop('checked',bool);
        // 将每个店铺的全选赋一样的值
        $('.select_item_all').prop('checked',bool);
        // 将每个商品的全选赋一样的值
        $('.select_item_box').prop('checked',bool);

        // 计算已选商品数量函数
        choosed_count();
    })
})

// 单个店铺商品全选
$(function () {
    // 点击 单个店铺全选 input
    $('.select_item_all').click(function () {
        // 获取 checked 的值
        var bool = $(this).prop('checked');
        // 将该店铺每个商品的全选赋一样的值
        // 点击全选的 父元素 的后代 类名为 select_item_box 的子元素，checked赋值
        $(this).parents('.cart_item').find('.select_item_box').prop('checked',bool);

        // 计算已选商品数量函数
        choosed_count();
    })
})

// 当单个店铺的所有商品都被选中时，单个店铺商品全选 也被选中
$(function () {
    // 单个商品被点击时
    $('.select_item_box').click(function () {
        // 设置一个变量，存放店铺的全选框
        var $select_item_all = $(this).parents('.cart_item').find('.select_item_all');

        // 当 当前复选框是选中时
        if($(this).prop('checked')){

            // 判断当前店铺的商品 是否的都选择的
            // 设置一个变量，记录复选框被选中的数量
            var count = 0;
            // 获取 该店铺的所有商品复选框
            var select_box = $(this).parents('.item_list').find('.select_item_box');
            // 遍历所有复选框，是否为选中
            select_box.each(function (i) {
                if($(this).prop('checked')){
                    count ++;
                }
            })
            // 如果选中的个数 = 总共复选框的个数，则店铺 全选 为 选中
            if(count == select_box.length){
                $select_item_all.prop('checked',true);
            }

            // 判断当前页面的商品 是否的都选择的,如果是，页面全选被选中
            // 设置一个变量，记录复选框被选中的数量
            var num = 0;
            // 获取 该页面的所有商品复选框
            var select_box_all = $('.select_item_box');
            // 遍历所有复选框，是否为选中
            select_box_all.each(function (i) {
                if($(this).prop('checked')){
                    num ++;
                }
            })
            // 如果选中的个数 = 总共复选框的个数，则页面 全选 为 选中
            if(num == select_box_all.length){
                $('.select_all_box').prop('checked',true);
            }

        }else{  // 当 当前复选框是未选中时
            // 店铺 全选 为 未选中
            // 店铺全选为未选中，页面全选为未选中
            $select_item_all.prop('checked',false);
            $('.select_all_box').prop('checked',false);
        }

        // 计算已选商品数量函数
        choosed_count();
    })
})

// 当所有店铺的全选都被选中时，页面全选 也被选中
$(function () {
    // 单个店铺全选 被点击时
    $('.select_item_all').click(function () {
        
        // 当 当前复选框是选中时
        if($(this).prop('checked')){
            // 设置一个变量，记录复选框被选中的数量
            var count = 0;
            // 获取 所有店铺全选的复选框
            var selectAll_box = $(this).parents('.cart_list').find('.select_item_all');
            // 遍历所有复选框，是否为选中
            selectAll_box.each(function (i) {
                if($(this).prop('checked')){
                    count ++;
                }
            })
            // 如果选中的个数 = 总共店铺复选框的个数，则页面 全选 为 选中
            if(count == selectAll_box.length){
                $('.select_all_box').prop('checked',true);
            }
        }else{  // 当 当前复选框是未选中时
            // 页面 全选 为 未选中
            $('.select_all_box').prop('checked',false);
        }
    })
})

// 商品列表 点击删除  删除该商品
$(function () {
    $('.delete_shop').click(function () {
        // 获取当前商品的 父级 cart_item 盒子
        var $cart_item = $(this).parents('.cart_item');

        // 获取该店铺总共的商品数量
        var count = $(this).parents('.item_list').find('.item_list_item').length;
        
        // 弹出确认框
        var bool = confirm('确定删除该商品吗？');
        // 如果点击确定
        if(bool){
            // 删除 该商品
            $(this).parents('.item_list_item').remove();
            // 商品数量 -1
            count --;
            // 当所有商品删除完了
            if(count == 0){
                // 删除父级盒子
                $cart_item.remove();
            }
        }

        // 当商品列表展示商品数量小于等于4个时 ，
        getShopCount();
    })
})

// 商品数量 增加和减少
$(function () {
    
    // 点击增加按钮
    $('.add').click(function () {
        // 获取 当前 数值
        var num = parseInt($(this).prev().val());
        num ++;
        // 此时数值大于 1，改变reduce的字体颜色
        $(this).prev().prev().addClass('canClick');
        // 数字递增
        $(this).prev().val(num);

        // 改变小计的金额
        // 金额为 数量(num) * 单价
        // 获取单价
        var unit_price = $(this).parents('.quantity').prev().find('p:first span').text();
        // console.log(num);
        // console.log(unit_price)
        // 小计金额
        var sum = (num * unit_price).toFixed(2);
        // 设置小计金额
        $(this).parents('.quantity').next().children('span').text(sum);

        // 计算已选商品数量函数
        choosed_count();
    })
    
    // 点击减少按钮
    $('.reduce').click(function () {
        // 获取 当前 数值
        var num = parseInt($(this).next().val());
        // 当数值为1 时，停止递减，并且改变reduce的字体颜色
        if(num == 2){
            $(this).removeClass('canClick');
        }
        if(num <= 1){
            return;
        }
        // 数字递增
        num --;
        // 设置 数值
        $(this).next().val(num);
        
        // 改变小计的金额
        // 金额为 数量(num) * 单价
        // 获取单价
        var unit_price = $(this).parents('.quantity').prev().find('p:first span').text();
        // console.log(num);
        // console.log(unit_price)
        // 小计金额
        var sum = (num * unit_price).toFixed(2);
        // 设置小计金额
        $(this).parents('.quantity').next().children('span').text(sum);
        
        // 计算已选商品数量函数
        choosed_count();
    })
})


// 计算已选商品数量函数,和计算总价金额
function choosed_count() {

    // 设置一个变量，存储被选中商品的数量
    var num = 0;
    // 设置一个变量，存储被选中商品的小计和
    var all_sum = 0;

    // 遍历所有商品
    // console.log($('.item_list_item'))
    $('.item_list_item').each(function () {
        // 如果当前商品 是被选中的,选中数量增加 该商品的个数
        if($(this).find('.select_item_box').prop('checked')){
            // 被选中的数量 = 自身 + 选中商品的个数
            num += parseInt($(this).find('.godds_num').val());
            // 总价金额 = 被选中商品的小计和
            all_sum += parseInt($(this).find('.sum span').text());
        }
    })
    // 将该数量，赋值给已选商品的数量
    $('#choosed_shops em').text(num);

    // 将选中商品的小计和，赋值给总价
    $('#total_sum .total span').text(all_sum.toFixed(2));

}

// 将已选商品数量  和商品总价清零
function clearTotal() {
    var num = 0;
    $('#choosed_shops em').text(num);
    $('#total_sum .total span').text(num.toFixed(2));
}

// 删除选中商品
$(function () {
    $('#delete_select').click(function () {
        // 遍历 商品，删除复选框被选中的商品
        $('.item_list_item').each(function () {
            // 该商品的 店铺列表
            var $item_list = $(this).parent();
            //  店铺最外层父级盒子（整个店铺）
            var  $cart_item = $(this).parents('.cart_item');

            // 当该商品的复选框是选中时
            if($(this).find('.select_item_box').prop('checked')){
                // 给选中的复选框添加类名‘delete_item’
                $(this).addClass('delete_item');
            }
        })

        // 弹出确认框，是否删除
        var bool = confirm('确认删除选中的商品吗？');
        // 确认是
        if(bool){
            // 所有选中商品的 店铺列表
            var $item_list = $('.delete_item').parent();

            // 删除类名为 delete_item 的商品
            $('.delete_item').remove();
            
            // 设置一个数组，存放所有选中商品的jq对象，以及它所在店铺的商品数量
            var shop_len = [
                {
                    name: '',
                    count: 0
                }
            ];
            
            // 遍历 所有选中商品的 店铺列表
            for(var i = 0; i < $item_list.length;i ++){
                // 将这些选中商品的名字与店铺商品数量，一一赋值给shop_len数组
                shop_len[i] = {
                    name: $($item_list[i]),         //赋值选中商品名
                    count: $($item_list[i]).children().length   //赋值店铺商品数量
                }
            }

            // 遍历 shop_len 数组
            for(var i = 0; i < shop_len.length; i ++){
                // 如果某个选中商品删除后，店铺的数量为0，
                if(shop_len[i].count == 0){
                    // 删除该店铺
                    shop_len[i].name.parents('.cart_item').remove();
                }
            }
        }

        // 将已选商品数量  和商品总价清零
        clearTotal();

        // 当商品列表展示商品数量小于等于4个时 ，
        getShopCount();
    })
})

// 清空购物车
$(function () {
    $('#delete_all').click(function () {
        var bool = confirm('确定删除所有商品吗？');
        // 确定
        if(bool){
            // 删除商品列表
            $('.cart').remove();
            // 删除底部结算
            $('#bottom_sum').remove();
            // 显示 ‘空空如也’
            $('.cart_empty').show();
        }
    })
})