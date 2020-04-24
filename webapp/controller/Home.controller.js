sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'sap/ui/demo/toolpageapp/model/formatter'
], function (BaseController, JSONModel, Device, formatter) {
	"use strict";
	return BaseController.extend("sap.ui.demo.toolpageapp.controller.Home", {
		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				isPhone : Device.system.phone
			});
			this.setModel(oViewModel, "view");
			Device.media.attachHandler(function (oDevice) {
				this.getModel("view").setProperty("/isPhone", oDevice.name === "Phone");
			}.bind(this));
		},
		
			handleLinkPressprocessFlow3: function() {
			this.getRouter().navTo("processFlow3");
		},
			handleLinkPressprocessFlow: function() {
			this.getRouter().navTo("processFlow");
		},
			handleLinkPressDeliveryRoute: function () {
			this.getRouter().navTo("deliveryRoute");
		},
		handleLinkPressPredictiveForecast: function () {
				
			this.getRouter().navTo("OverflowToolbar");
		},
		handleLinkPressFinancialDashboard: function () {
			this.getRouter().navTo("financialDashboard");
		},
		
	});
});