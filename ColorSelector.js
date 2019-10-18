let p0 = getDivPosition($('.windP')[0])
let pm = getDivMPosition($('.windP')[0])
let c0 = getDivPosition($('.windC')[0])
let cm = getDivMPosition($('.windC')[0])
let a0 = getDivPosition($('.windA')[0])
let am = getDivMPosition($('.windA')[0])
let color = {
	h: 0,
	s: 100,
	b: 100
} //当前色相
let nowColor = {
	h: 0,
	s: 100,
	b: 100,
	a: 1
} //所选颜色
let cbw = pm.x - p0.x //colorBoxWith 色块长度
let cbh = pm.y - p0.y //colorBoxHeight 色块高度

function getDivPosition(div) {
	var x = Math.ceil(div.getBoundingClientRect().left);
	var y = Math.ceil(div.getBoundingClientRect().top);
	return {
		x: x,
		y: y
	};
}

function getDivMPosition(div) {
	let x = Math.ceil(div.getBoundingClientRect().right);
	let y = Math.ceil(div.getBoundingClientRect().bottom);
	return {
		x: x,
		y: y
	};
}
//颜色选择
function mousePosition(ev) {
	x =event.clientX==undefined? event.changedTouches[0].clientX:event.clientX + 1 //不知什么原因有1px的误差
	y =event.clientY==undefined? event.changedTouches[0].clientY:event.clientY + 1 //不知什么原因有1px的误差
	let px = {
		x: x - p0.x,
		y: y - p0.y
	} //px相对坐标
//	if(event.button == 0) {
		$('.zzm').css({
			"top": px.y-2 + "px",
			"left": px.x-2 + "px"
		})
		nowColor.s = px.x == 0 ? 0 : px.x == cbw ? 100 : Math.ceil(px.x / cbw * 100)
		nowColor.b = px.y == 0 ? 100 : px.y == cbh ? 0 : Math.ceil((cbh - px.y) / cbh * 100)

		changeNowC();
		document.onmousemove = mouseMove; // 注册鼠标移动事件处理函数
		document.ontouchmove = mouseMove;
		document.onmouseup = mouseStop;
//	}

};

function mouseMove(ev) {
	x =event.clientX==undefined? event.changedTouches[0].clientX:event.clientX + 1 //不知什么原因有1px的误差
	y =event.clientY==undefined? event.changedTouches[0].clientY:event.clientY + 1 //不知什么原因有1px的误差
	px = {
		x: x < p0.x ? 0 : x > pm.x ? cbw : x - p0.x,
		y: y < p0.y ? 0 : y > pm.y ? cbh : y - p0.y
	} //px相对坐标
	nowColor.s = px.x == 0 ? 0 : px.x == cbw ? 100 : Math.ceil(px.x / cbw * 100)
	nowColor.b = px.y == 0 ? 100 : px.y == cbh ? 0 : Math.ceil((cbh - px.y) / cbh * 100)

	changeNowC();
	$('.zzm').css({
		"top": px.y-2 + "px",
		"left": px.x-2 + "px"
	})

}

function mouseStop(ev) {
	o = document.onmousemove = document.onmouseup = document.ontouchmove = null;
}
//色相选择
function selectColor(ev) {
	x = event.clientX + 1 //不知什么原因有1px的误差
	y = event.clientY + 1 //不知什么原因有1px的误差
	let cx = {
		y: y - c0.y
	} //colorX相对坐标
	if(event.button == 0) {
		$('.lset').css({
			"top": cx.y + "px"
		})
		color.h = cx.y * 2 == 360 ? 0 : cx.y * 2
		nowColor.h = cx.y * 2 == 360 ? 0 : cx.y * 2
		changeC();
	}
	document.onmousemove = selectColorMove; // 注册鼠标移动事件处理函数
	document.onmouseup = mouseStop;
};

function selectColorMove(ev) {
	y = event.clientY + 1 //不知什么原因有1px的误差
	cx = {
		y: y < c0.y ? 0 : y > cm.y ? cbh : y - c0.y
	} //px相对坐标
	$('.lset').css({
		"top": cx.y + "px"
	})
	color.h = cx.y * 2 == 360 ? 0 : cx.y * 2
	nowColor.h = cx.y * 2 == 360 ? 0 : cx.y * 2
	changeC();
}
//透明度选择
function selectA(ev) {
	x = event.clientX + 1 //不知什么原因有1px的误差
	y = event.clientY + 1 //不知什么原因有1px的误差
	let ax = {
		a: y - a0.y
	} //colorX相对坐标
	if(event.button == 0) {
		$('.wAset').css({
			"top": ax.a + "px"
		})
		nowColor.a = Math.ceil(ax.a / cbh * 100) / 100
		changeNowC();
	}
	document.onmousemove = selectAMove; // 注册鼠标移动事件处理函数
	document.onmouseup = mouseStop;
};

function selectAMove(ev) {
	y = event.clientY + 1 //不知什么原因有1px的误差
	ax = {
		a: y < a0.y ? 0 : y > am.y ? cbh : y - a0.y
	} //cx相对坐标
	$('.wAset').css({
		"top": ax.a + "px"
	})
	nowColor.a = Math.ceil(ax.a / cbh * 100) / 100
	changeNowC();
}
//改变透明度的色相和主色卡的色相
function changeC() {
	nowColor.h = color.h
	$('.windP').css("background", `hsl(${color.h},100%,50%)`)
	$('.wAbox').css("background", `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, hsl(${color.h},100%,50%) 100%)`)
	changeNowC();
}
//改变透明度色相
function aChangeA(rgba) {
	$('.wAbox').css("background", `linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgb(${rgba.r},${rgba.g},${rgba.b}) 100%)`)
}
//改变所选值
function changeNowC() {
	let rgba = hsb2rgb(nowColor.h, nowColor.s / 100, nowColor.b / 100, nowColor.a)
	$('.nowColor').css("background", `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`)
	aChangeA(rgba)
	$('#CH').val(nowColor.h)
	$('#CS').val(nowColor.s)
	$('#CB').val(nowColor.b)
	$('.CA').val(nowColor.a)

	$('#CR').val(rgba.r)
	$('#CG').val(rgba.g)
	$('#CBb').val(rgba.b)
	let sRgb = `RGB(${rgba.r},${rgba.g},${rgba.b})`
	let HEX = sRgb.colorHex()
	$('#CHEX').val(HEX)
	console.log(rgba)
}

//HSB(V)转RGB，   公式参考https://github.com/jankuca/hsb2rgb
function hsb2rgb(hue, saturation, value, A) {
	hue = (parseInt(hue, 10) || 0) % 360;

	saturation = /%/.test(saturation) ?
		parseInt(saturation, 10) / 100 :
		parseFloat(saturation, 10);

	value = /%/.test(value) ?
		parseInt(value, 10) / 100 :
		parseFloat(value, 10);

	saturation = Math.max(0, Math.min(saturation, 1));
	value = Math.max(0, Math.min(value, 1));

	var rgb;
	if(saturation === 0 && value === 1) {
		return {
			r: 255,
			g: 255,
			b: 255,
			a: A
		};
	}

	var side = hue / 60;
	var chroma = value * saturation;
	var x = chroma * (1 - Math.abs(side % 2 - 1));
	var match = value - chroma;

	switch(Math.floor(side)) {
		case 0:
			rgb = [chroma, x, 0];
			break;
		case 1:
			rgb = [x, chroma, 0];
			break;
		case 2:
			rgb = [0, chroma, x];
			break;
		case 3:
			rgb = [0, x, chroma];
			break;
		case 4:
			rgb = [x, 0, chroma];
			break;
		case 5:
			rgb = [chroma, 0, x];
			break;
		default:
			rgb = [0, 0, 0];
	}

	rgb[0] = Math.round(255 * (rgb[0] + match));
	rgb[1] = Math.round(255 * (rgb[1] + match));
	rgb[2] = Math.round(255 * (rgb[2] + match));

	return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2],
		a: A
	};
}
//rgb转hex  公式参考https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/
String.prototype.colorHex = function() {
	var that = this;
	//十六进制颜色值的正则表达式
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	// 如果是rgb颜色表示
	if(/^(rgb|RGB)/.test(that)) {
		var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
		var strHex = "#";
		for(var i = 0; i < aColor.length; i++) {
			var hex = Number(aColor[i]).toString(16);
			if(hex.length < 2) {
				hex = '0' + hex;
			}
			strHex += hex;
		}
		if(strHex.length !== 7) {
			strHex = that;
		}
		return strHex;
	} else if(reg.test(that)) {
		var aNum = that.replace(/#/, "").split("");
		if(aNum.length === 6) {
			return that;
		} else if(aNum.length === 3) {
			var numHex = "#";
			for(var i = 0; i < aNum.length; i += 1) {
				numHex += (aNum[i] + aNum[i]);
			}
			return numHex;
		}
	}
	return that;
};
/*RGB 转 HSL.公式参考http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, b 在 [0, 255] ; h, s, l 在 [0, 1] 之间
 */
function rgbToHsl(r, g, b) {
	r /= 255, g /= 255, b /= 255;
	var max = Math.max(r, g, b),
		min = Math.min(r, g, b);
	var h, s, l = (max + min) / 2;

	if(max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch(max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return [h, s, l];
}
//rbg转shv(b)参考同zhangxinxu
function rgbToHsv(r, g, b) {
	r = r / 255;
	g = g / 255;
	b = b / 255;
	var h, s, v;
	var min = Math.min(r, g, b);
	var max = v = Math.max(r, g, b);
	var l = (min + max) / 2;
	var difference = max - min;

	if(max == min) {
		h = 0;
	} else {
		switch(max) {
			case r:
				h = (g - b) / difference + (g < b ? 6 : 0);
				break;
			case g:
				h = 2.0 + (b - r) / difference;
				break;
			case b:
				h = 4.0 + (r - g) / difference;
				break;
		}
		h = Math.round(h * 60);
	}
	if(max == 0) {
		s = 0;
	} else {
		s = 1 - min / max;
	}
	s = Math.round(s * 100);
	v = Math.round(v * 100);
	return [h, s, v];
}

//describe('hsb2rgb', function() {
//	it('should correctly convert arbitraty HSB colors to RGB', function() {
//		assert.deepEqual(hsb2rgb(220, .43, .3), [44, 55, 77]);
//	});
//
//	it('should correctly convert grey-scale colors', function() {
//		assert.deepEqual(hsb2rgb(0, 0, 0), [0, 0, 0]);
//		assert.deepEqual(hsb2rgb(0, 0, .2), [51, 51, 51]);
//		assert.deepEqual(hsb2rgb(0, 0, 1), [255, 255, 255]);
//
//		assert.deepEqual(hsb2rgb(54, 0, 0), [0, 0, 0]);
//		assert.deepEqual(hsb2rgb(54, 0, .2), [51, 51, 51]);
//		assert.deepEqual(hsb2rgb(54, 0, 1), [255, 255, 255]);
//	});
//
//	it('should round RGB channel values', function() {
//		assert.deepEqual(hsb2rgb(220, .43, .3), [44, 55, 77]);
//		assert.deepEqual(hsb2rgb(0, 0, .5), [128, 128, 128]);
//	});
//
//	it('should return RGB values in the range of 0-255', function() {
//		assert.equal(hsb2rgb(0, 0, 1.5)[0], 255);
//		assert.equal(hsb2rgb(0, 0, -1.5)[0], 0);
//		assert.deepEqual(hsb2rgb(220, .43, 1.5), hsb2rgb(220, .43, 1));
//		assert.deepEqual(hsb2rgb(220, .43, -1.5), hsb2rgb(220, .43, 0));
//		assert.deepEqual(hsb2rgb(220, .43, .3), hsb2rgb(220 + 360, .43, .3));
//	});
//
//	it('should allow percentage as the units', function() {
//		assert.deepEqual(hsb2rgb(220, '43%', '30%'), [44, 55, 77]);
//	});
//
//	it('should allow degree units', function() {
//		assert.deepEqual(hsb2rgb('220deg', .43, .3), [44, 55, 77]);
//		assert.deepEqual(hsb2rgb('220°', .43, .3), [44, 55, 77]);
//	});
//});