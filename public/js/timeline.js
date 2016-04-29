/*
* author:gongwb
* wenbo.gong@semioe.com
* */

//天数差 计算方法：
Date.DateDiff=function(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays
    aDate  =  sDate1.split("-")
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])    //转换为12-18-2002格式
    aDate  =  sDate2.split("-")
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0])
    iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24)    //把相差的毫秒数转换为天数
    return  iDays;
}
//日期 加法
Date.addDate=function(date,days){
    var d=new Date(date);
    d.setDate(d.getDate()+days);
    var month=d.getMonth()+1;
    var day = d.getDate();
    if(month<10){
        month = "0"+month;
    }
    if(day<10){
        day = "0"+day;
    }
    var val = d.getFullYear()+"-"+month+"-"+day;
    return val;
}

$(document).ready(function(){
    //返回顶部
    $('.back_to_top').backtotop();
    //弹出层的关闭
    $('.alert .msg_box .close').bind('click',function(){
        $('.alert').hide();
    });
    //初始化

    function init(x,y) {
        if(x===undefined || y===undefined){
            width = window.innerWidth;
            height = window.innerHeight;
        }else{
            width = x;
            height = y;
        }
        canvas = document.getElementById('timeline');
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = canvas.width + "px";
        canvas.style.height = canvas.height + "px";
        //canvas 外边框的大小
        $('.canvas').css('width',width);
        $('.canvas').css('height',height);
        c = canvas.getContext('2d');
        padding=60;//padding 在canvas里的距离
        timeline_width=width-padding-padding;//线的长度 等于 width 减去 两个 padding
        timeline_height=height/2;//线的最高高度
    }

    //绘制时间坐标
    function paint(timeline_json,timeline_name){
        $('.buttons').html('');
        $('.points').html('');
        $('.buttons').css('top',height-padding*2+'px');
        $('.buttons').css('left',padding*2+'px');

        var $button=$('<button class="btn">All</button>');
        $button.text(timeline.name);
        $button.css('background',timeline.line_color);
        $button.css('color','#f00');
        $button.bind('click',function(){
           loadJson(timeline_json);
        });
        $button.appendTo($('.buttons'));

        var timelines=timeline_json.timelines;
        //绘制timeline提示文字
            var patient=timeline_json.name;//患者姓名
            c.clearRect(0, 0, canvas.width, canvas.height);
            c.fillStyle = "#000000";
            //c.fillRect(0, 0, canvas.width, canvas.height);
            c.textAlign = 'left';
            c.textBaseline = 'top';
            c.fillStyle = "#ff0000";
            c.font = "10px Courier New";
            c.fillText(patient+'的时间线', padding*2, padding);

            //绘制 中间的线 开始

            

            c.beginPath();
            c.strokeStyle='#f00';
            c.moveTo(padding,height/2);
            c.lineTo(width-padding,height/2);
            c.stroke();
            c.closePath();
            //绘制 中间的线 结束

            //绘制左端竖线开始
            c.beginPath();
            c.strokeStyle='#f00';
            c.moveTo(padding,padding);
            c.lineTo(padding,height-padding);
            c.stroke();
            c.closePath();
            //绘制左端竖线结束


            //
            //绘制时间线上的时间节点
            //获得天数 1年365天
            var begin_day=timeline_json.begin_time;//开始日期
            var end_day=timeline_json.end_time;//结束日期
            var days=Date.DateDiff(end_day,begin_day);//一共多少天？
            console.log('days:'+days);
            var day_width=timeline_width/days;//每天 的距离

            var day_tmp=-1;//用于计算时间间隔的临时变量
            var day_padding=3;//时间间隔
            if(days<=7){
                day_padding=1;//一周之内 时间间隔为1
            }
            for(i=0;i<days+1;i++){
                console.log(i);
                c.beginPath();
                //c.arc(padding+i*day_width,timeline_height,5,0,Math.PI*2,true);
                c.fillRect(padding+i*day_width,timeline_height-5,1,10);
                c.closePath();
                c.fill();
                //绘制时间节点下方的时间
                var font_size=10;//时间节点的字体大小
                var timeline_font_width=10*font_size;//
                c.font = font_size+"px Courier New";

                //获得文字的宽度
                var d=Date.addDate(begin_day,i);
                var font_width=c.measureText(d).width;//获取时间标签的宽度
                if(day_tmp===-1){
                    c.fillText(d,padding+i*day_width-font_width/2, timeline_height+padding);
                }

                day_tmp+=1;

                if(day_tmp===day_padding){
                    day_tmp=0;
                    c.fillRect(padding+i*day_width,timeline_height-5,1,30);//绘制时间的时间线要长一些

                    //console.dir(font_width);
                    c.fillText(d,padding+i*day_width-font_width/2, timeline_height+padding);
                }
            }

        

            timelines.map(function(timeline,index,arr){


                //循环出 timeline
                console.log(timeline);
                console.log('绘制：'+timeline.name+" 时间线");

                c.strokeStyle=timeline.line_color;//时间线的颜色
                c.fillStyle = timeline.line_color;//时间线文字的颜色

                //绘制按钮
                var $button=$('<button class="btn"></button>');
                $button.text(timeline.name);
                $button.css('background',timeline.line_color);
                $button.css('color','#fff');
                $button.bind('click',function(){
                    loadJson(timeline_json,timeline.name);
                    console.log(timeline.name)
                });
                $button.appendTo($('.buttons'));
                //

                //绘制 时间节点

                function paint_time_line(){
                    //得到 时间线上的所有测试结果
                var tests=timeline.tests;
                var step_w=timeline_width/(tests.length-1);//横向 每个点的 距离



                //把高度分为多少份
                var h=timeline.max*2;//多出一半 这样不至于超过太多
                var step_h=timeline_height/h; //纵向的 每个点的 距离
                console.log('纵向 递增高度：'+step_h);
                console.log('横向 递增宽度：'+step_w);

                var last_y=-1;
                var last_x=-1;

                tests.map(function(test,index,tests){
                    //得到坐标点：

                    //判断这个时间点，是不是在指定的区间内?
                    if(Date.DateDiff(test.time,begin_day)<=Date.DateDiff(end_day,begin_day)){
                        //当前时间点距离开始的天数是第几天？
                        var thispointdays=Date.DateDiff(test.time,begin_day);


                        var point={
                            y:timeline_height-test.value*step_h,
                            //x:padding+index*step_w
                            x:padding+thispointdays*day_width
                        }

                        //绘制坐标点/线

                        c.beginPath();

                        //如果是第一个数据
                        if(last_y===-1 && last_x===-1){
                            c.moveTo(point.x,point.y);
                            c.lineTo(point.x,point.y);
                        }else{
                            //起始点为上一个point
                            c.moveTo(last_x,last_y);
                            c.lineTo(point.x,point.y);
                        }

                        c.stroke();
                        c.closePath();

                        //c.beginPath();
                        //画原点，用于响应点击事件。
                        //c.arc(point.x,point.y,8,0,Math.PI*2,true);
                        //c.closePath();
                        //c.fill();
                        /*
                         //绘制时间轴的时间节点
                         c.beginPath();
                         c.arc(point.x,timeline_height,5,0,Math.PI*2,true);
                         c.closePath();
                         c.fill();
                         //绘制时间节点下方的时间
                         c.font = "12px Courier New";
                         c.fillText(test.time, point.x, timeline_height+padding);
                         */


                        var $btn=$('<button title="点击查看详情" class="point_btn"></button>');
                        $btn.css('background',timeline.line_color);
                        $btn.css('color','#fff');
                        var btn_size=10;
                        $btn.css('width',btn_size+'px');
                        $btn.css('height',btn_size+'px');
                        $btn.css('top',point.y-btn_size/2+'px');
                        $btn.css('left',point.x-btn_size/2+'px');

                        $btn.bind('click',function(){
                            $('.msg').html('');
                            var html='';
                            html+='<h3>详细：</h3>';
                            html+='<p>时间:'+test.time+'</p>';
                            html+='<p>value:'+test.value+'</p>';
                            $('.msg').html(html);
                            $('.alert').show();
                        });

                        $btn.appendTo($('.points'));
                        //
                        //绘制文字 和 点击区域
                        c.font = "15px Courier New";
                        var out_text=test.value+' '+timeline.unit;
                        var font_width=parseInt(c.measureText(out_text).width);
                        c.fillText(out_text,point.x-font_width/2,point.y-padding/2);
                        //设置下一个起始点为本次结束点
                        last_y=point.y;
                        last_x=point.x;
                        console.log('y:'+point.y);
                        console.log('x:'+point.x);
                        //
                    }
                });
                }

                if(timeline_name===undefined){
                    paint_time_line();
                }else{
                    if(timeline_name===timeline.name){
                        paint_time_line();
                    }
                }


                
            });
            //绘制 这个人的疾病史

            var symptoms=timeline_json.symptoms;
            var step_width=timeline_width/(symptoms.length);
            symptoms.map(function(data,index,arr){
                //
                var start_time=data.start_time;
                var end_time=data.end_time;
                console.log(data);
                c.beginPath();
                //使用随机颜色作为 疾病区域的背景
                var r=Math.floor(Math.random()*250);
                var g=Math.floor(Math.random()*250);
                var b=Math.floor(Math.random()*250);
                //x轴 起始位置 和 结束位置  就是疾病区域的时间
                var begin_x=padding+Date.DateDiff(start_time,begin_day)*day_width;
                var end_x=padding+Date.DateDiff(end_time,begin_day)*day_width;
                c.fillStyle = "rgba("+r+","+g+","+b+",0.1)";
                var width=end_x-begin_x;
                c.fillRect(begin_x,height/2,width , height/3);
                c.fillStyle="#f00";
                c.font = "20px Courier New";
                //c.textBaseline = 'middle';//设置文本的垂直对齐方式
                //c.textAlign = 'center'; //设置文本的水平对对齐方式
                //输出文字
                //var out_text=data.name+"("+start_time+"~"+end_time+")";
                var out_text=data.name;
                //获得文字的宽度
                var font_width=parseInt(c.measureText(out_text).width);
                console.log(begin_x);
                console.log(end_x);
                c.fillText(out_text,begin_x+(end_x-begin_x)/2-font_width/2,height/2+padding*3);
                c.stroke();
                c.closePath();
            });    
        
        
        //
        
    }

    function loadJson(timeline_json,timeline_name){
        init(window.innerWidth-40,800);
        paint(timeline_json,timeline_name);
    }

    $('.day7').bind('click',function(){
        $.getJSON('/api/timeline/7',function(json){
            timeline_json=json;
            loadJson(timeline_json);
        });
    });
    $('.day30').bind('click',function(){
        $.getJSON('/api/timeline/30',function(json){
            timeline_json=json;
            loadJson(timeline_json);
        });
    });

    $('.day30').click();
    $(window).bind('resize',function(){
        loadJson(timeline_json);
    });
});