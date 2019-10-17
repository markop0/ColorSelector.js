// Number  h       色相
// Number  s       饱和度
// Number  b       明度
// Array           RGB色值数值

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
	x = event.clientX + 1 //不知什么原因有1px的误差
	y = event.clientY + 1 //不知什么原因有1px的误差
	let px = {
		x: x - p0.x,
		y: y - p0.y
	} //px相对坐标
	if(event.button == 0) {
		//	if(pm.x>=x&&x>=p0.x&&y>=p0.y&&y<=pm.y){
		$('.zzm').css({
			"top": px.y + "px",
			"left": px.x + "px"
		})
		nowColor.s = px.x == 0 ? 0 : px.x == cbw ? 100 : Math.ceil(px.x / cbw * 100)
		nowColor.b = px.y == 0 ? 100 : px.y == cbh ? 0 : Math.ceil((cbh - px.y) / cbh * 100)

		//		let fz=Math.sqrt(((pm.x-x)**2)+((pm.y-y)**2))
		//		let fm=Math.sqrt(((pm.x-p0.x)**2)+((pm.y-p0.y)**2))

		changeNowC();
		document.onmousemove = mouseMove; // 注册鼠标移动事件处理函数
		document.onmouseup = mouseStop;
		//	}
	}

};

function mouseMove(ev) {
	x = event.clientX + 1 //不知什么原因有1px的误差
	y = event.clientY + 1 //不知什么原因有1px的误差
	px = {
		x: x < p0.x ? 0 : x > pm.x ? cbw : x - p0.x,
		y: y < p0.y ? 0 : y > pm.y ? cbh : y - p0.y
	} //px相对坐标
	nowColor.s = px.x == 0 ? 0 : px.x == cbw ? 100 : Math.ceil(px.x / cbw * 100)
	nowColor.b = px.y == 0 ? 100 : px.y == cbh ? 0 : Math.ceil((cbh - px.y) / cbh * 100)

	changeNowC();
	$('.zzm').css({
		"top": px.y + "px",
		"left": px.x + "px"
	})

}

function mouseStop(ev) {
	o = document.onmousemove = document.onmouseup = null;
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
//改变色相
function changeC() {
	$('.windP').css("background", `hsl(${color.h},100%,50%)`)
	$('.wAbox').css("background", `linear-gradient(to bottom, hsla(0, 0%, 100%, 0) 0%, hsl(${color.h},100%,50%) 100%)`)
	changeNowC();
}
//改变所选值
function changeNowC() {
	let rgba = hsv2rgb(nowColor.h,nowColor.s/100,nowColor.b/100,nowColor.a)
	$('.nowColor').css("background", `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`)
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
}


//HSB(V)转换为RGB，0<=H<1，0<=S,V<=1
function hsv2rgb(S,H,V,A=1) {
	
	var R, G, B;
	if(S == 0) {
		R = G = B = V;
	} else {
		var _H = H * 6;
		if(_H == 6) {
			_H = 0;
		}
		var i = Math.floor(_H);
		var v1 = V * (1 - S);
		var v2 = V * (1 - S * (_H - i));
		var v3 = V * (1 - S * (1 - (_H - i)));
		if(i == 0) {
			R = V;
			G = v3;
			B = v1;
		} else if(i == 1) {
			R = v2;
			G = V;
			B = v1;
		} else if(i == 2) {
			R = v1;
			G = V;
			B = v3;
		} else if(i == 3) {
			R = v1;
			G = v2;
			B = V;
		} else if(i == 4) {
			R = v3;
			G = v1;
			B = V;
		} else {
			R = V;
			G = v1;
			B = v2;
		}
	}
	return {
		r: Math.round(R * 255),
		g: Math.round(G * 255),
		b: Math.round(B * 255),
		a:A
	};
}
String.prototype.colorHex = function(){
    var that = this;
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i=0; i<aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;    
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;    
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return that;    
        } else if(aNum.length === 3) {
            var numHex = "#";
            for (var i=0; i<aNum.length; i+=1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return that;
};
/**
 * RGB 转 HSL.公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内; h, s, 和 l 在 [0, 1] 之间
 * r       红色色值
 * g       绿色色值
 * b       蓝色色值
 * @return  Array           HSL各值数组
 */
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min){ 
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

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
changeC();
console.log(p0)