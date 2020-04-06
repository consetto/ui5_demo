sap.ui.define([
	'sap/ui/core/mvc/Controller', 'sap/ui/model/json/JSONModel', 'sap/viz/ui5/data/FlattenedDataset',
		'sap/viz/ui5/controls/common/feeds/FeedItem',
		'sap/ui/demo/toolpageapp/model/Finance/Dashboard/formatter'
], function(Controller, JSONModel, FlattenedDataset, FeedItem, formatter) {
	"use strict";

	return Controller.extend("sap.consetto.demo.controller.Finance.Dashboard.Home", {
			formatter: formatter,
			_constants: {
				sampleName: "sap/ui/demo/toolpageapp/model/Finance/Dashboard",
				vizFrame: {
					id: "chartContainerVizFrame",
					dataset: {
						dimensions: [{
							name: 'Period',
							value: "{Period}"
						}],
						measures: [{
							group: 1,
							name: 'Profit',
							value: '{Revenue2}'
						}, {
							group: 1,
							name: 'AMER',
							value: '{AMER}'
						}, {
							group: 1,
							name: "Forcast",
							value: "{Forcast}"
						}, {
							group: 1,
							name: "EMEA",
							value: "{EMEA}"
						}, {
							group: 1,
							name: 'Revenue2',
							value: '{Revenue2}'
						}, {
							group: 1,
							name: "APAC",
							value: "{APAC}"
						}],
						data: {
							path: "/Products"
						}
					},
					modulePath: "/ChartContainerData.json",
					type: "column",
					properties: {
						plotArea: {
							showGap: true
						}
					},
					feedItems: [{
						'uid': "primaryValues",
						'type': "Measure",
						'values': ["EMEA", "AMER", "APAC"]
					}, {
						'uid': "axisLabels",
						'type': "Dimension",
						'values': ["Period"]
					}, {
						'uid': "targetValues",
						'type': "Measure",
						'values': ["Target"]
					}]
				}
			},
			/* ============================================================ */
			/* Life-cycle Handling                                          */
			/* ============================================================ */
			/**
			 * Method called when the application is initalized.
			 *
			 * @public
			 */
			onInit: function() {
				var d = new Date();
				var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"July", "August", "Sep", "Oct", "Nov", "Dec"
				];
				var month1 = monthNames[d.getMonth()];
				var month2;
				if(!d.getMonth())
					month2 = monthNames[d.getMonth() + 11];
				else
					month2 = monthNames[d.getMonth() - 1];
				var x = new Date();
				x.setDate(1);
				x.setMonth(x.getMonth());
				var	currMonth=month1+" "+x.getFullYear();
				x.setMonth(x.getMonth()-1);
				var	lastMonth=month2+" "+x.getFullYear();
				

				var secondCadreModel = {
					"points": [{
						"x": 0,
						"y": 35
					}, {
						"x": 8,
						"y": 53
					}, {
						"x": 20,
						"y": 10
					}, {
						"x": 30,
						"y": 30
					}, {
						"x": 40,
						"y": 52
					}, {
						"x": 100,
						"y": 73
					}],
					"size": "Responsive",
					"threshold": 40,
					"chartTwoColors": {
						"showPoints": true,
						"color": {
							"above": "Good",
							"below": "Error"
						}
					},
					"chartNoThreshold": {
						"threshold": null,
						"showPoints": true,
						"color": {
							"above": "Good",
							"below": "Critical"
						}
					},
					"chartSemanticColor": {
						"threshold": null,
						"showPoints": false,
						"color": "Error"
					},
					"chartEmphasizedPointsNoThreshold": {
						"points": [{
							"x": 0,
							"y": 35,
							"show": true,
							"color": "Good"
						}, {
							"x": 8,
							"y": 53
						}, {
							"x": 20,
							"y": 10
						}, {
							"x": 30,
							"y": 30
						}, {
							"x": 40,
							"y": 52
						}, {
							"x": 100,
							"y": 73,
							"show": true,
							"color": "Error"
						}],
						"threshold": null,
						"leftTopLabel": "120 Mio",
						"rightTopLabel": "140 Mio",
						"leftBottomLabel": "",
						"rightBottomLabel": ""
					},
					"chartOneEmphasizedPoint": {
						"points": [{
							"x": 0,
							"y": 35
						}, {
							"x": 8,
							"y": 53
						}, {
							"x": 20,
							"y": 10
						}, {
							"x": 30,
							"y": 30
						}, {
							"x": 40,
							"y": 52
						}, {
							"x": 100,
							"y": 73,
							"color": "Error",
							"show": true
						}]
					}
				};
				secondCadreModel.chartEmphasizedPointsNoThreshold.leftBottomLabel=lastMonth;                                                 
				secondCadreModel.chartEmphasizedPointsNoThreshold.rightBottomLabel=currMonth;
				var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
				this._updateVizFrame(oVizFrame);
				var oModel = new JSONModel(secondCadreModel);
				this.getView().byId("tablLong").setModel(oModel);
				var sPath1 = jQuery.sap.getModulePath("sap/consetto/demo/model/Finance/Dashboard", "/table1.json");
				var oModel1 = new JSONModel(sPath1);
				this.getView().byId("tab1").setModel(oModel1);
				this.getView().byId("tab4").setModel(oModel1);


			},
			/* ============================================================ */
			/* Helper Methods                                               */
			/* ============================================================ */
			/**
			 * Updated the Viz Frame in the view.
			 *
			 * @private
			 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame that needs to be updated
			 */
			_updateVizFrame: function(vizFrame) {
				var chartModel= {
					"Products": [
						{
							"Period": "",
							"Profit": 159,
							"Forcast": 140,
							"AMER": 75,
							"EMEA": 130,
							"Revenue2": 100,
							"APAC": 115
						},
						{
							"Period": "",
							"Profit": 159,
							"Forcast": 140,
							"AMER": 75,
							"EMEA": 130,
							"Revenue2": 100,
							"APAC": 115
						},
						{
							"Period": "",
							"Profit": 129,
							"Forcast": 120,
							"AMER": 80,
							"EMEA": 135,
							"Revenue2": 222,
							"APAC": 120
						},
						{
							"Period": "",
							"Profit": 58,
							"Forcast": 60,
							"AMER": 85,
							"EMEA": 138,
							"Revenue2": 152,
							"APAC": 115
						},
						{
							"Period": "",
							"Profit": 149,
							"Forcast": 120,
							"AMER": 90,
							"EMEA": 142,
							"Revenue2": 292,
							"APAC": 120
						},
						{
							"Period": "",
							"Profit": 49,
							"Forcast": 60,
							"AMER": 95,
							"EMEA": 145,
							"Revenue2": 242,
							"APAC": 115
						},
						{
							"Period": "",
							"Profit": 100,
							"Forcast": 200,
							"AMER": 100,
							"EMEA": 150,
							"Revenue2": 20,
							"APAC": 120
						},
						{
							"Period": "",
							"Profit": 159,
							"Forcast": 140,
							"AMER": 105,
							"EMEA": 155,
							"Revenue2": 100,
							"APAC": 118
						},
						{
							"Period": "",
							"Profit": 129,
							"Forcast": 120,
							"AMER": 110,
							"EMEA": 160,
							"Revenue2": 20,
							"APAC": 115
						},
						{
							"Period": "",
							"Profit": 58,
							"Forcast": 60,
							"AMER": 117,
							"EMEA": 163,
							"Revenue2": 152,
							"APAC": 120
						},
						{
							"Period": "",
							"Profit": 149,
							"Forcast": 120,
							"AMER": 125,
							"EMEA": 167,
							"Revenue2": 292,
							"APAC": 118
						},
						{
							"Period": "",
							"Profit": 49,
							"Forcast": 60,
							"AMER": 135,
							"EMEA": 174,
							"Revenue2": 242,
							"APAC": 122
						}
					]
				};
				var oVizFrame = this._constants.vizFrame;
				var oModel = new JSONModel(chartModel);
				var x = new Date();
				x.setDate(1);
				for (var i=11;i>=0;i--){
					x.setMonth(x.getMonth()-1);
					oModel.oData.Products[i].Period=x.getMonth()+1+"/"+x.getFullYear();
				}

				var oDataset = new FlattenedDataset(oVizFrame.dataset);

				vizFrame.setVizProperties(oVizFrame.properties);
				vizFrame.setDataset(oDataset);
				vizFrame.setModel(oModel);
				this._addFeedItems(vizFrame, oVizFrame.feedItems);
				vizFrame.setVizType(oVizFrame.type);
			},
			boldColor: function(att) {
				this.addStyleClass("bold-blue");
				return (att);
			},
			/**
			 * Adds the passed feed items to the passed Viz Frame.
			 *
			 * @private
			 * @param {sap.viz.ui5.controls.VizFrame} vizFrame Viz Frame to add feed items to
			 * @param {Object[]} feedItems Feed items to add
			 */
			_addFeedItems: function(vizFrame, feedItems) {
				for (var i = 0; i < feedItems.length; i++) {
					vizFrame.addFeed(new FeedItem(feedItems[i]));
				}
			}
	});
});