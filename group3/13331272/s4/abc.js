// Generated by LiveScript 1.3.1
(function(){
  var leave, getRamdomNumber, judge, distinguish, getSum, s4, robot;
  $(function(){
    robot.initial();
    $('.button').click(getRamdomNumber);
    $('#at-plus-container').bind('mouseleave', leave);
    $('.apb').click(s4);
    return $('#seq').hide();
  });
  leave = function(){
    var i$, ref$, len$, button;
    robot.initial();
    $('.button').css('background-color', 'blue');
    $('.button').click(getRamdomNumber);
    $('.button').attr('title', 'off');
    for (i$ = 0, len$ = (ref$ = $('.button')).length; i$ < len$; ++i$) {
      button = ref$[i$];
      $(button).children().eq(1).hide();
    }
    for (i$ = 0, len$ = (ref$ = $('.button')).length; i$ < len$; ++i$) {
      button = ref$[i$];
      $(button).children().eq(1).html("");
    }
    $('#info-bar').unbind('click');
    $('#sum').html("");
    $('#seq').hide();
  };
  getRamdomNumber = function(){
    var this$ = this;
    if (robot.state === 'off' || (robot.state === 'on' && $(this).attr('title') === 'off')) {
      $('.button').css('background-color', 'gray');
      $('.button').unbind('click');
      $(this).css('background-color', 'blue');
      $(this).children().eq(1).html('...');
      $(this).children().eq(1).show();
      $(this).attr('title', 'on');
      $.get('/', function(result){
        var i$, ref$, len$, button;
        $(this$).children().eq(1).html(result);
        for (i$ = 0, len$ = (ref$ = $('.button')).length; i$ < len$; ++i$) {
          button = ref$[i$];
          if ($(button).children().eq(1).text() === "") {
            $(button).click(getRamdomNumber);
          }
        }
        for (i$ = 0, len$ = (ref$ = $('.button')).length; i$ < len$; ++i$) {
          button = ref$[i$];
          if ($(button).children().eq(1).text() === "") {
            $(button).css('background-color', 'blue');
          }
        }
        $(this$).css('background-color', 'gray');
        $(this$).unbind('click');
        if (judge()) {
          $('#info-bar').click(getSum);
        }
        if (robot.state === 'on') {
          robot.clickNext();
        }
      });
    }
  };
  judge = function(){
    var i$, ref$, len$, unread;
    for (i$ = 0, len$ = (ref$ = $('.unread')).length; i$ < len$; ++i$) {
      unread = ref$[i$];
      if ($(unread).text() === "..." || $(unread).text() === "") {
        return false;
      }
    }
    return true;
  };
  distinguish = function(){
    var i$, ref$, len$, unread;
    for (i$ = 0, len$ = (ref$ = $('.unread')).length; i$ < len$; ++i$) {
      unread = ref$[i$];
      if ($(unread).text() === "") {
        return true;
      }
    }
    return false;
  };
  getSum = function(){
    var su, i$, ref$, len$, unread, str;
    su = 0;
    for (i$ = 0, len$ = (ref$ = $('.unread')).length; i$ < len$; ++i$) {
      unread = ref$[i$];
      su += parseInt($(unread).text());
    }
    str = su.toString();
    $('#sum').html(str);
    $('#info-bar').unbind['click'];
  };
  s4 = function(){
    if (robot.state === 'off' && distinguish()) {
      robot.state = 'on';
      robot.clickNext();
      robot.showSequence();
    }
  };
  robot = {
    initial: function(){
      this.buttons = $('.button');
      this.bubble = $('#info-bar');
      this.seq = this.getSequence();
      this.cursor = 0;
      this.state = 'off';
      $('#seq').html('');
    },
    clickNext: function(){
      if (this.cursor === this.seq.length) {
        this.bubble.click();
      } else {
        this.getNext().click();
      }
    },
    getNext: function(){
      var index;
      index = this.seq[this.cursor++].charCodeAt() - 'A'.charCodeAt();
      return this.buttons[index];
    },
    getSequence: function(){
      return ["A", "B", "C", "D", "E"].sort(function(){
        return Math.random() - 0.5;
      });
    },
    showSequence: function(){
      $('#seq').html(this.seq.join('-'));
      $('#seq').show();
    }
  };
}).call(this);