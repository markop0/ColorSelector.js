
function hsb2rgb(hue, saturation, value,A) {
  hue = (parseInt(hue, 10) || 0) % 360;

  saturation = /%/.test(saturation)
    ? parseInt(saturation, 10) / 100
    : parseFloat(saturation, 10);

  value = /%/.test(value)
    ? parseInt(value, 10) / 100
    : parseFloat(value, 10);

  saturation = Math.max(0, Math.min(saturation, 1));
  value = Math.max(0, Math.min(value, 1));

  var rgb;
  if (saturation === 0) {
    return [
      Math.round(255 * value),
      Math.round(255 * value),
      Math.round(255 * value)
    ];
  }

  var side = hue / 60;
  var chroma = value * saturation;
  var x = chroma * (1 - Math.abs(side % 2 - 1));
  var match = value - chroma;

  switch (Math.floor(side)) {
  case 0: rgb = [ chroma, x, 0 ]; break;
  case 1: rgb = [ x, chroma, 0 ]; break;
  case 2: rgb = [ 0, chroma, x ]; break;
  case 3: rgb = [ 0, x, chroma ]; break;
  case 4: rgb = [ x, 0, chroma ]; break;
  case 5: rgb = [ chroma, 0, x ]; break;
  default: rgb = [ 0, 0, 0 ];
  }

  rgb[0] = Math.round(255 * (rgb[0] + match));
  rgb[1] = Math.round(255 * (rgb[1] + match));
  rgb[2] = Math.round(255 * (rgb[2] + match));

//return rgb;
  return {
		r: rgb[0],
		g: rgb[1],
		b: rgb[2],
		a: A
	};
}



describe('hsb2rgb', function () {
it('should correctly convert arbitraty HSB colors to RGB', function () {
    assert.deepEqual(hsb2rgb(220, .43, .3), [ 44, 55, 77 ]);
});

it('should correctly convert grey-scale colors', function () {
    assert.deepEqual(hsb2rgb(0, 0, 0), [ 0, 0, 0 ]);
    assert.deepEqual(hsb2rgb(0, 0, .2), [ 51, 51, 51 ]);
    assert.deepEqual(hsb2rgb(0, 0, 1), [ 255, 255, 255 ]);

    assert.deepEqual(hsb2rgb(54, 0, 0), [ 0, 0, 0 ]);
    assert.deepEqual(hsb2rgb(54, 0, .2), [ 51, 51, 51 ]);
    assert.deepEqual(hsb2rgb(54, 0, 1), [ 255, 255, 255 ]);
});

it('should round RGB channel values', function () {
    assert.deepEqual(hsb2rgb(220, .43, .3), [ 44, 55, 77 ]);
    assert.deepEqual(hsb2rgb(0, 0, .5), [ 128, 128, 128 ]);
});

it('should return RGB values in the range of 0-255', function () {
    assert.equal(hsb2rgb(0, 0, 1.5)[0], 255);
    assert.equal(hsb2rgb(0, 0, -1.5)[0], 0);
    assert.deepEqual(hsb2rgb(220, .43, 1.5), hsb2rgb(220, .43, 1));
    assert.deepEqual(hsb2rgb(220, .43, -1.5), hsb2rgb(220, .43, 0));
    assert.deepEqual(hsb2rgb(220, .43, .3), hsb2rgb(220 + 360, .43, .3));
});

it('should allow percentage as the units', function () {
    assert.deepEqual(hsb2rgb(220, '43%', '30%'), [ 44, 55, 77 ]);
});

it('should allow degree units', function () {
    assert.deepEqual(hsb2rgb('220deg', .43, .3), [ 44, 55, 77 ]);
    assert.deepEqual(hsb2rgb('220°', .43, .3), [ 44, 55, 77 ]);
});
});