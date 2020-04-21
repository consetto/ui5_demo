sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageToast'
], function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.toolpageapp.controller.HR.ProcessController.ProcessFlow", {
		onInit: function () {
			var sDataPath = jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.HR.processFlow", "/ProcessFlowNodes.json");
			var oModel = new JSONModel(sDataPath);
			this.getView().setModel(oModel);

			this.oProcessFlow = this.getView().byId("processflow");
			this.oProcessFlow.updateModel();
		},

		onZoomIn: function () {
			this.oProcessFlow.zoomIn();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
		},

		onZoomOut: function () {
			this.oProcessFlow.zoomOut();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
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

		onNodePress: function(oEvent) {
			var oNode = oEvent.getParameters();
			var sPath = oNode.getBindingContext().getPath() + "/quickView";

			if (!this.oQuickView) {
				this.oQuickView = sap.ui.xmlfragment("sap.ui.demo.toolpageapp.view.HR.frames.QuickViewProcessFlow", this);
				this.getView().addDependent(this.oQuickView);
			}
			this.oQuickView.bindElement(sPath);
			this.oQuickView.openBy(oNode);
		},

		onExit: function () {
			if (this.oQuickView) {
				this.oQuickView.destroy();
			}
		}
	});
});