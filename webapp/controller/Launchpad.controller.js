sap.ui.define([
	'sap/ui/demo/toolpageapp/controller/BaseController',
	'sap/m/MessageToast',
	'sap/ui/model/json/JSONModel',
	'sap/ui/demo/toolpageapp/model/formatter'
], function (BaseController, MessageToast, JSONModel, formatter) {
	"use strict";
	return BaseController.extend("sap.ui.demo.toolpageapp.controller.Launchpad", {
		formatter: formatter,

		/*onInit: function () {
			var oViewModel = new JSONModel({
					currentUser: "Administrator",
					lastLogin: new Date(Date.now() - 86400000)
				});

			this.setModel(oViewModel, "view");
			var oModel = new sap.ui.model.json.JSONModel();
            oModel.loadData("model/Contacts.json"); 
			this.getView().setModel(oModel);
		
		},*/
			onInit: function() {
			var sDataPath = jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.data", "/News.json");
			var oModel = new JSONModel(sDataPath);
			this.getView().setModel(oModel, "news");
		},

		onPress: function (oEvent) {
				var oContext = oEvent.getParameter("listItem").getBindingContext("side");
			var sPath = oContext.getPath() + "/selected";
			oContext.getModel().setProperty(sPath, true);
			var sKey = oContext.getProperty("key");
				this.getRouter().navTo(sKey);
		},
			onNavToPredictiveForecast: function () {
				
			this.getRouter().navTo("OverflowToolbar");
		},
		onNavToFinancialDashboard: function () {
			this.getRouter().navTo("financialDashboard");
		},
		
			onNavToProcessFlow: function() {
			this.getRouter().navTo("processFlow");
		},
		
		onNavToProcessFlow2  : function() {
			this.getRouter().navTo("processFlow2");
		},
		
		onNavToProcessFlow3  : function() {
			this.getRouter().navTo("processFlow3");
		},
		
		onNavToPlanningCalendar : function() {
			this.getRouter().navTo("planningCalendar");
		},
		onNavToOrganizationalChart: function() {
			this.getRouter().navTo("organizationalChart");
		},

		onNavToChartContainer: function() {
			this.getRouter().navTo("chartContainer");
		},
		
		onNavToProjectManagement: function() {
			this.getRouter().navTo("projectManagement");
		},

		onNavToReviews: function () {
			this.getRouter().navTo("reviews");
		},
		
		onNavToProductOv1: function () {
			this.getRouter().navTo("productOv1");
		},
		
		onNavToProductOv2: function () {
			this.getRouter().navTo("productOv2");
		},
		
		onNavToProductOv3: function () {
			this.getRouter().navTo("productOv3");
		},
		
		onNavToDeliveryRoute: function () {
			this.getRouter().navTo("deliveryRoute");
		},
		
		
			getProgress: function(aNodes) {
			if (!aNodes || aNodes.length === 0) {
				return 0;
			}
			var iSum = 0;
			for (var i = 0; i < aNodes.length; i++) {
				iSum += aNodes[i].state === "Positive";
			}
			var fPercent = (iSum / aNodes.length) * 100;
			return fPercent.toFixed(0);
		},
			getEntityCount: function(entities) {
			return entities && entities.length || 0;
		},

	

		formatJSONDate: function(date) {
			var oDate = new Date(Date.parse(date));
			return oDate.toLocaleDateString();
		},
	
	});
});