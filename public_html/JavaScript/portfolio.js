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

//=====================================================================================================================
// TO HAVE IN ACCOUNT: WE MUST CONVERT THIS THINGS TO BE ADAPTABLE TO MOBILE PHONES, USING PERCENTAGES OR WHATEVER.
//=====================================================================================================================

// OPERATION OF THE GAME IN THE PAGE:
// YOU HAVE TO CATCH THE CIRCLES IN ORDER
// YOU HAVE TO PUT THEM IN THE TARGET, WHICH SHOULD BE CENTERED BELOW THE LAST LINE OF CIRCLEDIVS.
// WHEN DROPPING THE CIRCLEDIV ON IT, THE CIRCLE DRAGGED GOES TO ITS PLACE AND SHOWS THE CONCEALED TEXT.

var radius = 130;
/*
 * 
 * @type Function|portfolio_L138.Ball
 */
Ball = (function() {
    function Ball(radius, color, text, x, y, dx, dy, i) {
        this.center = {x: x, y: y};
        this.radius = radius;
        this.color = color;
        this.text = text;
        this.dx = dx;
        this.dy = dy;
        this.switchMove = true;
        this.docked = false;
        /*if(format) {
            this.dom = $('<div class="circle2"><div '+ 'class="'+format+'">'+text+'</div></div>').appendTo('#ground');
        }
        else {
            this.dom = $('<div class="circle2"><div>'+text+'</div></div>').appendTo('#ground');
        }*/
        //this.dom = $('<div class="circle2"' + ' data-i=' + i + '><div'+ (format ? ' class="'+format+'"' : '') + '><span class="placeholder">'+text+'</span><span class="txt"></span></div></div>').appendTo('#ground');
        //this.dom = $('<div class="circle4"' + ' data-i=' + i + '><div>'+text+'</div></div>').appendTo('#ground');
        this.dom = $('<table class="circle5"' + ' data-i=' + i + '><tr><td>'+text+'</td></tr></table>').appendTo('#ground');
//this.dom.css({padding: (radius*0.3)+'px'});
        //this.dom = $('<p class="circle">'+text+'</p>').appendTo('#ground');
        //this.dom = $('<div class="circle2"><div'+ 'class="oneline">'+text+'</div></div>').appendTo('#ground');
        //this.dom.width(radius*2);
        //this.dom.height(radius*2);
        var pad = radius*0.3;
        var innerDiv = this.dom.find('td');
        innerDiv.width(radius*2);
        innerDiv.height(radius*2);
        innerDiv.css({'border-radius': radius, background: color, padding: pad});
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
          this.dom.find('td').css({background: color});  
        }
        else {
            this.dom.find('td').css({background: this.color});
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
        //var radius = 130;//randMinMax(50, 200);
        var x = randMinMax(radius, boundW - radius);
        var y = randMinMax(radius, boundH - radius);
        var dx = randMinMax(1, 4);
        var dy = randMinMax(1, 4);
        //bal = new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "Text " + i, x, y, dx, dy, 'oneline', i);
        //bal = new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "Text " + i, x, y, dx, dy, i);
        bal = new Ball(radius, '#' + Math.floor(Math.random() * 16777215).toString(16), "Text " + i, x, y, dx, dy, i);
        console.log("i donot know " + lines[i]);
        //bal.dom.find('.txt').html(lines[i]);
        bal.dom.draggable();
        bal.dom.on('mousedown', function() {
            //alert('hello');
            //$(this).css({background: 'green'});
            //this.stop();
            //console.log($(this).radius);
            //console.log($(this).toString());
            //dragging
            
            var ind = $(this).attr('data-i');
            if(!ballsarray[ind].docked) { 
                console.log($(this).attr('data-i'));
                ballsarray[ind].stop();
                dragging = ind;
            }
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
            //if(!ballsarray[ind].docked) {
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
            }
            //this.putCenterAt();
            //console.log(ballsarray[ind].radius);
        //}
                );
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
    
    writeBallCells();
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
            var thisBall = ballsarray[dragging];
            
            thisBall.dom.draggable("destroy");
            //thisBall.dom.find(':first-child').removeClass('oneline');
            //console.log(thisBall.dom.find('.txt').html());
            // We check if "dragging" is 0 or ballsarray[dragging-1] is false.
            // Meaning: We are dropping the next minimum number of div in the order.
            /*if(dragging === false) {
                console.log("dragging is false omg");
            }
            else if(dragging !== false) {
                console.log("dragging is not false omg; dragging = " + dragging);
                if(dragging !== 0) {
                    console.log("dragging not equal to 0");
                }
            }*/
            if((dragging !== false) && ((dragging == 0) || (ballsarray[dragging-1] === false))) {
                console.log("will do it now");
                carryDivToPlace(dragging);
                console.log(ballCells);
                thisBall.docked = true;
                ballsarray[dragging] = false;
            }
            
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
    //writeBallCells();
    
    
    
                
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

var percPad = 0.1;
function writeBallCells() {
    var vpw = $('#ground').width();//$(window).width();
    //var vpw = $('#ground').width();
    //ballsInARow = vpw/2.2/radius;//Math.floor(vpw*0.9/ballsarray.length);
    
    var wh = Math.round(radius*2*(1+percPad));
    var ballsInARow = Math.floor(vpw/wh);
    placeForBall(ballsInARow);
    console.log('balls in a row: ' + ballsInARow);
    var rows = Math.ceil(ballsarray.length/ballsInARow);
    // HERE WE WRITE THE TABLE 
    ballCells = $('#ground').find('#ballCells');
    //ballCells
    var ballCellsHtml = [];
    /*for(var i = 0; i < rows; i ++) {
        ballCellsHtml.push('<tr>');
        /*for(var j = 0; j < ballsInARow; j ++) {
            var txt = '<td class="empty" style="width: ' + wh + '; height: ' + wh + ';"></td>';
            ballCellsHtml.push(txt);
            console.log("writing td for ball");
        }
        ballCellsHtml.push('</tr>');
    }*/
    var txTable = ballCellsHtml.join("");
    console.log("the table: \n" + txTable);
    ballCells.html(txTable);
    console.log("AND TABLE IS: \n" + ballCells);
}

function placeForBall(ballsinarow) {
    /*if(placeForBall.cont == undefined) {
        console.log("INITIALIZING COUNTER");
        placeForBall.cont = 0;
    }*/
    if(ballsinarow) {
        placeForBall.inarow = ballsinarow;
        return false;
    }
    else {
        var c = placeForBall.cont;
        var ina = placeForBall.inarow;
        console.log(typeof(placeForBall.cont));
        console.log(typeof(placeForBall.inarow));
        console.log("CONT: " + placeForBall.cont);
        console.log("INAROW: " + placeForBall.inarow);
        if(placeForBall.cont < placeForBall.inarow) {
            console.log("cont lesser");
        }
        else {
            console.log("cont greater");
        }
        if((placeForBall.cont === placeForBall.inarow) || (placeForBall.cont == undefined)) {
            console.log("NOW NEW ROW");
            var tr = $('<tr></tr>');
            ballCells.append(tr);
            placeForBall.cont = 1;
            return tr;
        }
        else {
            console.log("SAME ROW");
            placeForBall.cont ++;
            return ballCells.find('tr:last');
        }
    }
}

//var cont = 0;
function carryDivToPlace(ballIndex) {
    // For this, the easiest could be to make as many tds and ths as calculated
    // And then, we searh for td.empty:first inside the table, and each time we put a div in a cell we remove the class
    // .empty  ==> Pretty easy man!!
    //var ballCells = $('#ground').find('#ballCells');
    console.log("TABLE BEFORE: \n" + ballCells.html());
    //var firstEmpty = ballCells.find('.empty').filter(':first');
    //firstEmpty.html(ballsarray[ballIndex].dom.firstChild()); 
    //firstEmpty.html(ballsarray[ballIndex].dom.find('td')); 
    var thisTd = ballsarray[ballIndex].dom.find('td').appendTo(placeForBall());
    thisTd.html(lines[ballIndex]);
    //cont ++;
    /*if(cont === ballsInARow) {
        firstEmpty.removeClass('empty');
        cont = 0;
    }*/
    
    console.log("should be tr " + ballsarray[ballIndex].dom.parent());
    
    //console.log("just put in table using index " + ballIndex + ": " + firstEmpty.html());
    //firstEmpty.removeClass("empty");
    //console.log("\n\nAnd it was put in td: " + firstEmpty.parent());
    console.log("the new table: \n" + ballCells.html());
    // Now the problem could be putting the enough padding It needs to be 10% or 20% of the radius.
}

