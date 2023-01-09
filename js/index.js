$(function() {


    var timer;

    var ul = $(".xtx-entry .banner ul")[0];
    $(".xtx-entry .banner").hover(function() {
        $(".xtx-entry .next,.xtx-entry .prev").stop().show();
        clearInterval(timer);
        timer = null;

    }, function() {
        $(".xtx-entry .next,.xtx-entry .prev").stop().hide();
        timer = setInterval(function() {
            $(".xtx-entry .banner .next").click();
        }, 2000)
    })

    // $(".xtx-entry .")

    // 轮播图
    // 根据原有的轮播图图片个数创建ol指示器

    var len = ul.children.length;
    for (var i = 0; i < len; i++) {
        var li = $("<li></li>");
        li.attr("index", i);
        $(".indicator").append(li);
    }

    $(".indicator li").eq(0).addClass("active");

    // 新增一张图片

    var li = $("<li><a href='javascript:;'><img src='./uploads/banner_1.png' alt=''></a></li>");
    $(".xtx-entry .banner ul").append(li);
    var num = 0;
    var flag = true;

    $(".xtx-entry .next").on("click", function() {
        // ps

        if (flag) {
            flag = false;
            num++;
            // ps
            console.log(num);
            // console.log(ul.children.length);

            // ps
            // console.log(ul.children.length);
            // if(num==$(".xtx-entry .banner ul").children.l)
            var step = num * $(".xtx-entry .banner li").width();
            // ps
            // console.log(step);



            $(".xtx-entry .banner ul").animate({
                left: -step
            }, 500, function() {
                flag = true;
                check();
            });

            if (ul.children.length - 1 == num) {
                num = 0;
                var step = num * $(".xtx-entry .banner li").width();
                $(".xtx-entry .banner ul").animate({
                    left: -step
                }, 0, function() {
                    flag = true;
                    check();
                });

                return false;
            }
        }

    })


    $(".xtx-entry .prev").on("click", function() {
        // ps

        if (flag) {
            flag = false;
            num--;
            // ps
            console.log(num);

            if (num < 0) {
                num = ul.children.length - 1;
                var step = num * $(".xtx-entry .banner li").width();
                $(".xtx-entry .banner ul").animate({
                    left: -step
                }, 0, function() {
                    flag = true;
                });
                num--;
            }
            // ps
            // console.log(ul.children.length);
            // if(num==$(".xtx-entry .banner ul").children.l)
            var step = num * $(".xtx-entry .banner li").width();
            // ps
            // console.log(step);



            $(".xtx-entry .banner ul").animate({
                left: -step
            }, 500, function() {
                flag = true;
                check();
            });
        }

    })

    function check() {
        $(".indicator li").eq(num).addClass("active").siblings().removeClass("active");
    }

    timer = setInterval(function() {
        $(".xtx-entry .banner .next").click();
    }, 2000)


    // 回到顶部模块






    $(window).scroll(function() {
        var topX = 0;
        topX = $(".xtx-brands-all").offset().top;
        if ($(document).scrollTop() >= topX) {
            $(".goback").fadeIn(200);
        } else {
            $(".goback").fadeOut(200);
        }



    })


    // 只能是元素做动画
    $(".goback").click(function() {
        $("body,html").animate({
            scrollTop: 0
        }, 600)
    })

    // $(".fixedtool ul").on("click", "li", function() {
    //     $(this).addClass("current").siblings().removeClass("current");
    // })


    // 互斥锁，防止点击造成的滚动影响滚动事件的代码
    var flag = true;

    // 判断页面被卷去的距离是否大于推荐模块的offsetTop值，大于显示电梯导航，小于隐藏
    function toolToggle() {
        if ($(document).scrollTop() >= $(".start").offset().top) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();

        }
    }

    // 页面刷新调用一次
    toolToggle();

    $(window).scroll(function() {
        toolToggle();
        if (flag) {
            // 通过滚动的距离切换电梯导航
            $('.w1').each(function(i, ele) {
                // console.log($(document).scrollTop());
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass("current");
                }
            })
        }



    })

    // 通过点击来跳转到指定内容
    $(".fixedtool li").click(function() {
        // 滚动事件不影响电梯导航
        flag = false;
        // 获取当前隐式迭代的索引号
        var index = $(this).index();
        // 页面滚动到指定距离
        var top = $(".w1").eq(index).offset().top;
        $("html,body").stop().animate({
            scrollTop: top + 1
        }, function() {
            // 滚动往后在解锁
            flag = true;
        })

        $(this).addClass("current").siblings().removeClass("current");

    })

})