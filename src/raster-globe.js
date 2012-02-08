/*!
 * RasterGlobe
 * Copyright(c) 2012 Lee Briggs
 * MIT Licensed
 */

var RasterGlobe = function (container, options) {
	var globe = this;
	options = options || {};

	this.height = options.height || 400;
	this.width = options.width || 400;

	this.frame = 0;
	this.elements = [];
	this.data = options.data || [];

	for (var y = 0; y < this.height; y++) {

		var src = this.data[y];
		var elements = [];

		$.each(src, function (index, value) {
			var e = $('<div class="line"/>')
				.css('top', y)
				.appendTo(container);

			elements.push(e);
		});
		this.elements.push(elements);
	}

	setInterval(function () {
		globe.update();
	}, 60);
};

RasterGlobe.prototype.update = function () {

	var theta = this.frame * 0.01,
		data = this.data,
		radius = this.width / 2, 
		radius2 = radius * radius;

	$.each(this.elements, function (y, elements) {

		var line = data[y];
		var scale = Math.sqrt(radius2 - ((y - radius) * (y - radius)))

		$.each(elements, function (index, e) {

			var t1, t2, x1, x2, y1, y2, width;
		
			t1 = line[index][0] + theta;
			t2 = line[index][1] + theta;

			x1 = Math.sin(t1);
			y1 = Math.cos(t1);
			x2 = Math.sin(t2);
			y2 = Math.cos(t2);

			if (y1 < 0 && y2 < 0) {
				width = 0;
			} else {
				if (y1 > 0 && y2 < 0) {
					x2 = 1;
				} else if (y2 > 0 && y1 < 0) {
					x1 = -1;
				}				
				width = x2 - x1;
			}
			
			e.css({
				left: (x1 * scale) + radius,
				width: (width * scale)
			});
		});
	});

	this.frame++;
};





