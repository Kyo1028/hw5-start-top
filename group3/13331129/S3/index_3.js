// Generated by LiveScript 1.3.1
var Button, createFiveButtons, reset, addResettingWhenLeaveApb, addClickingToBubble, calculateSum, robot, prestartRobot;
Button = (function(){
  Button.displayName = 'Button';
  var prototype = Button.prototype, constructor = Button;
  Button.FAILURERATE = 0.3;
  Button.buttons = [];
  Button.disableOtherButtons = function(thisButton){
    var i$, ref$, len$, button;
    for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
      button = ref$[i$];
      if (button.dom !== thisButton && button.state !== 'done') {
        button.disable();
      }
    }
  };
  Button.enableOtherButtons = function(thisButton){
    var i$, ref$, len$, button;
    for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
      button = ref$[i$];
      if (button.dom !== thisButton && button.state !== 'done') {
        button.enable();
      }
    }
  };
  Button.resetAll = function(){
    var i$, ref$, len$, button;
    for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
      button = ref$[i$];
      button.reset();
    }
  };
  Button.allButtonIsDone = function(){
    var i$, ref$, len$, button;
    for (i$ = 0, len$ = (ref$ = this.buttons).length; i$ < len$; ++i$) {
      button = ref$[i$];
      if (button.state !== 'done') {
        return false;
      }
    }
    return true;
  };
  function Button(dom){
    var this$ = this;
    this.dom = dom;
    this.state = "enabled";
    $(this.dom).css("background-color", "blue");
    $(this.dom).find(".unread").css("display", "none");
    $(this.dom).on("click", function(){
      if (this$.state === "enabled") {
        $(this$.dom).find(".unread").css("display", "inline");
        this$.showWaiting();
        this$.fetchNumberAndShow();
        this$.done();
      }
    });
    this.constructor.buttons.push(this);
  }
  prototype.showWaiting = function(){
    $(this.dom).find('.unread').text("...");
  };
  prototype.fetchNumberAndShow = function(){
    var this$ = this;
    $.get('/' + robot.cursor, function(number){
      if (this$.constructor.allButtonIsDone()) {
        addClickingToBubble();
      }
      this$.showNumber(number);
      if (this$.constructor.allButtonIsDone()) {
        calculateSum();
      }
      if (this$.state === "done") {
        $(this$.dom).css("background-color", "grey");
      }
    });
  };
  prototype.showNumber = function(number){
    $(this.dom).find('.unread').text(number);
  };
  prototype.disable = function(){
    this.state = "disabled";
    $(this.dom).css("background-color", "grey");
  };
  prototype.enable = function(){
    this.state = "enabled";
    $(this.dom).css("background-color", "blue");
  };
  prototype.reset = function(){
    this.state = "enabled";
    $(this.dom).css("background-color", "blue");
    $(this.dom).find(".unread").css("display", "none");
  };
  prototype.done = function(){
    this.state = "done";
  };
  return Button;
}());
$(function(){
  createFiveButtons();
  addResettingWhenLeaveApb();
  robot.init();
  return prestartRobot();
});
createFiveButtons = function(){
  var i$, ref$, len$;
  for (i$ = 0, len$ = (ref$ = $('#control-ring .button')).length; i$ < len$; ++i$) {
    (fn$.call(this, i$, ref$[i$]));
  }
  function fn$(i, dom){
    var button;
    button = new Button(dom);
  }
};
reset = function(){
  var bubble;
  bubble = $('#info-bar');
  bubble.css("background-color", "gray");
  $(".sum").text("");
  Button.resetAll();
  robot.init();
  prestartRobot();
};
addResettingWhenLeaveApb = function(){
  var isEnterOther;
  isEnterOther = false;
  $('.button, #info-bar, #test, img').on('mouseenter', function(){
    isEnterOther = true;
  });
  $('#test, #info-bar, .button').on('mouseleave', function(event){
    isEnterOther = false;
    setTimeout(function(){
      if (!isEnterOther) {
        reset();
      }
    }, 0);
  });
};
addClickingToBubble = function(){
  var bubble;
  bubble = $('#info-bar');
  bubble.css("background-color", "blue");
  bubble.click(function(){
    if (Button.allButtonIsDone()) {
      calculateSum();
    }
  });
};
calculateSum = function(){
  var sum, i$, ref$, len$, button;
  sum = 0;
  for (i$ = 0, len$ = (ref$ = Button.buttons).length; i$ < len$; ++i$) {
    button = ref$[i$];
    sum = sum + parseInt($(button.dom).find(".unread").text());
  }
  if (sum) {
    $(".sum").text(sum);
  }
  $('#info-bar').css("background-color", "gray");
};
robot = {
  init: function(){
    this.buttons = $('.button');
    this.bubble = $('#info-bar');
    this.sequence = ["A", "B", "C", "D", "E"];
    this.cursor = 0;
  },
  shuffleOrder: function(){
    this.sequence.sort(function(){
      return 0.5 - Math.random();
    });
  },
  clickAll: function(){
    var i$, i;
    for (i$ = 1; i$ <= 5; ++i$) {
      i = i$;
      this.clickNext();
    }
  },
  clickNext: function(){
    if (this.cursor === this.sequence.length) {
      this.bubble.click();
    } else {
      robot.getNextButton().click();
    }
  },
  getNextButton: function(){
    var index;
    index = this.sequence[this.cursor++].charCodeAt() - 'A'.charCodeAt();
    return this.buttons[index];
  }
};
prestartRobot = function(){
  $('.apb').click(function(){
    robot.clickAll();
    $('.apb').unbind("click");
  });
};
