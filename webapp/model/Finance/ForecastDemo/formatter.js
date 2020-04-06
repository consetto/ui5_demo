sap.ui.define(function() {
	"use strict";

	return {
		color: function(att) {
			return (att);
		},
		curr: function(att) {
			return att.toLocaleString();
		},
		calculK: function(d, c) {
			return (parseFloat(d) * (20 - parseFloat(c)) * 1289339.507).toLocaleString();
		},
		calculM: function(d, c) {
			return ((parseFloat(d) * (20 - parseFloat(c)) * 1289339.507) / 293.29722222222).toLocaleString();
		},
		calculE: function(d, c) {
			return (((parseFloat(d) * (20 - parseFloat(c)) * 1289339.507) / 293.29722222222) * 2.82).toLocaleString();
		},
		calculSUM: function(col) {
			return (col.toLocaleString());
		}
	};

}, true);