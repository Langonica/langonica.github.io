(function(e) {
    e.isNumeric == null && (e.isNumeric = function(e) {
        return e != null && e.constructor === Number
    });
    e.isFunction == null && (e.isFunction = function(e) {
        return e != null && e instanceof Function
    });
    var t = e(window);
    var n = e(document);
    var r = {
        defaultConfig: {
            animate: false,
            cache: true,
            cellW: 100,
            cellH: 100,
            delay: 0,
            engine: "giot",
            fixSize: null,
            gutterX: 15,
            gutterY: 15,
            selector: "> div",
            draggable: false,
            rightToLeft: false,
            bottomToTop: false,
            onGapFound: function() {},
            onComplete: function() {},
            onResize: function() {},
            onBlockReady: function() {},
            onBlockFinish: function() {},
            onBlockActive: function() {},
            onBlockResize: function() {}
        },
        plugin: {},
        totalGrid: 1,
        transition: false,
        loadBlock: function(t, n) {
            var r = n.runtime;
            var i = r.gutterX;
            var s = r.gutterY;
            var o = r.cellH;
            var u = r.cellW;
            var a = null;
            var f = e(t);
            var l = f.data("active");
            var c = f.attr("data-position");
            var h = parseInt(f.attr("data-fixSize"));
            var p = r.lastId+++"-" + r.totalGrid;
            if (f.hasClass("fw-float")) return;
            f.attr({
                id: p,
                "data-delay": t.index
            });
            if (n.animate && this.transition) {
                this.setTransition(t, "")
            }
            isNaN(h) && (h = null);
            h == null && (h = n.fixSize);
            var d = h == 1 ? "ceil" : "round";
            f.attr("data-height") == null && f.attr("data-height", f.height());
            f.attr("data-width") == null && f.attr("data-width", f.width());
            var v = 1 * f.attr("data-height");
            var m = 1 * f.attr("data-width");
            if (!n.cache) {
                t.style.width = "";
                m = f.width();
                t.style.height = "";
                v = f.height()
            }
            var g = !m ? 0 : Math[d]((m + i) / u);
            var y = !v ? 0 : Math[d]((v + s) / o);
            if (!h && n.cellH == "auto") {
                f.width(u * g - i);
                t.style.height = "";
                v = f.height();
                y = !v ? 0 : Math.round((v + s) / o)
            }
            if (!h && n.cellW == "auto") {
                f.height(o * y - s);
                t.style.width = "";
                m = f.width();
                g = !m ? 0 : Math.round((m + i) / u)
            }
            if (h != null && (g > r.limitCol || y > r.limitRow)) {
                a = null
            } else {
                y && y < r.minHoB && (r.minHoB = y);
                g && g < r.minWoB && (r.minWoB = g);
                y > r.maxHoB && (r.maxHoB = y);
                g > r.maxWoB && (r.maxWoB = g);
                m == 0 && (g = 0);
                v == 0 && (y = 0);
                a = {
                    resize: false,
                    id: p,
                    width: g,
                    height: y,
                    fixSize: h
                };
                if (c) {
                    c = c.split("-");
                    a.y = 1 * c[0];
                    a.x = 1 * c[1];
                    a.width = h != null ? g : Math.min(g, r.limitCol - a.x);
                    a.height = h != null ? y : Math.min(y, r.limitRow - a.y);
                    var b = a.y + "-" + a.x + "-" + a.width + "-" + a.height;
                    if (l) {
                        r.holes[b] = {
                            id: a.id,
                            top: a.y,
                            left: a.x,
                            width: a.width,
                            height: a.height
                        };
                        this.setBlock(a, n)
                    } else {
                        delete r.holes[b]
                    }
                }
            } if (f.attr("data-state") == null) {
                f.attr("data-state", "init")
            } else {
                f.attr("data-state", "move")
            }
            n.onBlockReady.call(t, a, n);
            return c && l ? null : a
        },
        setBlock: function(e, t) {
            var n = t.runtime;
            var r = n.gutterX;
            var i = n.gutterY;
            var s = e.height;
            var o = e.width;
            var u = n.cellH;
            var a = n.cellW;
            var f = e.x;
            var l = e.y;
            if (t.rightToLeft) {
                f = n.limitCol - f - o
            }
            if (t.bottomToTop) {
                l = n.limitRow - l - s
            }
            var c = {
                fixSize: e.fixSize,
                resize: e.resize,
                top: l * u,
                left: f * a,
                width: a * o - r,
                height: u * s - i
            };
            c.top = 1 * c.top.toFixed(2);
            c.left = 1 * c.left.toFixed(2);
            c.width = 1 * c.width.toFixed(2);
            c.height = 1 * c.height.toFixed(2);
            e.id && (n.blocks[e.id] = c);
            return c
        },
        showBlock: function(t, n) {
            function l() {
                a && o.attr("data-state", "start");
                if (n.animate && u.transition) {
                    u.setTransition(t, f)
                }
                if (!s) {
                    var e = parseInt(t.style.height) || 0;
                    var l = parseInt(t.style.width) || 0;
                    var c = parseInt(t.style.left) || 0;
                    var h = parseInt(t.style.top) || 0;
                    o[i]({
                        left: c + l / 2,
                        top: h + e / 2,
                        width: 0,
                        height: 0,
                        opacity: 0
                    })
                } else {
                    if (s.fixSize) {
                        s.height = 1 * o.attr("data-height");
                        s.width = 1 * o.attr("data-width")
                    }
                    o["css"]({
                        opacity: 1,
                        width: s.width,
                        height: s.height
                    });
                    o[i]({
                        top: s.top,
                        left: s.left
                    });
                    if (o.attr("data-nested") != null) {
                        u.nestedGrid(t, n)
                    }
                }
                r.length -= 1;
                n.onBlockFinish.call(t, s, n);
                r.length == 0 && n.onComplete.call(t, s, n)
            }
            var r = n.runtime;
            var i = n.animate && !this.transition ? "animate" : "css";
            var s = r.blocks[t.id];
            var o = e(t);
            var u = this;
            var a = o.attr("data-state") != "move";
            var f = a ? "width 0.5s, height 0.5s" : "top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";
            t.delay && clearTimeout(t.delay);
            if (o.hasClass("fw-float")) return;
            u.setTransition(t, "");
            t.style.position = "absolute";
            n.onBlockActive.call(t, s, n);
            s && s.resize && n.onBlockResize.call(t, s, n);
            n.delay > 0 ? t.delay = setTimeout(l, n.delay * o.attr("data-delay")) : l()
        },
        nestedGrid: function(t, n) {
            var r, i = e(t),
                s = n.runtime;
            var o = i.attr("data-gutterX") || n.gutterX;
            var u = i.attr("data-gutterY") || n.gutterY;
            var a = i.attr("data-method") || "fitZone";
            var f = i.attr("data-nested") || "> div";
            var l = i.attr("data-cellH") || n.cellH;
            var c = i.attr("data-cellW") || n.cellW;
            var h = s.blocks[t.id];
            if (h) {
                r = new freewall(i);
                r.reset({
                    cellH: l,
                    cellW: c,
                    gutterX: 1 * o,
                    gutterY: 1 * u,
                    selector: f
                });
                switch (a) {
                    case "fitHeight":
                        r[a](h.height);
                        break;
                    case "fitWidth":
                        r[a](h.width);
                        break;
                    case "fitZone":
                        r[a](h.width, h.height);
                        break
                }
            }
        },
        adjustBlock: function(t, n) {
            var r = n.runtime;
            var i = r.gutterX;
            var s = r.gutterY;
            var o = e("#" + t.id);
            var u = r.cellH;
            var a = r.cellW;
            if (n.cellH == "auto") {
                o.width(t.width * a - i);
                o[0].style.height = "";
                t.height = Math.round((o.height() + s) / u)
            }
        },
        adjustUnit: function(t, n, r) {
            var i = r.gutterX;
            var s = r.gutterY;
            var o = r.runtime;
            var u = r.cellW;
            var a = r.cellH;
            e.isFunction(u) && (u = u(t));
            u = 1 * u;
            !e.isNumeric(u) && (u = 1);
            e.isFunction(a) && (a = a(n));
            a = 1 * a;
            !e.isNumeric(a) && (a = 1);
            if (e.isNumeric(t)) {
                u < 1 && (u = u * t);
                var f = Math.max(1, Math.floor(t / u));
                if (!e.isNumeric(i)) {
                    i = (t - f * u) / Math.max(1, f - 1);
                    i = Math.max(0, i)
                }
                f = Math.floor((t + i) / u);
                o.cellW = (t + i) / Math.max(f, 1);
                o.cellS = o.cellW / u;
                o.gutterX = i;
                o.limitCol = f
            }
            if (e.isNumeric(n)) {
                a < 1 && (a = a * n);
                var l = Math.max(1, Math.floor(n / a));
                if (!e.isNumeric(s)) {
                    s = (n - l * a) / Math.max(1, l - 1);
                    s = Math.max(0, s)
                }
                l = Math.floor((n + s) / a);
                o.cellH = (n + s) / Math.max(l, 1);
                o.cellS = o.cellH / a;
                o.gutterY = s;
                o.limitRow = l
            }
            if (!e.isNumeric(t)) {
                u < 1 && (u = o.cellH);
                o.cellW = u != 1 ? u * o.cellS : 1;
                o.gutterX = i;
                o.limitCol = 666666
            }
            if (!e.isNumeric(n)) {
                a < 1 && (a = o.cellW);
                o.cellH = a != 1 ? a * o.cellS : 1;
                o.gutterY = s;
                o.limitRow = 666666
            }
        },
        resetGrid: function(e) {
            e.blocks = {};
            e.length = 0;
            e.cellH = 0;
            e.cellW = 0;
            e.lastId = 1;
            e.matrix = {};
            e.totalCol = 0;
            e.totalRow = 0
        },
        setDraggable: function(t, r) {
            var i = false;
            var s = {
                startX: 0,
                startY: 0,
                top: 0,
                left: 0,
                handle: null,
                onDrop: function() {},
                onDrag: function() {},
                onStart: function() {}
            };
            e(t).each(function() {
                function c(e) {
                    e.stopPropagation();
                    e = e.originalEvent;
                    if (e.touches) {
                        i = true;
                        e = e.changedTouches[0]
                    }
                    if (e.button != 2 && e.which != 3) {
                        t.onStart.call(u, e);
                        t.startX = e.clientX;
                        t.startY = e.clientY;
                        t.top = parseInt(a.css("top")) || 0;
                        t.left = parseInt(a.css("left")) || 0;
                        n.bind("mouseup touchend", p);
                        n.bind("mousemove touchmove", h)
                    }
                    return false
                }

                function h(e) {
                    e = e.originalEvent;
                    i && (e = e.changedTouches[0]);
                    a.css({
                        top: t.top - (t.startY - e.clientY),
                        left: t.left - (t.startX - e.clientX)
                    });
                    t.onDrag.call(u, e)
                }

                function p(e) {
                    e = e.originalEvent;
                    i && (e = e.changedTouches[0]);
                    t.onDrop.call(u, e);
                    n.unbind("mouseup touchend", p);
                    n.unbind("mousemove touchmove", h)
                }
                var t = e.extend({}, s, r);
                var o = t.handle || this;
                var u = this;
                var a = e(u);
                var f = e(o);
                var l = a.css("position");
                l != "absolute" && a.css("position", "relative");
                a.find("iframe, form, input, textarea, .ignore-drag").each(function() {
                    e(this).on("touchstart mousedown", function(e) {
                        e.stopPropagation()
                    })
                });
                n.unbind("mouseup touchend", p);
                n.unbind("mousemove touchmove", h);
                f.unbind("mousedown touchstart").bind("mousedown touchstart", c)
            })
        },
        setTransition: function(t, n) {
            var r = t.style;
            var i = e(t);
            if (!this.transition && i.stop) {
                i.stop()
            } else if (r.webkitTransition != null) {
                r.webkitTransition = n
            } else if (r.MozTransition != null) {
                r.MozTransition = n
            } else if (r.msTransition != null) {
                r.msTransition = n
            } else if (r.OTransition != null) {
                r.OTransition = n
            } else {
                r.transition = n
            }
        },
        getFreeArea: function(e, t, n) {
            var r = Math.min(e + n.maxHoB, n.limitRow);
            var i = Math.min(t + n.maxWoB, n.limitCol);
            var s = i;
            var o = r;
            var u = n.matrix;
            for (var a = e; a < o; ++a) {
                for (var f = t; f < i; ++f) {
                    if (u[a + "-" + f]) {
                        t < f && f < s && (s = f)
                    }
                }
            }
            for (var a = e; a < r; ++a) {
                for (var f = t; f < s; ++f) {
                    if (u[a + "-" + f]) {
                        e < a && a < o && (o = a)
                    }
                }
            }
            return {
                top: e,
                left: t,
                width: s - t,
                height: o - e
            }
        },
        setWallSize: function(e, t) {
            var n = e.totalRow;
            var r = e.totalCol;
            var i = e.gutterY;
            var s = e.gutterX;
            var o = e.cellH;
            var u = e.cellW;
            var a = Math.max(0, u * r - s);
            var f = Math.max(0, o * n - i);
            t.attr({
                "data-total-col": r,
                "data-total-row": n,
                "data-wall-width": Math.ceil(a),
                "data-wall-height": Math.ceil(f)
            });
            if (e.limitCol < e.limitRow) {
                !t.attr("data-height") && t.height(Math.ceil(f))
            }
        }
    };
    var i = {
        giot: function(e, t) {
            function w(e, t, n, r, i) {
                for (var s = t; s < t + i;) {
                    for (var o = n; o < n + r;) {
                        p[s + "-" + o] = e;
                        ++o > a && (a = o)
                    }++s > f && (f = s)
                }
            }
            var n = t.runtime,
                i = n.limitRow,
                s = n.limitCol,
                o = 0,
                u = 0,
                a = n.totalCol,
                f = n.totalRow,
                l = {}, c = n.holes,
                h = null,
                p = n.matrix,
                d = Math.max(s, i),
                v = null,
                m = null,
                g = s < i ? 1 : 0,
                y = null,
                b = Math.min(s, i);
            for (var E in c) {
                if (c.hasOwnProperty(E)) {
                    w(c[E]["id"] || true, c[E]["top"], c[E]["left"], c[E]["width"], c[E]["height"])
                }
            }
            for (var S = 0; S < d; ++S) {
                if (!e.length) break;
                g ? u = S : o = S;
                y = null;
                for (var x = 0; x < b; ++x) {
                    if (!e.length) break;
                    g ? o = x : u = x;
                    if (n.matrix[u + "-" + o]) continue;
                    v = r.getFreeArea(u, o, n);
                    h = null;
                    for (var E = 0; E < e.length; ++E) {
                        if (e[E].height > v.height) continue;
                        if (e[E].width > v.width) continue;
                        h = e.splice(E, 1)[0];
                        break
                    }
                    if (h == null && t.fixSize == null) {
                        if (y && !g && n.minHoB > v.height) {
                            y.height += v.height;
                            y.resize = true;
                            w(y.id, y.y, y.x, y.width, y.height);
                            r.setBlock(y, t);
                            continue
                        } else if (y && g && n.minWoB > v.width) {
                            y.width += v.width;
                            y.resize = true;
                            w(y.id, y.y, y.x, y.width, y.height);
                            r.setBlock(y, t);
                            continue
                        } else {
                            for (var E = 0; E < e.length; ++E) {
                                if (e[E]["fixSize"] != null) continue;
                                h = e.splice(E, 1)[0];
                                h.resize = true;
                                if (g) {
                                    h.width = v.width;
                                    if (t.cellH == "auto") {
                                        r.adjustBlock(h, t)
                                    }
                                    h.height = Math.min(h.height, v.height)
                                } else {
                                    h.height = v.height;
                                    h.width = Math.min(h.width, v.width)
                                }
                                break
                            }
                        }
                    }
                    if (h != null) {
                        l[h.id] = {
                            id: h.id,
                            x: o,
                            y: u,
                            width: h.width,
                            height: h.height,
                            resize: h.resize,
                            fixSize: h.fixSize
                        };
                        y = l[h.id];
                        w(y.id, y.y, y.x, y.width, y.height);
                        r.setBlock(y, t)
                    } else {
                        var m = {
                            x: o,
                            y: u,
                            fixSize: 0
                        };
                        if (g) {
                            m.width = v.width;
                            m.height = 0;
                            var T = o - 1;
                            var N = u;
                            while (p[N + "-" + T]) {
                                p[N + "-" + o] = true;
                                m.height += 1;
                                N += 1
                            }
                        } else {
                            m.height = v.height;
                            m.width = 0;
                            var N = u - 1;
                            var T = o;
                            while (p[N + "-" + T]) {
                                p[u + "-" + T] = true;
                                m.width += 1;
                                T += 1
                            }
                        }
                        t.onGapFound(r.setBlock(m, t), t)
                    }
                }
            }
            n.matrix = p;
            n.totalRow = f;
            n.totalCol = a
        }
    };
    window.freewall = function(n) {
        function c(t) {
            var n = f.gutterX;
            var i = f.gutterY;
            var s = f.cellH;
            var o = f.cellW;
            var l = e(t);
            var c = l.find(l.attr("data-handle"));
            r.setDraggable(t, {
                handle: c[0],
                onStart: function(e) {
                    if (a.animate && r.transition) {
                        r.setTransition(this, "")
                    }
                    l.css("z-index", 9999).addClass("fw-float")
                },
                onDrag: function(e, t) {
                    var n = l.position();
                    var r = Math.round(n.top / s);
                    var i = Math.round(n.left / o);
                    var a = Math.round(l.width() / o);
                    var c = Math.round(l.height() / s);
                    r = Math.min(Math.max(0, r), f.limitRow - c);
                    i = Math.min(Math.max(0, i), f.limitCol - a);
                    u.setHoles({
                        top: r,
                        left: i,
                        width: a,
                        height: c
                    });
                    u.refresh()
                },
                onDrop: function() {
                    var t = l.position();
                    var n = Math.round(t.top / s);
                    var r = Math.round(t.left / o);
                    var i = Math.round(l.width() / o);
                    var a = Math.round(l.height() / s);
                    n = Math.min(Math.max(0, n), f.limitRow - a);
                    r = Math.min(Math.max(0, r), f.limitCol - i);
                    l.removeClass("fw-float");
                    l.css({
                        zIndex: "auto",
                        top: n * s,
                        left: r * o
                    });
                    var c, h, p, d;
                    for (h = 0; h < a; ++h) {
                        for (c = 0; c < i; ++c) {
                            p = h + n + "-" + (c + r);
                            d = f.matrix[p];
                            if (d && d != true) {
                                e("#" + d).removeAttr("data-position")
                            }
                        }
                    }
                    f.holes = {};
                    l.attr({
                        "data-width": l.width(),
                        "data-height": l.height(),
                        "data-position": n + "-" + r
                    });
                    u.refresh()
                }
            })
        }
        var s = e(n);
        if (s.css("position") == "static") {
            s.css("position", "relative")
        }
        var o = Number.MAX_VALUE;
        var u = this;
        r.totalGrid += 1;
        var a = e.extend({}, r.defaultConfig);
        var f = {
            blocks: {},
            events: {},
            matrix: {},
            holes: {},
            cellW: 0,
            cellH: 0,
            cellS: 1,
            filter: "",
            lastId: 0,
            length: 0,
            maxWoB: 0,
            maxHoB: 0,
            minWoB: o,
            minHoB: o,
            running: 0,
            gutterX: 15,
            gutterY: 15,
            totalCol: 0,
            totalRow: 0,
            limitCol: 666666,
            limitRow: 666666,
            currentMethod: null,
            currentArguments: []
        };
        a.runtime = f;
        f.totalGrid = r.totalGrid;
        var l = document.body.style;
        if (!r.transition) {
            (l.webkitTransition != null || l.MozTransition != null || l.msTransition != null || l.OTransition != null || l.transition != null) && (r.transition = true)
        }
        e.extend(u, {
            addCustomEvent: function(e, t) {
                var n = f.events;
                e = e.toLowerCase();
                !n[e] && (n[e] = []);
                t.eid = n[e].length;
                n[e].push(t);
                return this
            },
            appendBlock: function(t) {
                var n = e(t).appendTo(s);
                var o = null;
                var u = [];
                if (f.currentMethod) {
                    n.each(function(e, t) {
                        t.index = ++e;
                        if (o = r.loadBlock(t, a)) {
                            u.push(o)
                        }
                    });
                    i[a.engine](u, a);
                    r.setWallSize(f, s);
                    f.length = n.length;
                    n.each(function(e, t) {
                        r.showBlock(t, a);
                        if (a.draggable || t.getAttribute("data-draggable")) {
                            c(t)
                        }
                    })
                }
            },
            appendHoles: function(e) {
                var t = [].concat(e),
                    n = {}, r;
                for (r = 0; r < t.length; ++r) {
                    n = t[r];
                    f.holes[n.top + "-" + n.left + "-" + n.width + "-" + n.height] = n
                }
                return this
            },
            container: s,
            destroy: function() {
                var t = s.find(a.selector).removeAttr("id"),
                    n = null,
                    r = [];
                t.each(function(t, n) {
                    $item = e(n);
                    var r = 1 * $item.attr("data-width") || "";
                    var i = 1 * $item.attr("data-height") || "";
                    $item.width(r).height(i).css({
                        position: "static"
                    })
                })
            },
            fillHoles: function(e) {
                if (arguments.length == 0) {
                    f.holes = {}
                } else {
                    var t = [].concat(e),
                        n = {}, r;
                    for (r = 0; r < t.length; ++r) {
                        n = t[r];
                        delete f.holes[n.top + "-" + n.left + "-" + n.width + "-" + n.height]
                    }
                }
                return this
            },
            filter: function(e) {
                f.filter = e;
                f.currentMethod && this.refresh();
                return this
            },
            fireEvent: function(e, t, n) {
                var r = f.events;
                e = e.toLowerCase();
                if (r[e] && r[e].length) {
                    for (var i = 0; i < r[e].length; ++i) {
                        r[e][i].call(this, t, n)
                    }
                }
                return this
            },
            fitHeight: function(n) {
                var o = s.find(a.selector).removeAttr("id"),
                    l = null,
                    h = [];
                n = n ? n : s.height() || t.height();
                f.currentMethod = arguments.callee;
                f.currentArguments = arguments;
                r.resetGrid(f);
                r.adjustUnit("auto", n, a);
                if (f.filter) {
                    o.data("active", 0);
                    o.filter(f.filter).data("active", 1)
                } else {
                    o.data("active", 1)
                }
                o.each(function(t, n) {
                    var i = e(n);
                    n.index = ++t;
                    if (l = r.loadBlock(n, a)) {
                        i.data("active") && h.push(l)
                    }
                });
                u.fireEvent("onGridReady", s, a);
                i[a.engine](h, a);
                r.setWallSize(f, s);
                u.fireEvent("onGridArrange", s, a);
                f.length = o.length;
                o.each(function(e, t) {
                    r.showBlock(t, a);
                    if (a.draggable || t.getAttribute("data-draggable")) {
                        c(t)
                    }
                })
            },
            fitWidth: function(n) {
                var o = s.find(a.selector).removeAttr("id"),
                    l = null,
                    h = [];
                n = n ? n : s.width() || t.width();
                f.currentMethod = arguments.callee;
                f.currentArguments = arguments;
                r.resetGrid(f);
                r.adjustUnit(n, "auto", a);
                if (f.filter) {
                    o.data("active", 0);
                    o.filter(f.filter).data("active", 1)
                } else {
                    o.data("active", 1)
                }
                o.each(function(t, n) {
                    var i = e(n);
                    n.index = ++t;
                    if (l = r.loadBlock(n, a)) {
                        i.data("active") && h.push(l)
                    }
                });
                u.fireEvent("onGridReady", s, a);
                i[a.engine](h, a);
                r.setWallSize(f, s);
                u.fireEvent("onGridArrange", s, a);
                f.length = o.length;
                o.each(function(e, t) {
                    r.showBlock(t, a);
                    if (a.draggable || t.getAttribute("data-draggable")) {
                        c(t)
                    }
                })
            },
            fitZone: function(n, o) {
                var l = s.find(a.selector).removeAttr("id"),
                    h = null,
                    p = [];
                o = o ? o : s.height() || t.height();
                n = n ? n : s.width() || t.width();
                f.currentMethod = arguments.callee;
                f.currentArguments = arguments;
                r.resetGrid(f);
                r.adjustUnit(n, o, a);
                if (f.filter) {
                    l.data("active", 0);
                    l.filter(f.filter).data("active", 1)
                } else {
                    l.data("active", 1)
                }
                l.each(function(t, n) {
                    var i = e(n);
                    n.index = ++t;
                    if (h = r.loadBlock(n, a)) {
                        i.data("active") && p.push(h)
                    }
                });
                u.fireEvent("onGridReady", s, a);
                i[a.engine](p, a);
                r.setWallSize(f, s);
                u.fireEvent("onGridArrange", s, a);
                f.length = l.length;
                l.each(function(e, t) {
                    r.showBlock(t, a);
                    if (a.draggable || t.getAttribute("data-draggable")) {
                        c(t)
                    }
                })
            },
            fixPos: function(t) {
                e(t.block).attr({
                    "data-position": t.top + "-" + t.left
                });
                return this
            },
            fixSize: function(t) {
                t.height != null && e(t.block).attr({
                    "data-height": t.height
                });
                t.width != null && e(t.block).attr({
                    "data-width": t.width
                });
                return this
            },
            prepend: function(e) {
                s.prepend(e);
                f.currentMethod && this.refresh();
                return this
            },
            refresh: function() {
                var e = arguments.length ? arguments : f.currentArguments;
                f.currentMethod == null && (f.currentMethod = this.fitWidth);
                f.currentMethod.apply(this, Array.prototype.slice.call(e, 0));
                return this
            },
            reset: function(t) {
                e.extend(a, t);
                return this
            },
            setHoles: function(e) {
                var t = [].concat(e),
                    n = {}, r;
                f.holes = {};
                for (r = 0; r < t.length; ++r) {
                    n = t[r];
                    f.holes[n.top + "-" + n.left + "-" + n.width + "-" + n.height] = n
                }
                return this
            },
            unFilter: function() {
                delete f.filter;
                this.refresh();
                return this
            }
        });
        s.attr("data-min-width", Math.floor(t.width() / 80) * 80);
        for (var h in r.plugin) {
            if (r.plugin.hasOwnProperty(h)) {
                r.plugin[h].call(u, a, s)
            }
        }
        t.resize(function() {
            if (f.running) return;
            f.running = 1;
            setTimeout(function() {
                f.running = 0;
                a.onResize.call(u, s)
            }, 122);
            s.attr("data-min-width", Math.floor(t.width() / 80) * 80)
        })
    };
    freewall.addConfig = function(t) {
        e.extend(r.defaultConfig, t)
    };
    freewall.createEngine = function(t) {
        e.extend(i, t)
    };
    freewall.createPlugin = function(t) {
        e.extend(r.plugin, t)
    };
    freewall.getMethod = function(e) {
        return r[e]
    }
})(window.Zepto || window.jQuery)

function animateClick(e, t) {
    spinner(e);
    e.animate({
        opacity: .3
    }, fadeOff, "swing").delay(fadeOn).animate({
        opacity: 1
    }, fadeOn, "swing")
}

function spinner(e) {
    e.closest(".tile").find(".spinner").fadeIn("slow").delay(2e3).fadeOut("slow")
}

function setIcons() {
    $(".switch, .dimmer").append("<div class='icon inactive'><i class='fa fa-toggle-off'></i></div>").append("<div class='icon active'><i class='fa fa-toggle-on'></i></div>");
    $(".lock").append("<div class='icon inactive'><i class='fa fa-lock'></i></div>").append("<div class='icon active'><i class='fa fa-unlock-alt'></i></div>");
    $(".motion").append("<div class='icon inactive'><i class='fa opaque fa-exchange'></i></div>").append("<div class='icon active'><i class='fa fa-exchange'></i></div>");
    $(".presence").append("<div class='icon inactive'><i class='fa opaque fa-map-marker'></i></div>").append("<div class='icon active'><i class='fa fa-map-marker'></i></div>");
    $(".contact").append("<div class='icon inactive'><i class='r45 fa fa-compress'></i></div>").append("<div class='icon active'><i class='r45 fa fa-expand'></i></div>");
    $(".water").append("<div class='icon inactive'><i class='fa opaque fa-tint'></i></div>").append("<div class='icon active'><i class='fa fa-tint'></i></div>");
    $(".momentary").append("<div class='icon'><i class='fa fa-circle-o'></i></div>");
    $(".camera").append("<div class='icon'><i class='fa fa-camera'></i></div>");
    $(".holiday").append("<div class='icon'><i class='fa fa-tree'></i></div>");
    $(".refresh").append("<div class='icon'><i class='fa fa-refresh'></i></div>");
    $(".dimmer").each(function() {
        renderSlider($(this), 1)
    });
    $(".music").each(function() {
        renderSlider($(this), 0)
    });
    $(".weather").each(function() {
        renderWeather($(this))
    });
    $(".temperature").each(function() {
        renderTemp($(this))
    });
    $(".humidity").each(function() {
        renderHumidity($(this))
    });
    $(".energy").append("<div class='footer'><i class='fa fa-fw wi wi-lightning'></i></div>");
    $(".power").append("<div class='footer'><i class='fa fa-fw fa-bolt'></i></div>");
    $(".battery").each(function() {
        renderBatt($(this))
    });
    $(".tile[data-is-value=true]").each(function() {
        renderValue($(this))
    })
}



function renderTemp(e) {
    e.find(".icon").remove();
    var foo = e.attr("data-value");
    var res = foo.replace("°", "");
    var unique = e.attr("data-device") + "TEMP";
    e.append("<div class='gaugePos' id='"+unique+"'></div><div class='footer'><i class='fa fa-fw wi wi-thermometer'></i></div>");
	gaugeTemp(foo,res,unique);
}

function gaugeTemp(a,b,c){


var csatGauge = new FusionCharts({
        "type": "angulargauge",
        "renderAt": c,

        "dataFormat": "json",
        "dataSource":{
   "chart": {
           "width": "100%",
        "height": "100%",
      "theme": "dash"
   },
   "colorRange": {
      "color": [
         {
            "minValue": "-10",
            "maxValue": b,
            "code": "#AB0F0B"
         },
         {
            "minValue": b,
            "maxValue": 120,
            "code": "#fff"
         }
      ]
   },
   "dials": {
      "dial": [
         {
            "value": b
         }
      ]
   }
}
      });
	csatGauge.setTransparent(true);
    csatGauge.render();
   


}

function renderHumidity(e) {
    e.find(".icon").remove();
    var foo = e.attr("data-value");
    var res = foo.replace("%", "");
    var unique = e.attr("data-device") + "b";
    e.append("<div class='gaugePos' id='"+unique+"'></div><div class='footer'><i class='fa fa-fw wi wi-sprinkles'></i></div>");
	gaugeHumidity(foo,res,unique);
}

function gaugeHumidity(a,b,c){



}

function renderBatt(e) {
    e.find(".icon").remove();
    var foo = e.attr("data-value");
    var res = foo.replace("%", "");
    var unique = e.attr("data-device") + "c";
    e.append("<div class='gaugePos' id='"+unique+"'></div><div class='footer'><span class='batt'></span></div>");
	gaugeBattery(foo,res,unique);
}

function gaugeBattery(a,b,c){


}

function renderSlider(e, t) {
    e.find(".slider-container").remove();
    e.append("<div class='slider-container'><div class='full-width-slider'><input value='" + e.attr("data-level") + "' min='" + t + "' max='10' type='range' step='1' data-mini='true' data-popup-enabled='true' data-disabled='false' data-highlight='true'></div></div>").find("input").slider();
    $(".full-width-slider").click(function(e) {
        e.stopImmediatePropagation()
    })
}

function renderValue(e) {
    e.find(".icon").remove();
    if (e.attr("data-type") != "humidity" && e.attr("data-type") != "battery" && e.attr("data-type") != "temperature") {
    	e.append("<div class='icon text'>" + e.attr("data-value") + "</div>")
     }
}

function renderWeather(e) {
    var t = JSON.parse(e.attr("data-weather"));
    e.empty();
    var n = "<div class='title'>" + t.city + "<br/><span class='title2'>" + t.weather + ", feels like " + t.feelsLike + "&deg;</span></div>\n<div class='icon'><span class='text'>" + t.temperature + "&deg;</span><i class='wi " + t.icon + "'></i></span></div>\n<div class='footer'>" + t.localSunrise + " <i class='fa fa-fw wi wi-horizon-alt'></i> " + t.localSunset + "</div>\n<div class='footer right'>" + t.percentPrecip + "%<i class='fa fa-fw fa-umbrella'></i><br>" + t.humidity + "%<i class='fa fa-fw wi wi-sprinkles'></i></div>";
    e.html(n)
}

function sendCommand(e, t, n, r) {
    var i = getUrlParameter("access_token");
    var s = {
        type: e,
        device: t,
        command: n,
        value: r
    };
    if (i) s["access_token"] = i;
    $.get("command", s).done(function(e) {
        if (e.status == "ok") {
            nextPoll(5)
        }
    }).fail(function() {
        setWTFCloud();
        nextPoll(10)
    })
}

function doPoll(e) {
    nextPoll(20);
    if (!e) spinner($(".refresh"));
    var t = getUrlParameter("access_token");
    var n = {
        ts: stateTS
    };
    if (t) n["access_token"] = t;
    $.get("ping", n).done(function(t) {
        clearWTFCloud();
        if (e) {
            e()
        } else {
            stateTS = t.ts;
            $(".refresh .footer").html("Updated " + t.updated);
            if (t.status == "update") updateTiles(t.data)
        }
    }).fail(function() {
        setWTFCloud()
    })
}

function updateTiles(e) {
    for (i in e) updateTile(e[i])
}

function updateTile(e) {
    if (e.tile == "device") {
        var t = $("." + e.type + "[data-device=" + e.device + "]");
        if (e.tile == "weather") {
            t.attr("data-weather", JSON.stringify(d));
            renderWeather(t)
        } else {
            if (e.value != t.attr("data-value")) spinner(t);
            t.attr("data-value", e.value);
            if (e.isValue) {
                renderValue(t)
                
            } else {
                t.removeClass("inactive active").addClass(e.active);
                t.attr("data-active", e.active)
            } if (e.type == "dimmer") {
                if (e.level != t.attr("data-level")) spinner(t);
                t.attr("data-level", e.level);
                renderSlider(t, 1)
            } else if (e.type == "music") {
                renderSlider(t, 0)
            }
        }
    } else if (e.tile == "mode") {
        var t = $(".mode");
        if (e.mode != t.attr("data-mode")) spinner(t);
        t.removeClass(t.attr("data-mode"));
        t.attr("data-mode", e.mode);
        if (e.isStandardMode) t.addClass(e.mode);
        $(".mode-name").html(e.mode)
    }
}

function setWTFCloud() {
    wtfCloud = true;
    $("#wtfcloud-popup").popup("open")
}

function clearWTFCloud() {
    wtfCloud = false;
    $("#wtfcloud-popup").popup("close")
}

function nextPoll(e) {
    if (polling) clearInterval(polling);
    polling = setInterval(function() {
        doPoll()
    }, e * 1e3)
}

function refresh(e) {
    if (!e) {
        setTimeout(function() {
            doRefresh()
        }, 100)
    } else {
        setTimeout(function() {
            doRefresh()
        }, e * 1e3)
    }
}

function doRefresh() {
    doPoll(function() {
        $(".refresh .icon").addClass("fa-spin");
        location.reload()
    })
}

function getUrlParameter(e) {
    var t = window.location.search.substring(1);
    var n = t.split("&");
    for (var r = 0; r < n.length; r++) {
        var i = n[r].split("=");
        if (i[0] == e) {
            return i[1]
        }
    }
}

function startTime() {
    if (!document.getElementById("clock")) return;
    var e = new Date;
    var t = e.getHours();
    if (t > 12) {
        t = t - 12
    }
    var n = e.getMinutes();
    var r = e.getSeconds();
    n = checkTime(n);
    r = checkTime(r);
    document.getElementById("clock").innerHTML = t + ":" + n;
    setTimeout(function() {
        startTime()
    }, 500)
}

function checkTime(e) {
    if (e < 10) {
        e = "0" + e
    }
    return e
}
$(function() {
    $(".tile").append("<i class='spinner fa fa-refresh fa-spin'></i>");
    setIcons();
    $(".switch, .dimmer, .momentary, .clock, .lock, .link, .holiday, .camera").click(function() {
        animateClick($(this))
    });
    $(".switch, .lock, .momentary, .music .play, .music .pause, .holiday, .camera").click(function() {
        $(this).closest(".tile").toggleClass("active");
        sendCommand($(this).attr("data-type"), $(this).attr("data-device"), "toggle")
    });
    $(".dimmer").on("slidestop", function(e) {
        var t = $(this).find("input").val();
        if ($(this).hasClass("active")) {
            animateClick($(this));
            sendCommand("dimmer", $(this).attr("data-device"), "level", t)
        }
        $(this).attr("data-level", t)
    });
    $(".dimmer").click(function() {
        $(this).toggleClass("active");
        sendCommand("dimmer", $(this).attr("data-device"), "toggle", $(this).attr("data-level"))
    });
    $(".mode, .hello-home, .thermostat").click(function() {
        $("#" + $(this).attr("data-popup")).popup("open")
    });
    $(".refresh, .clock").click(function() {
        refresh()
    });
    $("#mode-popup li").click(function() {
        $("#mode-popup").popup("close");
        var e = $(".mode");
        animateClick(e);
        var t = $(this).text();
        sendCommand("mode", "mode", t);
        var n = $(".mode").attr("data-mode");
        e.removeClass(n);
        e.attr("data-mode", t);
        if (["Home", "Away", "Night"].indexOf(t) >= 0) {
            $("#mode-name").hide();
            e.addClass(t)
        } else {
            $("#mode-name").html(t).show()
        }
    });
    $("#hello-home-popup li").on("click", function() {
        $("#hello-home-popup").popup("close");
        animateClick($(".hello-home"));
        sendCommand("helloHome", "helloHome", $(this).text())
    });
    startTime();
    $(".wtfcloud").click(function() {
        $("#wtfcloud-popup").popup("open")
    })
});
var fadeOn = 100;
var fadeOff = 200;
var polling;
var wtfCloud = false;
nextPoll(30);
refresh(60 * 60);
CoolClock.config.skins = {
    st: {
        outerBorder: {
            lineWidth: 12,
            radius: 100,
            color: "yellow",
            alpha: 0
        },
        smallIndicator: {
            lineWidth: 16,
            startAt: 80,
            endAt: 85,
            color: "white",
            alpha: 1
        },
        largeIndicator: {
            lineWidth: 2,
            startAt: 80,
            endAt: 85,
            color: "white",
            alpha: 1
        },
        hourHand: {
            lineWidth: 8,
            startAt: 0,
            endAt: 60,
            color: "white",
            alpha: 1
        },
        minuteHand: {
            lineWidth: 6,
            startAt: 0,
            endAt: 75,
            color: "white",
            alpha: 1
        },
        secondHand: {
            lineWidth: 5,
            startAt: 80,
            endAt: 85,
            color: "red",
            alpha: 0
        },
        secondDecoration: {
            lineWidth: 3,
            startAt: 96,
            radius: 4,
            fillColor: "white",
            color: "black",
            alpha: 1
        }
    },
    st1: {
        outerBorder: {
            lineWidth: 2,
            radius: 80,
            color: "white",
            alpha: 0
        },
        smallIndicator: {
            lineWidth: 5,
            startAt: 88,
            endAt: 94,
            color: "yellow",
            alpha: 0
        },
        largeIndicator: {
            lineWidth: 5,
            startAt: 90,
            endAt: 94,
            color: "white",
            alpha: 1
        },
        hourHand: {
            lineWidth: 8,
            startAt: 0,
            endAt: 60,
            color: "white",
            alpha: 1
        },
        minuteHand: {
            lineWidth: 8,
            startAt: 0,
            endAt: 80,
            color: "white",
            alpha: 1
        },
        secondHand: {
            lineWidth: 5,
            startAt: 89,
            endAt: 94,
            color: "white",
            alpha: 1
        },
        secondDecoration: {
            lineWidth: 3,
            startAt: 0,
            radius: 4,
            fillColor: "black",
            color: "black",
            alpha: 0
        }
    }
};
var cellSize = getUrlParameter("t") || 120;
var cellGutter = getUrlParameter("g") || 4;
$(function() {
    var e = new freewall(".tiles");
    e.fitWidth();
    e.reset({
        draggable: false,
        selector: ".tile",
        animate: true,
        gutterX: cellGutter,
        gutterY: cellGutter,
        cellW: cellSize,
        cellH: cellSize,
        fixSize: null,
        onResize: function() {
            e.fitWidth();
            e.refresh()
        }
    });
    e.fitWidth();
    $(window).trigger("resize")
})
