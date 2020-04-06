sap.ui.define(function() {
			"use strict";

			return {
				indent: function(att) {
					var	list=["COST OF GOODS SOLD","OPERATING EXPENSES","OTHER EXPENSES","REVENUE BY PRODUCT","REVENUE BY REGION"];
					if(list.indexOf(att) >= 0){
						this.byId("x").addStyleClass("nonindent");
					}
					else
					{
						this.byId("x").addStyleClass("indent");
					}
					return (att);
				}
			};
			
}, true);