/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var $menu = $('nav .nav');
    var $lis = $menu.find('li');

var categories = ["About me", "Skills", "Qualities", "Hobbies", "Contact"];
function writemissing() {   
    var txttable = [];
    for(var i in categories) {
       var $cat = $lis.eq(i);
       $cat.html(categories[i]);
       var name = $cat.attr('data-cat');
       //var name = categories[i].replace(/\s/g, '').toLowerCase();
       txttable.push(
         '<div class="category" id="'+name+'"></div>'    
       ); 
       //<iframe src="'+name+'.html"></iframe>
    }
    document.getElementById("categories").innerHTML = txttable.join("");
}
writemissing();

//$iframes.load($iframes.attr('id')+".html");
//console.log("iframes ids: " + $iframes.attr('id'));
//var id = $iframes.attr('id');
//$(this).attr('id').load($iframes.attr('id')+".html");
//alert(document.getElementById("categories").innerHTML);
var $selecat;
var $iframes;
    
    var $iframeToShow;
    var catext;
function loadCategories() {
    $iframes = $('#categories').find('.category');
    for(var i in $iframes) {
        //var ifri = $iframes.eq(i);
        /*var xhr= new XMLHttpRequest();
        xhr.open('GET', ifri.attr('id')+'.html', true);
        xhr.onreadystatechange= function() {
            if (this.readyState!==4) return;
            if (this.status!==200) return; // or whatever error handling you want
            ifri.innerHTML= this.responseText;
        };
        xhr.send();*/
        var ifri = $iframes.eq(i); 
        /*var el = document.createElement("div");
        //alert(el);
        console.log(el);
        var t = document.createTextNode("This is a paragraph.");
        el.appendChild(t);
        ifri.html(el);*/
        console.log(ifri);
        ifri.load(ifri.attr('id')+".html");
    }
}


$(document).ready(function() {
    //$iframes = $('#categories').find('.category');
    loadCategories();
    
    //$iframes.selector('#')
    //alert($iframes.filter('#aboutme').html());
    $('#categories').find('.category', function() {
        $(this).load($(this).attr('id')+".html");
        console.log("iframe id: " + $(this).attr('id'));
    });
    $iframeToShow = $iframes.eq(0);
    $iframeToShow.addClass('selected');
    $lis.on('click', selectCategory);
    $menu.on('mouseenter', expand);
    
    
    /**
     * shows the page of the category selected by click in the menu
     * @returns {undefined}
     */
    function selectCategory() { 

        $iframeToShow.removeClass('selected');
        catext = $(this).attr('data-cat');
        $iframeToShow = $iframes.filter('#'+catext);
        //$iframeToShow.fadeIn(300);
        $iframeToShow.addClass('selected');
        
        console.log($iframeToShow.html());
        //$lis.not(this).toggle('slide');
        $lis.not(this).slideToggle(200);

    }
    

    /**
     * expands the menu
     * @returns {undefined}
     */
    function expand() {
        //$lis.show('slide');
        $lis.slideDown(200);
        /*$tohide = $lis.filter(':visible');
        if($tohide.length !== $lis.length) {
            $lis.filter(':hidden').slideToggle(200);
        }*/
        //$lis.slideToggle(200);//show('slide');
        //$menu.css('display','inline-block');
    }  
    /*$('#drag').css({color: 'blue'});
    var boundH = $('#ground').height();
    var boundW = $('#ground').width();
    for(var i = 0; i < nballs; i ++) {
        var radius = randMinMax(50, 200);
        var x = randMinMax(radius, boundW - radius);
        var y = randMinMax(radius, boundH - radius);
        var dx = randMixMax(1, 4);
        var dy = randMixMax(1, 4);
        ballsarray.push(new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "hello there", x, y, dx, dy));
    }
    loop();*/
    
});

function randMinMax(min, max, npos) {
    var randval = Math.random()*(max-min)+min;
    if(npos) {
        return randval.toFixed(npos);
    }
    else {
        return Math.round(randval);
    }
}

Ball = (function() {
    function Ball(radius, color, text, x, y, dx, dy,format, i) {
        this.center = {x: x, y: y};
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = dx;
        this.dy = dy;
        this.switchMove = true;
        /*if(format) {
            this.dom = $('<div class="circle2"><div '+ 'class="'+format+'">'+text+'</div></div>').appendTo('#ground');
        }
        else {
            this.dom = $('<div class="circle2"><div>'+text+'</div></div>').appendTo('#ground');
        }*/
        this.dom = $('<div class="circle2"' + ' data-i=' + i + '><div'+ (format ? ' class="'+format+'"' : '') + '><span class="placeholder">'+text+'</span><span class="txt"></span></div></div>').appendTo('#ground');
        //this.dom.css({padding: (radius*0.3)+'px'});
        //this.dom = $('<p class="circle">'+text+'</p>').appendTo('#ground');
        //this.dom = $('<div class="circle2"><div'+ 'class="oneline">'+text+'</div></div>').appendTo('#ground');
        this.dom.width(radius*2);
        this.dom.height(radius*2);
        var pad = radius*0.3;
        this.dom.css({'border-radius': radius, background: color, padding: pad});
        this.boundWidth = $('#ground').width();
        this.boundHeight = $('#ground').height();
        
        this.putCenterAt(x, y);
    }
    
    Ball.prototype.putCenterAt = function(x, y) {
        this.dom.css({top: Math.round(y - this.radius), left: Math.round(x - this.radius)});
        this.center.x = Math.round(x);
        this.center.y = Math.round(y);
    };
    
    Ball.prototype.setColor = function(color) {
        if(color) {
          this.dom.css({background: color});  
        }
        else {
            this.dom.css({background: this.color});
        }  
    };
    
    Ball.prototype.moveAndRebound = function() {
        var radius = this.radius;
        if((this.center.x - radius < 0) || (this.center.x + radius > this.boundWidth)) {
            this.dx = - this.dx; 
        }
        if((this.center.y - radius < 0) || (this.center.y + radius > this.boundHeight)) {
            this.dy = - this.dy; 
        }
        this.putCenterAt(this.center.x+this.dx, this.center.y+this.dy);
    };
    
    Ball.prototype.stop = function() {
        this.switchMove = false;
    };
    
    Ball.prototype.start = function() {
        
        this.switchMove = true;
    };
    

    return Ball;
})();

var nballs = 4;
var ballsarray = [];
/*$('document').ready(function() {
    $('#drag').css({color: 'blue'});
    var boundH = $('#ground').height();
    var boundW = $('#ground').width();
    for(var i = 0; i < nballs; i ++) {
        var radius = randMinMax(50, 200);
        var x = randMinMax(radius, boundW - radius);
        var y = randMinMax(radius, boundH - radius);
        var dx = randMixMax(1, 4);
        var dy = randMixMax(1, 4);
        balls.push(new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "hello there", x, y, dx, dy));
    }
    loop();
});*/

function circleTexts(f) {
    //$('#drag').css({color: 'blue'});
    $.get('circleTexts.txt', function(data) {    
    lines = data.split("\n");
    console.log("lines is " + lines[2]);
    
        /*for(var n = 0; n < lines.length; n ++) {
           ballsarray[n].dom.find('.txt').html(lines[n]);
        }*/
        f();
    });
    
    //f();
}

//function joder(data, f) {
    
//}

function balls() {
    var boundH = $('#ground').height(); 
    var boundW = $('#ground').width();
    for(var i = 0; i < nballs; i ++) {
        var radius = randMinMax(50, 200);
        var x = randMinMax(radius, boundW - radius);
        var y = randMinMax(radius, boundH - radius);
        var dx = randMinMax(1, 4);
        var dy = randMinMax(1, 4);
        bal = new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "Text " + i, x, y, dx, dy, 'oneline', i);
        console.log("i donot know " + lines[i]);
        bal.dom.find('.txt').html(lines[i]);
        bal.dom.draggable();
        bal.dom.on('mousedown', function() {
            //alert('hello');
            //$(this).css({background: 'green'});
            //this.stop();
            //console.log($(this).radius);
            //console.log($(this).toString());
            //dragging
            var ind = $(this).attr('data-i');
            console.log($(this).attr('data-i'));
            ballsarray[ind].stop();
            dragging = ind;
            //console.log(ballsarray[ind].radius);
        });
        bal.dom.on('mouseup', function(e) {
            //alert('hello');
            //$(this).css({background: 'green'});
            //this.stop();
            //console.log($(this).radius);
            //console.log($(this).toString());
            //dragging = false;
            var ind = $(this).attr('data-i');
            console.log($(this).attr('data-i'));
            var thisBall = ballsarray[ind];
            
            var parentOffset = $(this).parent().offset();
            var x = e.pageX - parentOffset.left + thisBall.radius;
            var y = e.pageY - parentOffset.top + thisBall.radius;
            var bw = thisBall.boundWidth;
            var bh = thisBall.boundHeight;
            if(x - radius < 0) {
                x = radius;
            } 
            if(x + radius > bw) {
                x = bw - radius; 
            }
            if(y - radius < 0) {
                y = radius;
            } 
            if(y + radius > bh) {
                y = bh - radius; 
            }
            
            thisBall.putCenterAt(x, y);
            thisBall.start();
            //this.putCenterAt();
            //console.log(ballsarray[ind].radius);
        });
        /*var $circles = $('#ground').find('.circle2');
        $circles.on('mousedown', function() {
            console.log($(this).attr('data-i'));
            //var ind = $(this).attr('data-i');
            //console.log($(this).attr('data-i'));
            //ballsarray[ind].stop();
        });*/
        /*bal.addEventListener('mousedown', function() {
            //alert('hello');
            //$(this).css({background: 'green'});
            //this.stop();
        });*/
        ballsarray.push(bal);
        
    }
    //$(this,callback);
    loop();
}

loop = function () {
    //console.log("loop");
    for (var i = 0; i < ballsarray.length; i++) {
        if(ballsarray[i].switchMove) {
            ballsarray[i].moveAndRebound();
        }
    }
    setTimeout(loop, 1);
};

//var circleTexts = [];
var lines = [];
function initAboutMe() {
    $( "#drop" ).droppable({
        drop: function( event, ui ) {
            ballsarray[dragging].dom.find(':first-child').removeClass('oneline');
            console.log(ballsarray[dragging].dom.find('.txt').html());
            dragging = false;
            //ballsarray[dragging].dom.('')
        }
    }); 
    
    
    
    //var lines = [];
    /*$.get('circleTexts.txt', function(data) {    
    lines = data.split("\n");
    console.log("lines is " + lines[2]);
    
        for(var n = 0; n < lines.length; n ++) {
           ballsarray[n].dom.find('.txt').html(lines[n]);
        }
    });*/
    circleTexts(balls);
    
    
    
    
                
                /*$().on('mousedown', function() {
                   this. 
                });*/
}

/*function putTexts() {
    $.get('circleTexts.txt', function(data) {    
    var lines = data.split("\n");
    
        for(var n = 0; n < lines.length; n ++) {
           ballsarray[n].dom.find('.txt').html(lines[n]);
        }
    });
}*/

