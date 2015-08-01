define('whisper-ui/templates/login', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      meta: {
        "revision": "Ember@1.13.3",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 52,
            "column": 0
          }
        },
        "moduleName": "whisper-ui/templates/login.hbs"
      },
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"id","loginPage");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","ui grid container");
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","ui one column stackable page grid");
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4,"id","content");
        var el5 = dom.createTextNode("\n\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment(" {{ emptyErrors }} ");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n\n\n    ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("form");
        dom.setAttribute(el5,"class","ui error form inverted white segment");
        dom.setAttribute(el5,"id","loginForm");
        var el6 = dom.createTextNode("\n\n      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createComment(" <h3 class=\"ui grey header\">\n        <i class=\"user icon\"></i>\n        <div class=\"content\">\n          Login\n        </div>\n      </h3> ");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","field");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","ui icon labeled input full-width");
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","ui label");
        var el9 = dom.createTextNode("\n            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","user icon");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n          ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8,"class","warning red icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("div");
        dom.setAttribute(el6,"class","field");
        var el7 = dom.createTextNode("\n        ");
        dom.appendChild(el6, el7);
        var el7 = dom.createElement("div");
        dom.setAttribute(el7,"class","ui icon labeled input full-width");
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("div");
        dom.setAttribute(el8,"class","ui label");
        var el9 = dom.createTextNode("\n            ");
        dom.appendChild(el8, el9);
        var el9 = dom.createElement("i");
        dom.setAttribute(el9,"class","lock icon");
        dom.appendChild(el8, el9);
        var el9 = dom.createTextNode("\n          ");
        dom.appendChild(el8, el9);
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createComment("");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n          ");
        dom.appendChild(el7, el8);
        var el8 = dom.createElement("i");
        dom.setAttribute(el8,"class","warning red icon");
        dom.appendChild(el7, el8);
        var el8 = dom.createTextNode("\n        ");
        dom.appendChild(el7, el8);
        dom.appendChild(el6, el7);
        var el7 = dom.createTextNode("\n      ");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("br");
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n\n      ");
        dom.appendChild(el5, el6);
        var el6 = dom.createElement("button");
        dom.setAttribute(el6,"type","submit");
        dom.setAttribute(el6,"class","fluid ui green button");
        dom.setAttribute(el6,"style","text-align: right!important;");
        var el7 = dom.createTextNode("Login");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        var el6 = dom.createTextNode("\n    ");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n  ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 9, 1, 1]);
        var element1 = dom.childAt(element0, [5]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0,1,1);
        morphs[1] = dom.createElementMorph(element1);
        morphs[2] = dom.createMorphAt(dom.childAt(element1, [3, 1]),3,3);
        morphs[3] = dom.createMorphAt(dom.childAt(element1, [7, 1]),3,3);
        return morphs;
      },
      statements: [
        ["inline","messages-errors",[],["errors",["subexpr","@mut",[["get","errors",["loc",[null,[11,32],[11,38]]]]],[],[]]],["loc",[null,[11,6],[11,41]]]],
        ["element","action",["authenticate"],["on","submit"],["loc",[null,[15,10],[15,47]]]],
        ["inline","input",[],["type","text","value",["subexpr","@mut",[["get","identification",["loc",[null,[29,37],[29,51]]]]],[],[]],"id","user_name","placeholder","Username"],["loc",[null,[29,10],[29,92]]]],
        ["inline","input",[],["type","password","value",["subexpr","@mut",[["get","password",["loc",[null,[39,40],[39,48]]]]],[],[]],"id","password","placeholder","Password"],["loc",[null,[39,10],[39,87]]]]
      ],
      locals: [],
      templates: []
    };
  }()));

});