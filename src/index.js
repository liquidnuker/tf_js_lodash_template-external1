// credits to https://gist.github.com/bennadel/3379332
// for the inspiration
// ======================================================/
import "lodash";

// When rending an underscore template, we want top-level
// variables to be referenced as part of an object. For
// technical reasons (scope-chain search), this speeds up
// rendering; however, more importantly, this also allows our
// templates to look / feel more like our server-side
// templates that use the rc (Request Context / Colletion) in
// order to render their markup.
_.templateSettings.variable = "rc";

// Grab the HTML out of our template tag and pre-compile it.
const templateCompile = _.template(
  $("script.template").html()
);

// Render the underscore template and inject it after the H1
// in our current DOM.
const injectData = () => {
  $("h1").after(
    templateCompile(templateData)
  );
};

// Define our render data (to be put into the "rc" variable).
let templateData = {};

(function () {
  $.getJSON({
      method: "GET",
      url: "src/js/ajax/bonsai.json",
      dataType: "json",
      cache: true
    })
    .done((data) => {
      templateData = data;
      console.log(templateData.bonsai.length);
      injectData();
    });
})();