var MW = {
    MsgUtil: {
        index: 0,
        msgCache: [],
        configOptions: function (option, content, obj) {
            if (typeof content == "object") {
                option = $.extend(option, content);
            } else if (typeof content == "string" && typeof obj != "object") {
                option.content = content;
            } else if (typeof obj == "object") {
                option.content = content;
                option = $.extend(option, obj);
            }
            return option;
        },
    },
    MenuUtil: {
        index: -1,
        menuCache: [],
        init: function (options) {
            var self = this;
            var defaultOp = {
                target: 'body',
                position: 'fixed',
                offset: "rb", // lt:左上角,lb:左下角,rt:左上角,rb左下角
                menus: [], // goTop
            };
            var settings = $.extend(defaultOp, options);
            var $target = $(settings.target)// .css("height", "auto");

            var defaultMenu = {
                goTop: {
                    content: "TOP",
                    iconClass: "glyphicon glyphicon-chevron-up",
                    click: function () {
                        return $(settings.target === 'body' ? window : settings.target).scrollTop(0);
                    },
                    show: function () {
                        return $(settings.target === 'body' ? window : settings.target).scrollTop() > 300;
                    }
                }
            };
            $.each(defaultMenu, function (name, item) {
                if (settings.menus.indexOf(name) > -1) {
                    settings.menus[settings.menus.indexOf(name)] = item;
                }
            })

            if (self.menuCache.length == 0) {
                $(settings.target === 'body' ? window : settings.target).on("scroll", function () {
                    $.map(self.menuCache, function (menuDom) {
                        menuDom.find(".menu_items>li").each(function (i, menu) {
                            var $menu = $(menu);
                            if ($.isFunction($menu.data("show")) && $menu.data("show")() || !$.isFunction($menu.data("show")) && $menu.data("show")) {
                                $menu.css("display", "block");
                                $menu.removeClass("hideMenu");
                            } else if (!$menu.hasClass("hideMenu")) {
                                $menu.addClass("hideMenu");
                                //$.support.transition 依赖bootstrap
                                $menu.one($.support.transition.end, function () {
                                    $menu.css("display", "none");
                                }).emulateTransitionEnd(200)
                            }
                        })
                    })
                })
            }
            var index = self._stitchingContent(settings);
            self._render($target, index);
        },
        _render: function (target, index) {
            var self = this;
            var rDom = self.getMenu(index);
            var settings = rDom.data("settings");
            target.append(rDom);
            self._calculatePosition(index, settings.offset)
            rDom.find(".menu_items>li").each(function (i, menu) {
                var $menu = $(menu);
                if ($.isFunction($menu.data("show")) && !$menu.data("show")() || !$.isFunction($menu.data("show")) && !$menu.data("show")) {
                    $menu.css("display", "none")
                }
            })
        },
        _calculatePosition: function (index, offset) {
            var selfOffset, self = this, rDom = self.menuCache[index];;
            if (typeof offset == "object") {
                selfOffset = offset;
            } else {
                switch (offset) {
                    case "lt":
                        selfOffset = {
                            left: '3em',
                            top: '3em'
                        }
                        break
                    case "lb":
                        selfOffset = {
                            left: '3em',
                            bottom: '3em'
                        }
                        break
                    case "rt":
                        selfOffset = {
                            right: '3em',
                            top: '3em'
                        }
                        break
                    case "rb":
                    default:
                        selfOffset = {
                            bottom: '3em',
                            right: '3em'
                        }
                }
            }
            self.setPosition(self.index, selfOffset);
            return selfOffset;
        },
        _stitchingContent: function (settings) {
            var self = this;
            var index = ++self.index;
            var $html = $("<div class='menu_box'><ul class='menu_items'></ul></div>");
            $html.css('position', settings.position)
            $.each(settings.menus, function (i, menu) {
                var $li = $("<li><span></span><span></span></li>");
                $li.find("span").eq(0).addClass(menu.iconClass);
                $li.find("span").eq(1).html(menu.content)
                $.isFunction(menu.click) && $li.on("click", menu.click.bind($li[0], index));
                $li.data("target", $("body"));
                $li.data("show", menu.show);
                $html.find(".menu_items").append($li);
            });
            $html.data("settings", settings);
            self.menuCache[index] = $html;
            return index;
        },
        setPosition: function (index, offset) {
            var self = this;
            self.getMenu(index).css(offset);
        },
        getPosition: function (index) {
            self.getMenu(index).offset();
        },
        addMenu: function (index, item) { },
        getMenu: function (index) {
            var self = this;
            return self.menuCache[index];
        },
        showMenu: function (index, menuIndex) {

        },
        _goTop: function (index) {
            scrollTo(0, 0);
        }
    }
}

MW.MsgUtil.close = function (index) {
    var closeFn;
    var getcloseFn = function (_index) {
        if (MW.MsgUtil.msgCache[_index]) {
            MW.MsgUtil.msgCache[_index] && MW.MsgUtil.msgCache[_index].modal("hide");
            closeFn = MW.MsgUtil.msgCache[_index].data("close.fn");
        } else {
            getcloseFn(_index - 1);
        }
    }
    getcloseFn(index);
    $.isFunction(closeFn) && closeFn(index);
    delete MW.MsgUtil.msgCache[index];
    MW.MsgUtil.msgCache = MW.MsgUtil.msgCache.filter(function (x) { return x });
};

MW.MsgUtil.getDom = function (index) {
    return MW.MsgUtil.msgCache[index];
};

MW.MsgUtil.info = function (content, obj) {//0
    var options = {
        content: "",
        btn: ["Confirm"],
    };
    options = MW.MsgUtil.configOptions(options, content, obj);
    return MW.MsgUtil.templet(0, options);
};
MW.MsgUtil.warn = function (content, obj) {//1
    var options = {
        content: "",
        btn: ["Confirm"],
    };
    options = MW.MsgUtil.configOptions(options, content, obj);
    return MW.MsgUtil.templet(1, options);
};

MW.MsgUtil.confirm = function (content, obj) {//2
    var options = {
        content: "",
    };
    options = MW.MsgUtil.configOptions(options, content, obj);
    return MW.MsgUtil.templet(2, options);
};

MW.MsgUtil.error = function (content, obj) {//3
    var options = {
        content: "",
        btn: ["Confirm"],
    };
    options = MW.MsgUtil.configOptions(options, content, obj);
    return MW.MsgUtil.templet(3, options);
};

MW.MsgUtil.msg = function (content, obj) {//4
    var options = {
        content: "",
        time: 2000,
        btn: [],
    };
    options = MW.MsgUtil.configOptions(options, content, obj);
    return MW.MsgUtil.templet(4, options);
};

MW.MsgUtil.templet = function (type, options) {
    var index = MW.MsgUtil.index++;
    var defaultOptions = {
        title: "",
        content: "",
        time: 0,
        zIndex: 19891,
        btn: ["Confirm", "Cancel"],
        yes: null,
        cancel: null,
        close: null,
        textAlign: "center"
    }
    var typeClass = "alert-default";
    var btnClass = "btn-info";
    switch (type) {
        case 0:
            typeClass = "alert-info";
            break;
        case 1:
            typeClass = "alert-warning";
            btnClass = "btn-warning";
            break;
        case 2:
            typeClass = "alert-info";
            btnClass = "btn-info";
            break;
        case 3:
            typeClass = "alert-danger";
            btnClass = "btn-danger";
            break;
        case 4:
            typeClass = "alert-msg";
            break;
    }
    var op = $.extend(defaultOptions, options);
    var btnHtml = "";
    $.each(op.btn, function (i, btn) {
        if (i == 0) {
            btnHtml += "<button type='button' class='btn " + btnClass + " yesBtn alert-btn' data-btn='yes'>" + btn + "</button>";
        } else if (i == 1) {
            btnHtml += "<button type='button' class='btn btn-default noBtn alert-btn' data-btn='cancel'>" + btn + "</button>";
        } else {
            btnHtml += "<button type='button' class='btn btn-default alert-btn' data-btn='btn" + i + "'>" + btn + "</button>";
        }
    });
    var html =
        //"<div class='modal fade user-select hide-backdrop' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' style='overflow: hidden;'> " +
        "<div class='layer layer-anim fade hide-backdrop alert " + typeClass + "' role='alert'> " +
        (op.title && ("<h4>" + op.title + "</h4> ")) +
        "<div class='layer-body modal-dialog'> " +
        "</div> " +
        (btnHtml && ("<div class='layer-footer'> " +
        btnHtml +
        "</div> ")) +
        "</div> ";
    var $html = $(html).css("z-index", op.zIndex + index);
    $html.css("text-align", op.textAlign);
    $html.find(".layer-body").html(op.content);
    $('body').append($html);
    $html.on('show.bs.modal', function () {
        var $this = $(this);

        var width = $this.width(),
            height = $this.height();

        var offset = {};
        offset = {
            top: $(window).height() / 3 - height / 2,
            left: $(window).width() / 2 - width / 2,
        }

        $this.css({ top: offset.top, left: offset.left });
        if ($(".modal-backdrop.fade.in").length == 0 && type != 4) {
            $(this).removeClass("hide-backdrop");
        }
        $(this).find(".alert-btn").eq(0).focus();
    });

    $html.on('shown.bs.modal', function () {
        var $this = $(this);
        if (type == 4) {
            $(this).next(".modal-backdrop.fade.in").remove();
        }
        $("body").addClass("modal-open");
    });

    $html.on('hidden.bs.modal', function () {
        $(this).remove();
        $("body").removeClass("modal-open");
    });
    $html.on('hide.bs.modal', function () {
        $(this).addClass("layer-anim-close");
    });
    $html.on("click", ".alert-btn", function (event) {
        $.isFunction(op[$(this).data("btn")]) ? op[$(this).data("btn")](index, event) : MW.MsgUtil.close(index);
    });
    $html.data("close.fn", op.close);
    MW.MsgUtil.msgCache[index] = $html;
    $html.modal({
        backdrop: 'static',
        keyboard: false
    });
    op.time <= 0 || setTimeout(function () {
        MW.MsgUtil.close(index)
    }, op.time);
    return index;
};