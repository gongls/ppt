/*
 https://github.com/codetyphon/backtotop
 */
;(function($){
    $.fn.extend({
        backtotop:function(){
            var back_to_top=$('<div title="返回顶部">');
            back_to_top.attr('style','display: block;width: 38px;height: 38px;background-color: #ddd;border-radius: 3px;border: 0;cursor: pointer;position: relative;text-align: center;margin: auto;');
            var arrow=$('<div>');
            var stick=$('<div>');
            arrow.attr('style','width: 0;height: 0;top: -1px;border: 9px solid transparent;border-bottom-color: #aaa;margin: auto;');
            stick.attr('style','width: 8px;height: 14px;top: 15px;border-radius: 1px;background-color: #aaa;margin: auto;');
            arrow.appendTo(back_to_top);
            stick.appendTo(back_to_top);
            $(this).bind('click',function(){
                $('body,html').animate({scrollTop:0},1000);
            });
            back_to_top.appendTo($(this));
        }
    })
})(jQuery);