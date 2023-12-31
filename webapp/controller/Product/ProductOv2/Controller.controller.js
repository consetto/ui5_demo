sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/table/RowSettings"
], function(Controller, JSONModel, RowSettings) {
	"use strict";

	return Controller.extend("sap.ui.demo.toolpageapp.controller.Product.ProductOv2.Controller", {

		onInit: function() {
			// set explored app's demo model on this sample
			var oJSONModel = this.initSampleDataModel();
			this.getView().setModel(oJSONModel);
		},

		initSampleDataModel: function() {
			var oModel = new JSONModel();

			jQuery.ajax(jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.Product", "/products.json"), {
				dataType: "json",
				success: function(oData) {
					for (var i = 0; i < oData.ProductCollection.length; i++) {
						var oProduct = oData.ProductCollection[i];

						if (i === 0) {
							oProduct.Status = "Success";
						} else if (i === 1) {
							oProduct.Status = "Warning";
						} else if (i === 2) {
							oProduct.Status = "Error";
						} else if (i === 3) {
							oProduct.Status = "Information";
						} else if (i === 4) {
							oProduct.Status = "None";
						} else if (oProduct.Price < 300) {
							oProduct.Status = "Success";
						} else if (oProduct.Price < 600) {
							oProduct.Status = "Warning";
						} else if (oProduct.Price < 900) {
							oProduct.Status = "Error";
						} else if (oProduct.Price < 1200) {
							oProduct.Status = "Information";
						} else {
							oProduct.Status = "None";
						}
					}
					oModel.setData(oData);
				},
				error: function() {
					jQuery.sap.log.error("failed to load json");
				}
			});

			return oModel;
		},

		onHighlightToggle: function(oEvent) {
			var oTable = this.byId("table");
			var oToggleButton = oEvent.getSource();

			if (oToggleButton.getPressed()) {
				oTable.setRowSettingsTemplate(new RowSettings({
					highlight: "{Status}"
				}));
			} else {
				oTable.setRowSettingsTemplate(null);
			}
		},

		onAlternateToggle: function(oEvent) {
			this.byId("table").setAlternateRowColors(oEvent.getParameter("pressed"));
		},
			onNavBack: function (oEvent) {
			var oHistory, sPreviousHash;
	        oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Launchpad", {}, true /*no history*/);
			}
		},

		onSelectionModeChange: function(oEvent) {
			var oTable = this.byId("table");
			var sKey = oEvent.getParameter("selectedItem").getKey();

			oTable.setSelectionMode(sKey);
		}
	});
});