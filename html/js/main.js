// forked from Event's "Web Creator's Contest Q the 2nd【vol.2】エントリー用コード" http://jsdo.it/Event/zojr
// 要素のキャッシュ
var sections = $('section');
var lists = $('nav li').on('click', function (event) {
    // これしないと何故か上にずれる
    event.preventDefault();

    // クリックされたリストのリンク名を取得
    var href = $('a',this).attr('href');
    // リンク名がid('#')では無い場合,通常のリンク動作をさせ終了
    if (href.substr(0,1) != '#') {
        switch ($('a',this).attr('target')){
                case '_blank':
                    window.open(href);
                    break;
                case '_self':
                case '_parent':
                case '_top':
                default:
                    location.href = href;
                    break;
        }
        
        return;
    // セクションにリンク名のidが無い場合終了
    } else if (sections.filter(href).index() == -1){
        return;
    }

	var self = $(href);
	// 選択済み要素の場合終了
	if (self.hasClass('active')) {
		return;
	}
	// エフェクト用にindexを保持
	var from_idx = sections.filter('.active').removeClass('active').index();
	self.addClass('active');
    // KEEP OUTのアニメーションを開始
    //ifの判定で色を付ける　keepPlusSがデフォルト
    if(href=='#team'){
        $('.keepout').addClass('keepPlusT');
	}else if(href=='#service'){
        $('.keepout').addClass('keepPlusS');
    }else if(href=='#portfolio'){
        $('.keepout').addClass('keepPlusP');
    }else if(href=='#BBS'){
        $('.keepout').addClass('keepPlusB');
    }else if(href=='#contact'){
        $('.keepout').addClass('keepPlusC');
    }else{
        $('.keepout').addClass('keepPlusS');
    }
    
	$('.keepout').addClass('keepout-anime');
	// 遷移エフェクトの実行
	sections.pageChange(from_idx, self.index());
});

// 遷移エフェクトの実行
$.fn.pageChange = function (from_idx, to_idx) {
	sections.eq(from_idx).fadeOut();
	sections.eq(to_idx).fadeIn();
}

// アニメーションが終わったらアニメーション用のクラスを外す
$('.keepout').each(function (index, element) {
    $(this).bind('animationend webkitAnimationEnd', function () {
        $(this).removeClass('keepout-anime');
        $(this).removeClass('keepPlusT');
        $(this).removeClass('keepPlusS');
        $(this).removeClass('keepPlusP');
        $(this).removeClass('keepPlusB');
        $(this).removeClass('keepPlusC');
    });
});

/**
 * svganimations2.js v1.0.0
 * http://www.codrops.com
 *
 * the svg path animation is based on http://24ways.org/2013/animating-vectors-with-svg/ by Brian Suda (@briansuda)
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
(function() {

	'use strict';

	window.requestAnimFrame = function(){
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();

	window.cancelAnimFrame = function(){
		return (
			window.cancelAnimationFrame       || 
			window.webkitCancelAnimationFrame || 
			window.mozCancelAnimationFrame    || 
			window.oCancelAnimationFrame      || 
			window.msCancelAnimationFrame     || 
			function(id){
				window.clearTimeout(id);
			}
		);
	}();
	
	var svgs = Array.prototype.slice.call( document.querySelectorAll( 'svg' ) ),
		hidden = Array.prototype.slice.call( document.querySelectorAll( '.hide' ) ),
		current_frame = 0,
		total_frames = 60,
		path = new Array(),
		length = new Array(),
		handle = 0;

	function init() {
		[].slice.call( document.querySelectorAll( 'path' ) ).forEach( function( el, i ) {
			path[i] = el;
			var l = path[i].getTotalLength();
			length[i] = l;
			path[i].style.strokeDasharray = l + ' ' + l; 
			path[i].style.strokeDashoffset = l;
		} );

	}

	function draw() {
		var progress = current_frame/total_frames;
		if (progress > 1) {
			window.cancelAnimFrame(handle);
			showPage();
		} else {
			current_frame++;
			for(var j=0; j<path.length;j++){
				path[j].style.strokeDashoffset = Math.floor(length[j] * (1 - progress));
			}
			handle = window.requestAnimFrame(draw);
		}
	}

	function showPage() {
		svgs.forEach( function( el, i ) {
			el.setAttribute( 'class', el.getAttribute('class') + ' hide' );
		} );
		hidden.forEach( function( el, i ) {
			classie.remove( el, 'hide' );
			classie.add( el, 'show' );
		} );
        window.setTimeout(function (){
            var d = document.getElementById('del2');
            classie.remove( d, 'show');
            classie.add( d, 'showout');
        }, 300);
        window.setTimeout(function (){
            var d = document.getElementById('visible');
            classie.remove( d, 'svg-wrap--bicycle');
           
        }, 0);
     // window.setTimeout(function (){
    //       var d = document.getElementById('aa');//ここ。
     //d.next().toggleClass("fade");
    //    }, 300);
    }
    
	init();
	draw();

})();
//portfolio用のscript

