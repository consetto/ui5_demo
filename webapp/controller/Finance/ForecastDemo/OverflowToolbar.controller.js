sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/Sorter',
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/routing/History',
	'sap/ui/demo/toolpageapp/model/Finance/ForecastDemo/formatter',
	'sap/m/MessageBox',
	'sap/m/MessageStrip'
], function(jQuery, Controller, Filter, Sorter, JSONModel, formatter, MessageBox,MessageStrip, History) {
	"use strict";

	var OverflowToolbarController = Controller.extend("sap.ui.demo.toolpageapp.controller.Finance.ForecastDemo.OverflowToolbar", {

		formatter: formatter,

		onInit: function(evt) {
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.toolpageapp.model.Finance.ForecastDemo", "/heags.json"));
			this.getView().setModel(oModel);

			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.sGesellschaft = "Gesellschaft Nord";
			this.fnApplyFiltersAndOrdering();
			this._oViewModelNord = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this._oViewModelSud = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this._oViewModelOst = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this.getView().setModel(this._oViewModelNord, "localModel");
			this._change = false;
		},

		_fnGroup: function(oContext) {
			var sHeiztage = oContext.getProperty("D");

			return {
				key: sHeiztage,
				text: sHeiztage
			};
		},

		onReset: function(oEvent) {
			this.bGrouped = false;
			this.bDescending = false;
			this.sSearchQuery = 0;
			this.byId("month").setValue("");
			var that = this;
			this.byId("idHeagTable").getItems().forEach(function(entry) {
						that.byId("idHeagTable").getModel().setProperty("K",0, entry.getBindingContext());
						that.byId("idHeagTable").getModel().setProperty("M",0, entry.getBindingContext());
						that.byId("idHeagTable").getModel().setProperty("Eur",0, entry.getBindingContext());
				});

				var oViewModel = this.getView().getModel("localModel");
				oViewModel.setProperty("/sumK", 0);
				oViewModel.setProperty("/sumM", 0);
				oViewModel.setProperty("/sumE", 0);
			
/*			
			this._oViewModelNord = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this._oViewModelSud = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this._oViewModelOst = new JSONModel({
				sumK: 0,
				sumM: 0,
				sumE: 0
			});
			this.getView().setModel(this._oViewModelNord, "localModel");*/

			this.fnApplyFiltersAndOrdering();
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

		onGroup: function(oEvent) {
			this.bGrouped = !this.bGrouped;
			this.fnApplyFiltersAndOrdering();
		},

		onSort: function(oEvent) {
			this.bDescending = !this.bDescending;
			this.fnApplyFiltersAndOrdering();
		},

		onFilter: function(oEvent) {
			this.sSearchQuery = oEvent.getSource().getValue();
			this.fnApplyFiltersAndOrdering();
		},

		fnApplyFiltersAndOrdering: function(oEvent) {
			var aFilters = [],
				aSorters = [];

			if (this.bGrouped) {
				aSorters.push(new Sorter("D", this.bDescending, this._fnGroup));
			} else {
				aSorters.push(new Sorter("id", this.bDescending));
			}

			if (this.sSearchQuery) {
				var oFilter = new Filter("Month", sap.ui.model.FilterOperator.Contains, this.sSearchQuery);
				aFilters.push(oFilter);
			}
			if (this.sGesellschaft) {
				var oFilter2 = new Filter("select", sap.ui.model.FilterOperator.EQ, this.sGesellschaft);
				aFilters.push(oFilter2);
			}

			this.byId("idHeagTable").getBinding("items").filter(aFilters).sort(aSorters);
		},
		onOK: function(oEvent) {
			this.fnApplyFiltersAndOrdering();
			switch (this.sGesellschaft) {
				case "Gesellschaft Nord":
					this.getView().setModel(this._oViewModelNord, "localModel");
					break;
				case "Gesellschaft SüdWest":
					this.getView().setModel(this._oViewModelSud, "localModel");
					break;
				case "Gesellschaft Ost":
					this.getView().setModel(this._oViewModelOst, "localModel");
					break;
				default:
			}
			oEvent.getSource().close();
			oEvent.getSource().destroy(true);
		},

		onCancel: function(oEvent) {
			oEvent.getSource().close();
			oEvent.getSource().destroy(true);
		},
		onSelect: function(oEvent) {
			oEvent.getSource();
			var titleBut = oEvent.getSource().getProperty("text");
			this.sGesellschaft = titleBut;

			//this.getView().setModel(oViewModel, "localModel");
			this._change = false;

		},

		handleOpenDialog: function() {
			var oPersonalizationDialog = sap.ui.xmlfragment("sap.ui.demo.toolpageapp.fragment.Dialog", this);
			this.getView().addDependent(oPersonalizationDialog);
			oPersonalizationDialog.setContentHeight("7%");
			oPersonalizationDialog.setContentWidth("40%");
			oPersonalizationDialog.setTitle("Gesellschaft");
			oPersonalizationDialog.open();
			switch (this.sGesellschaft) {
				case "Gesellschaft Nord":
					sap.ui.getCore().byId("Nord").setSelected(true);
					break;
				case "Gesellschaft SüdWest":
					sap.ui.getCore().byId("SudWest").setSelected(true);
					break;
				case "Gesellschaft Ost":
					sap.ui.getCore().byId("Ost").setSelected(true);
					break;
				default:
			}
		},
		onPredict: function() {
			if (!this.bGrouped) {
				var that = this;
				var sumK = 0;
				var sumM = 0;
				var sumE = 0;
				that.byId("idHeagTable").getItems().forEach(function(entry) {
					var d = that.getValueFromColumn("D", entry);
					var c = that.getValueFromColumn("C", entry);
					if (!that._change) {
						var k = d * (20 - c) * 1289339.507;
						var m = (d * (20 - c) * 1289339.507) / 293.29722222222;
						var e = ((d * (20 - c) * 1289339.507) / 293.29722222222) * 2.82;
						that.byId("idHeagTable").getModel().setProperty("K", k, entry.getBindingContext());
						that.byId("idHeagTable").getModel().setProperty("M", m, entry.getBindingContext());
						that.byId("idHeagTable").getModel().setProperty("Eur", e, entry.getBindingContext());
					}
					sumK += parseFloat(entry.mAggregations.cells[3].mProperties.value.replace(",", "").replace(",", ""));
					sumM += parseFloat(entry.mAggregations.cells[4].mProperties.value.replace(",", "").replace(",", ""));
					sumE += parseFloat(entry.mAggregations.cells[5].mProperties.value.replace(",", "").replace(",", "").replace("€", ""));
				});

				var oViewModel = this.getView().getModel("localModel");
				oViewModel.setProperty("/sumK", sumK);
				oViewModel.setProperty("/sumM", sumM);
				oViewModel.setProperty("/sumE", sumE);
			} else {
				MessageBox.warning("Deaktivieren Sie zuerst die Gruppierung .", {
					title: "Warnung!"
				});
			}

		},
		getValueFromColumn: function(key, entry) {
			if (parseFloat(this.byId("idHeagTable").getModel().getProperty(key, entry.getBindingContext())) != "NaN") {
				return parseFloat(this.byId("idHeagTable").getModel().getProperty(key, entry.getBindingContext()));
			} else {
				MessageBox.warning("Bitte Check Heiztag & Außentemp prüfen.", {
					title: "Warnung!"
				});
				return;
			}

		},
		onchange: function(oEvent) {
			this._change = true;
			var oColumnListItem = oEvent.getSource().getParent(),
				sPath = oColumnListItem.getBindingContext().sPath;
			var witchAttribute = oEvent.getSource().mBindingInfos.value.binding.sPath;
			var m, e, k;
			switch (witchAttribute) {
				case "K":
					this.byId("idHeagTable").getModel().setProperty(sPath + "/K", oEvent.getSource().mProperties.value);
					k = parseFloat(oEvent.getSource().mProperties.value.replace(",", "").replace(",", ""));
					m = k / 293.29722222222;
					e = m * 2.82;
					this.byId("idHeagTable").getModel().setProperty(sPath + "/M", m);
					this.byId("idHeagTable").getModel().setProperty(sPath + "/Eur", e);
					break;
				case "M":
					this.byId("idHeagTable").getModel().setProperty(sPath + "/M", oEvent.getSource().mProperties.value);
					m = parseFloat(oEvent.getSource().mProperties.value.replace(",", "").replace(",", ""));
					e = m * 2.82;
					this.byId("idHeagTable").getModel().setProperty(sPath + "/M", m);
					this.byId("idHeagTable").getModel().setProperty(sPath + "/Eur", e);
					break;
				case "Eur":
					this.byId("idHeagTable").getModel().setProperty(sPath + "/Eur", oEvent.getSource().mProperties.value);
					break;
			}

		},
		onchangeDC: function(oEvent) {
			this._change = false;
		},
		onBookmark: function(e) {
			var bookmarkURL = window.location.href;
			var bookmarkTitle = document.title;
			if (window.sidebar && window.sidebar.addPanel) {
				// Firefox <=22
				window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
			} else if ((window.sidebar && /Firefox/i.test(navigator.userAgent)) || (window.opera && window.print)) {
				// Firefox 23+ and Opera <=14
				$(this).attr({
					href: bookmarkURL,
					title: bookmarkTitle,
					rel: 'sidebar'
				}).off(e);
				return true;
			} else if (window.external && ('AddFavorite' in window.external)) {
				// IE Favorites
				window.external.AddFavorite(bookmarkURL, bookmarkTitle);
			} else {
				// Other browsers (mainly WebKit & Blink - Safari, Chrome, Opera 15+)
				MessageBox.information('Press ' + (/Mac/i.test(navigator.userAgent) ? 'Cmd' : 'Ctrl') + '+D to bookmark this page.', {
					title: "Information"
				});
			}

			return false;
		},
		onStar: function () {
			var oMs = sap.ui.getCore().byId("msgStrip");

			if (oMs) {
				oMs.destroy();
			}
			this._generateMsgStrip();
		},

		_generateMsgStrip: function () {
			var aTypes = ["Success"],
				oVC = this.getView().byId("content"),

				oMsgStrip = new MessageStrip("msgStrip", {
					text: "Dies ist eine SAPUI5-Demo-Anwendung der Consetto GmbH. Wir unterstützen Sie gerne bei der Entwicklung von Enterprise Apps für Ihr Unternehmen..",
					showCloseButton: true,
					type: aTypes[0],
					link: new sap.m.Link({
						text: "Klicken Sie hier für weitere Informationen",
						tooltip: "Informationen",
						target : "_blank",
						href : "https://consetto.com/projects/enterprise-applications"
					})
				});

			oVC.addContent(oMsgStrip);
		},
		onStar2: function() {
			var oDialog = new sap.m.Dialog("Dialog1", {
				title: "Mehr sehen!",
				modal: true,
				contentWidth: "50%",
				contentHeight: "20%",
				content: [
					new sap.m.Text({text:"Dies ist eine SAPUI5-Demo-Anwendung der Consetto GmbH. Wir unterstützen Sie gerne bei der Entwicklung von Enterprise Apps für Ihr Unternehmen.."}),
					new sap.m.Link({
						text: "Klicken Sie hier für weitere Informationen",
						tooltip: "Informationen",
						target : "_blank",
						href : "https://consetto.com/projects/enterprise-applications"
					})
				]
			});
			oDialog.open();
			/*MessageBox.information(
				"Dies ist eine SAPUI5-Demo-Anwendung der Consetto GmbH.Wir unterstützen Sie gerne bei der Entwicklung von Enterprise Apps für Ihr Unternehmen.." +
				oLink1, {
					title: "Mehr sehen!"
				});*/
		}
	});

	return OverflowToolbarController;

});