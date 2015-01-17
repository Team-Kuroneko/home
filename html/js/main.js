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
        location.href = href;
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
    });
});

//portfolio用のscript

