sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast, JSONModel, ResourceModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("projetoteste.controller.main", {
            statusText: function (sStatus) {
                switch (sStatus) {
                    case "A":
                        return "Aprovado";
                    case "B":
                        return "Novo";
                    case "C":
                        return "Atrasado";
                    default:
                        return sStatus;
                }
            },

            onInit: function () {
                
                var oData = {
                    recipient: {
                        name: "World"
                    }
                };

                var oModel = new JSONModel(oData);
                this.getView().setModel(oModel);

                var oInvoice = new JSONModel("../invoices.json");
                this.getView().setModel(oInvoice, "invoice");

                var i18nModel = new ResourceModel({
                    bundleName: "projetoteste.i18n.i18n"
                });
                this.getView().setModel(i18nModel, "i18n");
            },

            onShowHello: function () {
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMsg = oBundle.getText("helloMsg", [sRecipient]);

                MessageToast.show(sMsg);
            },

            onFilterInvoices: function (oEvent) {
                var aFilter = [];
                var sQuery = oEvent.getParameter("query");

                if(sQuery) {
                    aFilter.push(new Filter("ProductName", FilterOperator.Contains, sQuery));
                }

                var oList = this.byId("invoiceList");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilter);
            }
        });
    });
