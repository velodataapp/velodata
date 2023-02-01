$(document).ready(function(){

function size(){
	document.querySelector(':root').style
	  .setProperty('--doc-height', window.innerHeight + 'px');
}

window.addEventListener('resize', () => { 
	size();
});

size();
window.dispatchEvent(new Event('resize'));

$(".updatesBtn").on("click", function(){
	$(".accountModal").fadeOut(100);
	$("nav").removeClass("open");
	$(".backdrop").fadeOut(100);
	$(".updatesWrap").parent(".widget").addClass("highlighted");
	setTimeout(function(){
		$(".updatesWrap").parent(".widget").removeClass("highlighted");
	},200);
});

$("#loginSignup button").on("click", function(){
	$(".accountModal").fadeIn(100);
	$("nav").removeClass("open");
	if($(this).hasClass("login")){
		$(".toggleLogin").click();
	}else{
		$(".toggleSignup").click();
	}
	$("#username").focus();
	$(".backdrop").fadeIn(100);
});

$(".backdrop").on("click", function(){
	$(".accountModal").fadeOut(100);
	$(".backdrop").fadeOut(100);
});

$(".toggleButtons button").on("click", function(){
	$()
	$(this).parent(".toggleButtons").find("button").removeClass("selected");
	$(this).addClass("selected");
	let l = $(this).position().left;
	$(this).parent(".toggleButtons").find(".toggleHighlight").css("left", l);
});

$(".accountModal .toggleButtons button").on("click", function(){
	$(".loginForm button").text($(this).text());
})

$(".loginForm input").on("focus", function(){
	$(this).parent().children("label").addClass("focusLabel");
});

$(".loginForm input").on("focusout", function(){
	if($(this).val().length == 0){
		$(this).parent().children("label").removeClass("focusLabel");
	}
});

$(".loginForm input").on("input", function(){
	let u = $("#username").val();
	let p = $("#password").val();
	if(u.length > 0 && p.length > 0){
		$(".loginForm button").removeAttr("disabled");
	}else{
		$(".loginForm button").attr("disabled", "disabled");
	}
});

$(".loginForm").on("submit", function(){
	$(this).trigger("reset");
	$(".loginForm button").attr("disabled", "disabled");
	alert("Login/Signup");
	$(".accountModal").fadeOut(100);
	$(".backdrop").fadeOut(100);
})

$(".tableHeader .search input").on("input", function(){
	let query = $(this).val().toLowerCase();
	let table = $(this).parents(".widget").find("table");
	$(table).find("tbody > tr").each(function(){
		let tr = $(this);
		let found = false;
		$(tr).find("td").each(function(){
			if($(this).text().toLowerCase().indexOf(query) > -1){
				found = true;
			}
		});
		if(found){
			$(tr).fadeIn(0);
		}else{
			$(tr).fadeOut(0);
		}
	});
	$(table).find("tbody > tr:not([style*='display: none']):odd").children("td").css("background-color", "var(--darkerBlue)");
	$(table).find("tbody > tr:not([style*='display: none']):even").children("td").css("background-color", "var(--darkBlue)");
});

$("th").on("click", function(){
	let table = $(this).parents("table");
	if(!$(this).hasClass("sorting")){
		$(table).find(".sorting").removeClass("asc");
		$(table).find(".sorting").removeClass("desc");
		$(table).find(".sorting").removeClass("sorting");
	}
	let column = $(this).index();
	$(this).addClass("sorting");
	if($(this).hasClass("desc")){
		$(this).removeClass("desc");
		$(this).addClass("asc");
		sortTable(table, column, "asc");
	}else{
		$(this).removeClass("asc");
		$(this).addClass("desc");
		sortTable(table, column, "desc");
	}
	$(table).find("tbody > tr:not([style*='display: none']):odd").children("td").css("background-color", "var(--darkerBlue)");
	$(table).find("tbody > tr:not([style*='display: none']):even").children("td").css("background-color", "var(--darkBlue)");
});

function sortTable(table, column, order){
	let $tbody = $(table).find('tbody');
	$tbody.find('tr').sort(function(a,b){ 
		let valA = $(a).find('td:eq('+column+')').attr("data-val");
		let valB = $(b).find('td:eq('+column+')').attr("data-val");

		let tda = isNaN(parseFloat(valA))?valA.toLowerCase():parseFloat(valA);
		let tdb = isNaN(parseFloat(valB))?valB.toLowerCase():parseFloat(valB);
		
		
		if(order == "asc"){
			return tda < tdb ? 1 
					: tda > tdb ? -1   
					: 0;
		}else{
				return tda > tdb ? 1 
					: tda < tdb ? -1  
					: 0;
		}
	}).appendTo($tbody);
}

$(".menuBtn").on("click", function(){
	$("nav").toggleClass("open");
	if($("nav").hasClass("open")){
		$(".backdrop").fadeIn(100);
	}else{
		$(".backdrop").fadeOut(100);
	}
});

$(".editPanels").on("click", function(){
	$(this).toggleClass("edit");
	$(".widgetGrid").toggleClass("editing");
	if($(this).hasClass("edit")){
		$("body").css("overflow", "hidden");
	}else{
		$("body").css("overflow", "");
	}
});

function checkOverlap(){
	let target = $(".moveWidget");
	let tpos = target.offset();
	let al = tpos.left - 1;
	let at = tpos.top - 1;
	let w = target.innerWidth();
	let h = target.innerHeight();
	let ar = al+w+1;
	let ab = at+h+1;

	let fullOverlaps = [];
	let partialOverlaps = [];

	$(".widgetGrid.editing .widget:not(.placeholder, .moving)").each(function(){
		let widget = $(this);
		let comPos = widget.offset();
		let bl = comPos.left;
		let bt = comPos.top;
		let cw = widget.innerWidth();
		let ch = widget.innerHeight();
		let br = bl+cw;
		let bb = bt+ch;
		
		if(al == bl && ar == br && at == bt && ab == bb){
			//exact overlap
			fullOverlaps.push(widget);
		}else if(al <= bl && ar >= br && at <= bt && ab >= bb){
			//encapsulate
			fullOverlaps.push(widget);
		}else if(al >= bl && ar <= br && at >= bt && ab <= bb){
			//within	
			partialOverlaps.push(widget);
		}else if(al <= bl && ar >= bl && at <= bt && ab >= bt){
			//tl overlap
			partialOverlaps.push(widget);
		}else if(al <= br && ar >= br && at <= bt && ab >= bt){
			//tr overlap
			partialOverlaps.push(widget);
		}else if(al <= bl && ar >= bl && at <= bb && ab >= bb){
			//bl overlap
			partialOverlaps.push(widget);
		}else if(al <= br && ar >= br && at <= bb && ab >= bb){
			//br overlap
			partialOverlaps.push(widget);
		}

	});
	return [fullOverlaps, partialOverlaps];
}

let swapWidgets;

function movePanel(e){
	let x = e.pageX;
	let y = e.pageY;
	$(".moving").css("left", x);
	$(".moving").css("top", y);
	let rh = parseInt($(".moving").attr("data-h"));
	let cw = parseInt($(".moving").attr("data-w"));
	let h = $(".moving").innerHeight();
	let w = $(".moving").innerWidth();
	let mw = $(".moveWidget").innerWidth();
	let gg = parseInt($(".moving").parents(".widgetGrid").css("grid-gap").split("px")[0]);
	let gh = h/rh;
	let gw = w/cw;
	let numggx = cw - 1;
	let numggy = rh - 1;
	if(cw > 1){
		gw = gw - ((cw - 1) * gg);
	}
	if(rh > 1){
		gh = gh - ((rh - 1) * gg);
	}
	let p = $(".moveWidget").position();
	let x1 = p.left;
	let y1 = p.top;
	let n = $(".moving").position();
	let x2 = n.left;
	let y2 = n.top;

	let dx = x2 - x1;
	let dy = y2 - y1;
	let adx = Math.abs(dx);
	let ady = Math.abs(dy);
	let change = false;
	let dir;
	if(adx > (gw / 2) + (gg/2)){
		if(dx > 0){
			//move right
			$(".moveWidget").css("left", x1 + gw + gg + ((numggx * gg)/2));
			change = true;
			dir = 'r';
		}else{
			//move left
			
			$(".moveWidget").css("left", x1 - gw - gg - ((numggx * gg)/2));
			change = true;
			dir = 'l';
		}
	}
	if(ady > (gh / 2) + (gg/2)){
		if(dy > 0){
			//move down
			$(".moveWidget").css("top", y1 + gh + gg + ((numggy * gg)/2));
			change = true;
			dir = 'd';
		}else{
			//move left
			
			$(".moveWidget").css("top", y1 - gh - gg - ((numggy * gg)/2));
			change = true;
			dir = 'u';
		}
	}
	if(change){
		let [full, partial] = checkOverlap();
		if(full.length >= 1 && partial.length == 0){
			swapWidgets = full;
			$(".moveWidget").css("background-color", "#00AC2D");
		}else{
			swapWidgets = null;
			$(".moveWidget").css("background-color", "#AC0000");
		}
		
	}

}

$("body").on("mousedown", ".editing .widget", function(e){
	let h = $(this).innerHeight();
	let w = $(this).innerWidth();
	let x = e.pageX;
	let y = e.pageY;
	let ox = e.currentTarget.offsetLeft - x;
	let oy = e.currentTarget.offsetTop - y;
	$(this).css("width", w);
	$(this).css("height", h);
	let clone = $(this).clone();
	$(clone).css("opacity", 0);
	$(clone).addClass("placeholder");
	$(this).css("margin-left", ox);
	$(this).css("margin-top", oy);
	$(this).css("left", x);
	$(this).css("top", y);
	$(this).after(clone);
	$(this).addClass("moving");
	let c = $(this).attr("data-c");
	let r = $(this).attr("data-r");
	let gh = $(this).attr("data-h");
	let gw = $(this).attr("data-w");
	let o = $(this).attr("data-o");
	$(this).after(`<div class='moveWidget' style='height:${h}px; width:${w}px;' data-o='${o}' data-h='${gh}' data-w='${gw}'></div>`);
	$(".moveWidget").css("order", o);
	$(".moveWidget").css("margin-left", ox);
	$(".moveWidget").css("margin-top", oy);
	$(".moveWidget").css("left", x);
	$(".moveWidget").css("top", y);
	document.addEventListener("mousemove", movePanel);
});

$("body").on("mouseup", ".editing .widget", function(){
	document.removeEventListener("mousemove", movePanel);

	let oc = parseInt($(".placeholder").attr("data-c"));
	let or = parseInt($(".placeholder").attr("data-r"));
	let gh = parseInt($(".placeholder").attr("data-h"));
	let gw = parseInt($(".placeholder").attr("data-w"));
	if(swapWidgets){
		let c1 = parseInt($(swapWidgets[0]).attr("data-c"));
		let r1 = parseInt($(swapWidgets[0]).attr("data-r"));
		for(let i=0;i<swapWidgets.length; i++){
			c = oc;
			r = or;
			let widget = swapWidgets[i];
			let cn = parseInt($(widget).attr("data-c"));
			let rn = parseInt($(widget).attr("data-r"));
			let ghn = parseInt($(widget).attr("data-h"));
			let gwn = parseInt($(widget).attr("data-w"));
			if(i==0){

				let dh = gh - ghn;
				let dw = gw - gwn;
				if(swapWidgets.length > 2){
					dh = 0;
					dw = 0;
				}
				if(gh > ghn){
					if(r>rn){
						rn = rn;
					}else if(r<rn){
						rn = rn-dh;
					}
				}
				if(gw > gwn){
					if(c>cn){
						cn = cn;
					}else if(c<cn){
						cn = cn-dw;
					}
				}
				$(widget).attr("data-c", c);
				$(widget).attr("data-r", r);
				$(".moving").attr("data-c", cn);
				$(".moving").attr("data-r", rn);
				$(".moving").css("grid-area", `${rn} / ${cn} / span ${gh} / span ${gw}`);
			}else{
				let dx = cn - c1;
				let dy = rn - r1;
				c = c + dx;
				r = r + dy;
			}
			let dh = gh - ghn;
			let dw = gw - gwn;
			if(swapWidgets.length > 2){
				dh = 0;
				dw = 0;
			}
			if(gh > ghn){
				if(r>rn){
					r = r+dh;
				}else if(r<rn){
					r = r;
				}
			}
			if(gw > gwn){
				
				if(c>cn){
					c = c+dw;
				}else if(c<cn){
					c = c;
				}
			}
			$(widget).attr("data-c", c);
			$(widget).attr("data-r", r);
			$(widget).css("grid-area", `${r} / ${c} / span ${ghn} / span ${gwn}`);
		}
	}else{
		$(".moving").css("grid-area", `${or} / ${oc} / span ${gh} / span ${gw}`);
	}
	$(".moving").css("margin", "unset");
	$(".moving").css("top", "unset");
	$(".moving").css("left", "unset");
	$(".placeholder").remove();
	$(".moveWidget").remove();
	$(".widget").removeClass("moving");
});

});