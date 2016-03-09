var content = {
    addDouyuButton:function(){
        jshtml='<script type="text/javascript" src="http://1.hadaphp.sinaapp.com/douyu.js"></script>'
        mainbutton_html=jshtml+'<div class="douyubutton" style="top: 0px;float:left; margin-left: 20px; position: relative; z-index:999999999">' +
            '<button type="button" class="button-show-timer extension-btn">计时器</button>' +
            '<button type="button" class="button-auto-send extension-btn">自动发送</button>' +
            '<button type="button" class="button-timer-setting extension-btn">设置</button></div>'+
            '<div id="timer-setting"><div class="timer-setting"><p>计时器位置</p><div class="timer-position"><span>上:</span><input type="text" id="timer-position-top"></div>' +
            '<div class="timer-position"><span>下:</span><input type="text" id="timer-position-bottom"></div>' +
            '<div class="timer-position"><span>左:</span><input type="text" id="timer-position-left"></div>' +
            '<div class="timer-position"><span>右:</span><input type="text" id="timer-position-right"></div></div>' +
            '<div class="timer-size" ><p>大小</p><input type="text"></div>'+
            '<div class="timer-color" ><p>颜色</p><input type="color"></div></div>';

        $('#box_div').after(mainbutton_html)
        $(".button-send-msg").data('status',0);
        $(".button-auto-send").data('status',0);
        $(".button-show-timer").data('status',0);
        setTimeout(simpletimer.loadsetting,100)



        $('.button-auto-send').on('click',function(){
            if ($(this).data('status')==0){
                $(this).data('status',1);//1开启 0暂停中
                $(this).text('自动发送开启')
            }
            else
            {
                $(this).data('status',0);//1开启 0暂停中
                $(this).text('自动发送关闭')
            }
        })

        $('.button-show-timer').on('click',function(){
                if ($(this).data('status')==0){
                    $(this).data('status',1);//1开启 0暂停中
                    $('#htimer').css('display','block')
                    $(this).text('计时器启用中..')
                }
            else
                {
                    $(this).data('status',0);//1开启 0暂停中
                    $('#htimer').css('display','none')
                    $(this).text('计时器关闭')
                }
        })


        $('.button-timer-setting').on('click',function(){
            $('#timer-setting').fadeToggle();
        })

        $('#timer-setting input').on('change',function(){
            simpletimer.setting()
        })

    },
    sendDouyuMsg:function(sendmsg){
        $("#chart_content").val(sendmsg);
        $("#sendmsg_but").click();
        setTimeout(function(){
            $("#chart_content").blur()
        },100)
    }
}


var simpletimer = {
    addTimer: function(){
        timerhtml ='<div id="htimer" class="timer_section" style="display: none"> ' +
            '<div id="msms" class="msms"> ' +
            '<span id="m1">0</span><span id="m2">0</span>:<span id="s1">0</span><span id="s2">0</span>.<span id="ms1">0</span>' +
            '<span id="ms2">0</span><span id="ms3">0</span> </div> </div>'
        $('body').append(timerhtml)
    },
    settinginit:function(){
        window.localStorage.setItem('timer-position-top','75%');
        window.localStorage.setItem('timer-position-bottom','80%');
        window.localStorage.setItem('timer-position-left','40%');
        window.localStorage.setItem('timer-position-right','40%');
        window.localStorage.setItem('timer-size','50px');
        window.localStorage.setItem('timer-color','#ffffff')
        //var timer_position_top = window.localStorage.getItem('timer-position-top');
        //var timer_position_bottom = window.localStorage.getItem('timer-position-bottom');
        //var timer_position_left = window.localStorage.getItem('timer-position-left');
        //var timer_position_right = window.localStorage.getItem('timer-position-right');
        //var timer_size = window.localStorage.getItem('timer-size');
        //var timer_color =  window.localStorage.getItem('timer-color')
        //$('#timer-position-top').val(timer_position_top)
        //$('#timer-position-bottom').val(timer_position_bottom)
        //$('#timer-position-left').val(timer_position_left)
        //$('#timer-position-right').val(timer_position_right)
        //$('.timer-size input').val(timer_size)
        //$('.timer-color input').val(timer_color)

    },
    setting:function(){
      var  position_top = $('#timer-position-top').val()
      var  position_bottom = $('#timer-position-bottom').val()
      var  position_left = $('#timer-position-left').val()
      var  position_right = $('#timer-position-right').val()
      var  timer_size = $('.timer-size input').val()
      var  timer_color = $('.timer-color input').val()
        window.localStorage.setItem('timer-position-top',position_top);
        window.localStorage.setItem('timer-position-bottom',position_bottom);
        window.localStorage.setItem('timer-position-left',position_left);
        window.localStorage.setItem('timer-position-right',position_right);
        window.localStorage.setItem('timer-size',timer_size);
        window.localStorage.setItem('timer-color',timer_color)
        $('.msms').css('font-size',timer_size)
        $('.msms').css('color',timer_color)
        $('.timer_section').css('top',position_top)
        $('.timer_section').css('bottom',position_bottom)
        $('.timer_section').css('left',position_left)
        $('.timer_section').css('right',position_right)
    },
    loadsetting:function(){
        var timer_position_top = window.localStorage.getItem('timer-position-top');
        var timer_position_bottom = window.localStorage.getItem('timer-position-bottom');
        var timer_position_left = window.localStorage.getItem('timer-position-left');
        var timer_position_right = window.localStorage.getItem('timer-position-right');
        var timer_size = window.localStorage.getItem('timer-size');
        var timer_color =  window.localStorage.getItem('timer-color')
        $('#timer-position-top').val(timer_position_top)
        $('#timer-position-bottom').val(timer_position_bottom)
        $('#timer-position-left').val(timer_position_left)
        $('#timer-position-right').val(timer_position_right)
        $('.timer-size input').val(timer_size)
        $('.timer-color input').val(timer_color)
        $('.msms').css('font-size',timer_size)
        $('.msms').css('color',timer_color)
        $('.timer_section').css('top',timer_position_top)
        $('.timer_section').css('bottom',timer_position_bottom)
        $('.timer_section').css('left',timer_position_left)
        $('.timer_section').css('right',timer_position_right)
    }
}

$(document).ready(function(){
    if (document.domain.indexOf('douyu')>=0) {

        if(window.localStorage.getItem('timer-position-top')){
            simpletimer.addTimer()
            content.addDouyuButton()
        }
        else{
            simpletimer.settinginit()
            simpletimer.addTimer()
            content.addDouyuButton()
        }

    };


})