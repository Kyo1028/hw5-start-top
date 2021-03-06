// Generated by LiveScript 1.3.1
/*when onload: 

	add clickListener for all-little-buttons

	able all buttons

			clickListener:
				send number request to server
					when request ready:
						disable me
						able others
						if all-buttons clicked
							able big-bubble

				set waiting style for me
				disable others

	disable big bubble

	!I DONT HANDLE RESET !
	!REMEMBER TO CHANGE IT!
*/
(function(){
  /*
  HOW TO USE LSP??
  	VAR ->
  	FUNCTION->
  		fname = (arguments) -> //!-> if no return
  			//add code here//
  	GETELEMENT->
  	ADDLISTENER->
  	CALLBACK->
  */
  var robotBoot, robotStart, robotClick, showRandomsInBigBubble, setUnvisibleAllUnreads, addClickListenerForAllLittleButtons, setUnvisible, setVisible, getRan, checkAndSetAndContinueClick, clickListener, enable, disable, disableBigBubble, bubbleListener, enableBigBubble, setWaitingStyle;
  window.onload = function(){
    setUnvisibleAllUnreads();
    disableBigBubble();
    robotBoot();
  };
  robotBoot = function(){
    var robotButton;
    robotButton = $('#bottom-positioner');
    robotButton[0].onclick = robotStart;
    addClickListenerForAllLittleButtons();
  };
  robotStart = function(){
    var randoms;
    randoms = [0, 1, 2, 3, 4];
    randoms.sort(function(){
      return Math.random() - 0.5;
    });
    showRandomsInBigBubble(randoms);
    robotClick(0, randoms);
  };
  robotClick = function(n, randoms){
    var greys;
    greys = $('li');
    greys[randoms[n]].onclick(n, randoms, event);
  };
  showRandomsInBigBubble = function(randoms){
    var bubble, str, ini, i$, to$, i;
    bubble = $('#info-bar');
    str = '';
    ini = ['a', 'b', 'c', 'd', 'e'];
    for (i$ = 0, to$ = randoms.length - 1; i$ <= to$; ++i$) {
      i = i$;
      str += ini[randoms[i]];
    }
    bubble[0].innerHTML = str;
  };
  setUnvisibleAllUnreads = function(){
    var reds, i$, to$, i;
    reds = $('.unread');
    for (i$ = 0, to$ = reds.length - 1; i$ <= to$; ++i$) {
      i = i$;
      setUnvisible(reds[i]);
    }
  };
  addClickListenerForAllLittleButtons = function(){
    var greys, i$, to$, i;
    greys = $('li');
    for (i$ = 0, to$ = greys.length - 1; i$ <= to$; ++i$) {
      i = i$;
      /*do*/
      /*(i) -> 
      	(i) !-> do */
      enable(greys[i]);
    }
  };
  setUnvisible = function(red){
    $(red).css('display', 'none');
  };
  setVisible = function(red){
    $(red).css('display', '');
  };
  getRan = function(red, grey, n, randoms){
    $.get('/', function(data, status){
      $(red).html(data);
      checkAndSetAndContinueClick(red, grey, n, randoms);
    });
    /*data = $.ajax({url:"/", success: !->
    	$(red).html(data.responseText)
    	check-and-set(red, grey)
    })*/
    /*xmlhttp = new XMLHttpRequest()
    xmlhttp.onreadystatechange  = !->
    	if xmlhttp.readyState==4 && xmlhttp.status==200
    		$(red).html(xmlhttp.responseText)
    		check-and-set(red, grey)
    xmlhttp.open("GET","/",true)
    xmlhttp.send()*/
  };
  checkAndSetAndContinueClick = function(red, grey, n, randoms){
    var greys, checkAll, i$, to$, i, bubble;
    greys = $('li');
    checkAll = true;
    for (i$ = 0, to$ = greys.length - 1; i$ <= to$; ++i$) {
      i = i$;
      if (!$(greys[i]).hasClass('checked')) {
        enable(greys[i]);
      }
      red = greys[i].getElementsByClassName('unread')[0];
      if ($(red).html() === "") {
        checkAll = false;
      }
    }
    $(grey).addClass('checked');
    disable(grey);
    if (checkAll) {
      bubble = $('#info-bar');
      enableBigBubble(bubble);
    } else {
      robotClick(n + 1, randoms);
    }
  };
  clickListener = function(n, randoms){
    var red, greys, i$, to$, i;
    red = this.getElementsByClassName('unread')[0];
    setWaitingStyle(red);
    getRan(red, this, n, randoms);
    setVisible(red);
    greys = $('li');
    for (i$ = 0, to$ = greys.length - 1; i$ <= to$; ++i$) {
      i = i$;
      disable(greys[i]);
    }
    enable(this);
  };
  enable = function(grey){
    $(grey).css('backgroundColor', 'blue');
    /*$(grey).click(click-listener)*/
    grey.onclick = clickListener;
  };
  disable = function(grey){
    $(grey).css('backgroundColor', 'grey');
    grey.onclick = null;
  };
  disableBigBubble = function(){
    var bubble;
    bubble = $('#info-bar');
    $(bubble).css('backgroundColor', 'grey');
    bubble.onclick = null;
  };
  bubbleListener = function(){
    var greys, sum, i$, to$, i, red;
    greys = $('li');
    sum = 0;
    for (i$ = 0, to$ = greys.length - 1; i$ <= to$; ++i$) {
      i = i$;
      red = greys[i].getElementsByClassName('unread')[0];
      sum += Number(red.innerHTML);
    }
    this.innerHTML = sum;
  };
  enableBigBubble = function(bubble){
    $(bubble).css('backgroundColor', 'blue');
    bubble[0].onclick = bubbleListener;
    bubble[0].onclick(event);
  };
  setWaitingStyle = function(red){
    $(red).html('...');
  };
}).call(this);
