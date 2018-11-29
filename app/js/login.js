var api;

document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  var GeotabLogin = (function () {

    /*var api = GeotabApi(function (authenticationCallback) {
      authenticationCallback('my.geotab.com', 'mmfleet', 'mayra.delgado@metricamovil.com', 'Amoalverde12#', function (errorString) {
        alert(errorString);
      });
    }, false);*/

    var authenticationCallback,
      debug = {
        enabled: false,
        server: "my.geotab.com",
        database: "mmfleet",
        email: "mayra.delgado@metricamovil.com",
        password: "Amoalverde12#"
      };

    function initializeGeotabApi() {
      api = GeotabApi(function (detailsCallback) {
        authenticationCallback = detailsCallback;

        document.getElementById("signin-content").style.display = "block";
        document.getElementById("example-content").style.display = "none";
      }, {
        rememberMe: false,
        jsonp: true
      });
    }

    function signOut(reason) {
      if (reason !== undefined) {
        alert(reason);
      }

      document.getElementById("signin-content").style.display = "block";
      document.getElementById("example-content").style.display = "none";
    }

    function closeModal(id) {
      var modal = document.getElementById(id + "-modal"),
        blanket = document.getElementById("blanket");

      modal.parentNode.removeChild(modal);
      blanket.parentNode.removeChild(blanket);
    }

    function showModal(id) {
      var blanket = document.createElement("div"),
        modal = document.createElement("div"),
        modalClose = document.createElement("button");

      blanket.setAttribute("id", "blanket");
      blanket.setAttribute("class", "blanket");
      blanket.onclick = function () {
        closeModal(id);
      };
      document.body.appendChild(blanket);

      modalClose.setAttribute("class", "modalClose");
      modalClose.onclick = function () {
        closeModal(id);
      };
      modalClose.innerHTML = "OK";

      modal.setAttribute("id", id + "-modal");
      modal.setAttribute("class", "modal bordered");
      modal.style.display = "block";
      modal.innerHTML = document.getElementById(id).innerHTML;

      modal.appendChild(modalClose);
      document.body.appendChild(modal);
    };

    function createLabel(options) {
      var element = document.createElement("label");
      element.setAttribute("for", options.for);
      element.innerHTML = options.html;
      return element;
    };

    function createInput(options) {
      var element = document.createElement("input");
      element.setAttribute("id", options.id);
      element.setAttribute("type", options.type);
      element.setAttribute("placeholder", options.placeholder);
      if (options.value !== undefined) {
        element.setAttribute("value", options.value);
      }
      return element;
    };

    function intializeInterface() {
      // Build sign in form
      var form = document.createElement("form"),
        legend = document.createElement("legend"),
        paragraph1 = document.createElement("p"),
        paragraph2 = document.createElement("p"),
        paragraph3 = document.createElement("p"),
        paragraph4 = document.createElement("p"),
        button = document.createElement("button")

      legend.innerHTML = "Iniciar sesion ";

      // Build server field
      paragraph1.appendChild(createLabel({
        for: "server",
        html: "Servidor"
      }));
      paragraph1.appendChild(createInput({
        id: "server",
        type: "text",
        placeholder: "my.geotab.com",
        value: ("my.geotab.com")
      }));

      // Build database field
      paragraph2.appendChild(createLabel({
        for: "database",
        html: "Base de datos"
      }));
      paragraph2.appendChild(createInput({
        id: "database",
        type: "text",
        placeholder: "Base de datos",
        value: ("mmfleet")
      }));

      // Build email field
      paragraph3.appendChild(createLabel({
        for: "email",
        html: "Email"
      }));
      paragraph3.appendChild(createInput({
        id: "email",
        type: "email",
        placeholder: "Email",
        value: ("mayra.delgado@metricamovil.com")
      }));

      // Build password field
      paragraph4.appendChild(createLabel({
        for: "password",
        html: "Contraseña"
      }));
      paragraph4.appendChild(createInput({
        id: "password",
        type: "password",
        placeholder: "",
        value: ("Amoalverde12#")
      }));

      button.setAttribute("id", "signin");
      button.innerHTML = "Iniciar sesion";

      form.appendChild(legend);
      form.appendChild(paragraph1);
      form.appendChild(paragraph2);
      form.appendChild(paragraph3);
      form.appendChild(paragraph4);
      form.appendChild(button);

      document.getElementById("signin-content").appendChild(form);

      var templateButton = document.getElementById("template");

      if (templateButton) {
        templateButton.addEventListener("click", function (event) {
          event.preventDefault();
          showModal("template-content");
        });
      }

      document.getElementById("signin").addEventListener("click", function (event) {
        event.preventDefault();

        var server = document.getElementById("server").value,
          database = document.getElementById("database").value,
          email = document.getElementById("email").value,
          password = document.getElementById("password").value;

        authenticationCallback(server, database, email, password, function (error) {
          alert(error);
          signOut();
        });

        document.getElementById("signin-content").style.display = "none";
        document.getElementById("example-content").style.display = "block";
      });

      document.getElementById("signout").addEventListener("click", function (event) {
        event.preventDefault();

        if (api !== undefined) {
          api.forget();
        }

        signOut();
      });

      document.getElementById("help").addEventListener("click", function (event) {
        event.preventDefault();
        showModal("help-content");
      });
    }

    return function () {
      this.initialize = function () {
        initializeGeotabApi();
        intializeInterface();
      }
    };

  })();

  var app = new GeotabLogin();
  app.initialize();

});