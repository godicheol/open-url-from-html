(function() {
    'use strict';

    var exports = {};

    exports.isNode = function(arg) {
        return (typeof(Node) === "object" ? (arg instanceof Node) : typeof(arg) === "object" && arg !== null && typeof(arg.nodeType) === "number" && typeof(arg.nodeName) === "string");
    }
    exports.isElement = function(arg) {
        return (typeof(HTMLElement === "object") ? (arg instanceof HTMLElement) : typeof(arg) === "object" && arg !== null  && arg.nodeType === 1 && typeof(arg.nodeName) === "string");
    }
    exports.toArray = function(element) {
        var output = [[element]];
        var branches = [];
        var siblings = [];
        var hasChildren = element.children.length > 0;
        var lv = 0;
        var i;
        var j;
        while(hasChildren) {
            hasChildren = false;
            branches = output[lv];
            siblings = [];
            for (i = 0; i < branches.length; i++) {
                for (j = 0; j < branches[i].children.length; j++) {
                    siblings.push(branches[i].children[j]);
                    if (hasChildren === false && branches[i].children[j].children.length > 0) {
                        hasChildren = true;
                    }
                }
            }
            lv++;
            output[lv] = siblings;
        }
        return output;
    }
    exports.parse = function(element) {
        var toArray = this.toArray;
        var isNode = this.isNode;
        var isElement = this.isElement;

        if (!isElement(element) || !isNode(element)) {
            throw new Error("element must be a Element");
        }

        var treeArray = toArray(element);
        var i;
        var j;
        var k;
        var n;
        var v;
        var id;
        var tn;
        var cc;
        var text;
        var attrs;
        var output = [];

        for (i = 0; i < treeArray.length; i++) {
            for (j = 0; j < treeArray[i].length; j++) {
                id = treeArray[i][j].id !== "" ? treeArray[i][j].id : undefined;
                tn = treeArray[i][j].tagName.toLowerCase();
                cc = treeArray[i][j].children.length;
                text = treeArray[i][j].innerContent || treeArray[i][j].innerText;
                attrs = {};
                for (k = 0; k < treeArray[i][j].attributes.length; k++) {
                    n = treeArray[i][j].attributes[k].name;
                    v = treeArray[i][j].attributes[k].value;
                    attrs[n] = v;
                }
                output.push({
                    level: i,
                    index: j,
                    id: id,
                    tagName: tn,
                    text: text,
                    childrenCount: cc,
                    hasChildren: cc > 0,
                    attributes: attrs,
                });
            }
        }
        return output;
    }
    exports.get = function(arr, field) {
        var output = [];
        var fields = field.split(".");
        var i, j, tmp;
        for (i = 0; i < arr.length; i++) {
            tmp = arr[i];
            for (j = 0; j < fields.length; j++) {
                if (typeof(tmp) === "object" && tmp !== null && tmp.hasOwnProperty(fields[j])) {
                    tmp = tmp[fields[j]];
                } else {
                    tmp = undefined;
                    break;
                }
            }
            if (tmp) {
                output.push(tmp);
            }
        }
        return output;
    }

    if (typeof(window.htmlParser) === "undefined") {
        window.htmlParser = exports;
    }
})();