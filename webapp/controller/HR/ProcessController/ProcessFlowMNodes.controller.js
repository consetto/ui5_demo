sap.ui.define([ 'jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/m/MessageToast' ],
	function(jQuery, Controller, JSONModel, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.toolpageapp.controller.HR.ProcessController.ProcessFlowMNodes", {
		onInit: function () {
			var oDataPath = jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.HR.processFlow", "/ProcessFlowNodesMNodes.json");
			var oModel = new JSONModel(oDataPath);

			this.oProcessFlow = this.getView().byId("processflow");
			oModel.attachRequestCompleted(this.oProcessFlow.updateModel.bind(this.oProcessFlow));

			this.getView().setModel(oModel);
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
		onHighlightPath: function(oEvent) {
			var sDataPath;
			var oModel = this.oProcessFlow.getModel();
			if (oEvent.getParameter("pressed")) {
				sDataPath = jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.HR.processFlow", "/ProcessFlowNodesHighlighted.json");
				MessageToast.show("Path has been highlighted");
			} else {
				sDataPath = jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.HR.processFlow", "/ProcessFlowNodesMNodes.json");
				MessageToast.show("Path highlighting has been reset.");
			}
			oModel.loadData(sDataPath);
		},

		onOptimizeLayout: function(oEvent) {
			this.oProcessFlow.optimizeLayout(oEvent.getSource().getPressed());
			MessageToast.show("Layout was " + (oEvent.getSource().getPressed() ? "optimized." : "brought back to its initial state."));
		},

		onZoomIn: function() {
			this.oProcessFlow.zoomIn();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
		},

		onZoomOut: function() {
			this.oProcessFlow.zoomOut();

			MessageToast.show("Zoom level changed to: " + this.oProcessFlow.getZoomLevel());
		}
	});
});