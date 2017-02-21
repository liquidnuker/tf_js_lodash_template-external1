// credits to https://gist.github.com/bennadel/3379332
// for the inspiration
// ======================================================/
import {_, template} from "lodash";

_.templateSettings.variable = "rc";
var _fromjson = "";

// Grab the HTML out of our template tag and pre-compile it.
var template = _.template(
  $("script.template").html()
);

// Render the underscore template and inject it after the H1
// in our current DOM.
var injectData = function () {
  $("h1").after(
    template(templateData)
  );
};

// Define our render data (to be put into the "rc" variable).
var templateData = {};

var loadAjax = function () {
  $.getJSON({
      method: "GET",
      url: "src/js/ajax/bonsai.json",
      dataType: "json",
      cache: true
    })
    .done(function (data) {
      templateData = data;
      console.log(templateData.bonsai.length);
      injectData();
    });
};

loadAjax();
