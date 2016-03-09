/**
 * Created by hanzhao on 16/3/7.
 */

$(function() {
    var press_time = 100,  // 计时器启动时间
        timing_step = '',  // 计时阶段, 未准备: '', 已准备: 'prepare', 计时中: 'timing'
        timing_record = 0,
        pressed_timer_flag = false,
        start_record = 0;
    //var timer_stopwatch_color = $('.timer-color input').val();

    function display_timing_record(t) {
        $("#ms3").text(t % 1000 % 10 | 0)
        $("#ms2").text(t % 1000 % 100 / 10 | 0)
        $("#ms1").text(t % 1000 / 100 | 0)
        $("#s2").text(t / 1000 % 60 % 10 | 0)
        $("#s1").text(t / 1000 % 60 / 10 | 0)
        $("#m2").text(t / 1000 / 60 % 10 | 0)
        $("#m1").text(t / 1000 / 60 / 10 | 0)
    }

    document.addEventListener("keydown", function(e) {
        if($("#chart_content").not(':focus') && $('.button-show-timer').data('status')==1){
            if (e.keyCode == 90 && !timing_step && !pressed_timer_flag) {
                e.preventDefault()
                pressed_timer_flag = true
                $("#htimer>.msms").css("color", "red")
                pressed_timer = setTimeout(function() {
                    timing_step = "prepare"
                    $("#htimer>.msms").css("color", "green")
                    display_timing_record(0)
                    clearTimeout(pressed_timer)
                    pressed_timer_flag = false
                    timing_record = 0
                }, press_time)
            }

            if (1 || e.keyCode == 90 || e.keyCode == 27) {
                if (timing_step == "timing") {
                    timing_step = "finishing"
                    clearTimeout(start_timer)
                    min_part = $('#m1').text() + $('#m2').text()
                    sec_part = $('#s1').text() + $('#s2').text()
                    ms_part =  $('#ms1').text() + $('#ms2').text() + $('#ms3').text()
                    if($('.button-auto-send').data('status')==1){
                        var whole_time
                        if(min_part=='00'){
                            whole_time = sec_part + '.' + ms_part
                        }
                        else{
                            whole_time = min_part+ ':' + sec_part + '.' + ms_part
                        }
                        content.sendDouyuMsg(whole_time)
                    }

                }
            }
        }

    }, false);
    document.addEventListener("keyup", function(e) {
        if($("#chart_content").not(':focus')){
            if (e.keyCode == 90) {
                if (timing_step == "prepare" || timing_step == "observing") {
                    timing_step = "timing"
                    start_record = (new Date()).valueOf()
                    $("#htimer>.msms").css("color", $('.timer-color input').val())
                    start_timer = setInterval(function () {
                        timing_record = (new Date()).valueOf() - start_record
                        display_timing_record(timing_record)
                    }, 1)
                } else {
                    if (pressed_timer_flag) {
                        clearTimeout(pressed_timer)
                        $("#htimer>.msms").css("color", $('.timer-color input').val())
                        pressed_timer_flag = false
                    }
                }
            }

            if (timing_step == "finishing") timing_step = ""
        }

    }, false);
});

