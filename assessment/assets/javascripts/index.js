$(document).ready(function(){
	loadSection();
	fetchDataJSON();
})

function loadSection() {
	$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

		if(!$("section").eq(1).hasClass("load-section")) {
			if(scroll >= $("section").eq(1).offset().top) {
				console.log(scroll >= $("section").eq(1).offset().top);
				$("section").eq(1).addClass("load-section");
			}
		}
	});
}

function fetchDataJSON() {
	$.getJSON( "assets/javascripts/data.json", function( data ) {
		let titleData = '';
		let contentData = '';
		data.forEach((element, index) => {
			console.log(element, index);
			let titleActive = (index == 0) ? 'active' : '';
			let contentActive = (index == 0) ? 'show active' : '';
			let btnMobActive = (index != 0) ? 'collapsed' : '';
			let contentMobActive = (index == 0) ? 'show' : '';
			titleData += `
				<li class="nav-item" role="presentation">
					<button class="nav-link `+titleActive+`" id="tab-`+index+`" data-bs-toggle="tab" data-bs-target="#tab-`+index+`-pane" type="button" role="tab" aria-controls="tab-`+index+`-pane" aria-selected="true">`+element.title+`</button>
				</li>
			`;
			contentData += `
				<div class="tab-pane fade `+contentActive+` accordion-item" id="tab-`+index+`-pane" role="tabpanel" aria-labelledby="tab-`+index+`" tabindex="`+index+`">
					<h2 class="accordion-header d-lg-none" id="heading-`+index+`">
						<button class="accordion-button `+btnMobActive+`" type="button" data-bs-toggle="collapse" data-bs-target="#tab-collapse-`+index+`" aria-expanded="true" aria-controls="tab-collapse-`+index+`">`+element.title+`</button>
					</h2>
					<div id="tab-collapse-`+index+`" class="accordion-collapse collapse `+contentMobActive+` d-lg-block" aria-labelledby="heading-`+index+`" data-bs-parent="#data-tabs-json">
						<div class="accordion-body">
							`+element.content+`
						</div>
					</div>
			
				</div>
			`;
		});
		// console.log(titleData,contentData);
		// $(".tab__container .tab__list").append(titleData);
		// $(".tab__container .tab__body").append(contentData);
		$(".nav.nav-tabs").append(titleData);
		$(".tab-content.accordion").append(contentData);
	});
}