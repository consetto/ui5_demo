sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("sap.ui.demo.toolpageapp.controller.ProcessFlow", {

		onNavButtonPressed: function (oEvent) {
			var oHistory, sPreviousHash;
	        oHistory = sap.ui.core.routing.History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("Launchpad", {}, true /*no history*/);
			}
		},

		getValuesDelta: function(fFirstValue, fSecondValue) {
			return fSecondValue - fFirstValue;
		},

		onNodePressed: function(oEvent) {
			var sItemTitle = oEvent.getParameters().getTitle();
			MessageToast.show(this.getResourceBundle().getText("processFlowNodeClickedMessage", [sItemTitle]));
		},

		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		}
	});
});