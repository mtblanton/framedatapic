var frameDataPic = (function (exports) {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var utils = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var WOFF = 'application/font-woff';
	var JPEG = 'image/jpeg';
	var mimes = {
	    woff: WOFF,
	    woff2: WOFF,
	    ttf: 'application/font-truetype',
	    eot: 'application/vnd.ms-fontobject',
	    png: 'image/png',
	    jpg: JPEG,
	    jpeg: JPEG,
	    gif: 'image/gif',
	    tiff: 'image/tiff',
	    svg: 'image/svg+xml',
	};
	exports.uuid = (function uuid() {
	    // generate uuid for className of pseudo elements.
	    // We should not use GUIDs, otherwise pseudo elements sometimes cannot be captured.
	    var counter = 0;
	    // ref: http://stackoverflow.com/a/6248722/2519373
	    var randomFourChars = function () {
	        return ("0000" + (Math.random() * (Math.pow(36, 4)) << 0).toString(36)).slice(-4);
	    };
	    return function () {
	        counter += 1;
	        return "u" + randomFourChars() + counter;
	    };
	}());
	function parseExtension(url) {
	    var match = /\.([^./]*?)$/g.exec(url);
	    if (match)
	        return match[1];
	    return '';
	}
	exports.parseExtension = parseExtension;
	function getMimeType(url) {
	    var ext = parseExtension(url).toLowerCase();
	    return mimes[ext] || '';
	}
	exports.getMimeType = getMimeType;
	function delay(ms) {
	    return function (args) { return new Promise((function (resolve) {
	        setTimeout(function () {
	            resolve(args);
	        }, ms);
	    })); };
	}
	exports.delay = delay;
	function createImage(url) {
	    return new Promise((function (resolve, reject) {
	        var image = new Image();
	        image.onload = function () {
	            resolve(image);
	        };
	        image.onerror = reject;
	        image.crossOrigin = 'anonymous';
	        image.src = url;
	    }));
	}
	exports.createImage = createImage;
	function isDataUrl(url) {
	    return url.search(/^(data:)/) !== -1;
	}
	exports.isDataUrl = isDataUrl;
	function toDataURL(content, mimeType) {
	    return "data:" + mimeType + ";base64," + content;
	}
	exports.toDataURL = toDataURL;
	function getDataURLContent(dataURL) {
	    return dataURL.split(/,/)[1];
	}
	exports.getDataURLContent = getDataURLContent;
	function toBlob(canvas) {
	    return new Promise((function (resolve) {
	        var binaryString = window.atob(canvas.toDataURL().split(',')[1]);
	        var len = binaryString.length;
	        var binaryArray = new Uint8Array(len);
	        for (var i = 0; i < len; i += 1) {
	            binaryArray[i] = binaryString.charCodeAt(i);
	        }
	        resolve(new Blob([binaryArray], {
	            type: 'image/png',
	        }));
	    }));
	}
	function canvasToBlob(canvas) {
	    if (canvas.toBlob) {
	        return new Promise((function (resolve) {
	            canvas.toBlob(resolve);
	        }));
	    }
	    return toBlob(canvas);
	}
	exports.canvasToBlob = canvasToBlob;
	function toArray(arrayLike) {
	    var arr = [];
	    for (var i = 0, l = arrayLike.length; i < l; i += 1) {
	        arr.push(arrayLike[i]);
	    }
	    return arr;
	}
	exports.toArray = toArray;
	function px(node, styleProperty) {
	    var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
	    return parseFloat(value.replace('px', ''));
	}
	function getNodeWidth(node) {
	    var leftBorder = px(node, 'border-left-width');
	    var rightBorder = px(node, 'border-right-width');
	    return node.scrollWidth + leftBorder + rightBorder;
	}
	exports.getNodeWidth = getNodeWidth;
	function getNodeHeight(node) {
	    var topBorder = px(node, 'border-top-width');
	    var bottomBorder = px(node, 'border-bottom-width');
	    return node.scrollHeight + topBorder + bottomBorder;
	}
	exports.getNodeHeight = getNodeHeight;
	function getPixelRatio() {
	    return (window.devicePixelRatio || 1);
	}
	exports.getPixelRatio = getPixelRatio;
	function svgToDataURL(svg) {
	    return Promise.resolve()
	        .then(function () { return new XMLSerializer().serializeToString(svg); })
	        .then(encodeURIComponent)
	        .then(function (html) { return "data:image/svg+xml;charset=utf-8," + html; });
	}
	exports.svgToDataURL = svgToDataURL;
	function getBlobFromImageURL(url) {
	    return createImage(url).then(function (image) {
	        var width = image.width, height = image.height;
	        var canvas = document.createElement('canvas');
	        var context = canvas.getContext('2d');
	        var ratio = getPixelRatio();
	        canvas.width = width * ratio;
	        canvas.height = height * ratio;
	        canvas.style.width = "" + width;
	        canvas.style.height = "" + height;
	        context.scale(ratio, ratio);
	        context.drawImage(image, 0, 0);
	        var dataURL = canvas.toDataURL(getMimeType(url));
	        return getDataURLContent(dataURL);
	    });
	}
	exports.getBlobFromImageURL = getBlobFromImageURL;
	});

	unwrapExports(utils);
	var utils_1 = utils.uuid;
	var utils_2 = utils.parseExtension;
	var utils_3 = utils.getMimeType;
	var utils_4 = utils.delay;
	var utils_5 = utils.createImage;
	var utils_6 = utils.isDataUrl;
	var utils_7 = utils.toDataURL;
	var utils_8 = utils.getDataURLContent;
	var utils_9 = utils.canvasToBlob;
	var utils_10 = utils.toArray;
	var utils_11 = utils.getNodeWidth;
	var utils_12 = utils.getNodeHeight;
	var utils_13 = utils.getPixelRatio;
	var utils_14 = utils.svgToDataURL;
	var utils_15 = utils.getBlobFromImageURL;

	var clonePseudoElements_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function formatCssText(style) {
	    var content = style.getPropertyValue('content');
	    return style.cssText + " content: " + content + ";";
	}
	function formatCssProperties(style) {
	    return utils.toArray(style).map(function (name) {
	        var value = style.getPropertyValue(name);
	        var priority = style.getPropertyPriority(name);
	        return name + ": " + value + (priority ? ' !important' : '') + ";";
	    }).join(' ');
	}
	function getPseudoElementStyle(className, pseudo, style) {
	    var selector = "." + className + ":" + pseudo;
	    var cssText = style.cssText ? formatCssText(style) : formatCssProperties(style);
	    return document.createTextNode(selector + "{" + cssText + "}");
	}
	function clonePseudoElement(nativeNode, clonedNode, pseudo) {
	    var style = window.getComputedStyle(nativeNode, pseudo);
	    var content = style.getPropertyValue('content');
	    if (content === '' || content === 'none') {
	        return;
	    }
	    var className = utils.uuid();
	    var styleElement = document.createElement('style');
	    styleElement.appendChild(getPseudoElementStyle(className, pseudo, style));
	    clonedNode.className = clonedNode.className + " " + className;
	    clonedNode.appendChild(styleElement);
	}
	function clonePseudoElements(nativeNode, clonedNode) {
	    [
	        ':before',
	        ':after',
	    ].forEach(function (pseudo) { return clonePseudoElement(nativeNode, clonedNode, pseudo); });
	}
	exports.default = clonePseudoElements;
	});

	unwrapExports(clonePseudoElements_1);

	var cloneNode_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var clonePseudoElements_1$1 = __importDefault(clonePseudoElements_1);
	function cloneSingleNode(nativeNode) {
	    if (nativeNode instanceof HTMLCanvasElement) {
	        return utils.createImage(nativeNode.toDataURL());
	    }
	    if (nativeNode.tagName && nativeNode.tagName.toLowerCase() === 'svg') {
	        return Promise.resolve(nativeNode)
	            .then(function (svg) { return utils.svgToDataURL(svg); })
	            .then(utils.createImage);
	    }
	    return Promise.resolve(nativeNode.cloneNode(false));
	}
	function cloneChildren(nativeNode, clonedNode, filter) {
	    var children = utils.toArray(nativeNode.childNodes);
	    if (children.length === 0) {
	        return Promise.resolve(clonedNode);
	    }
	    // clone children in order
	    return children.reduce(function (done, child) { return done
	        .then(function () { return cloneNode(child, filter); })
	        .then(function (clonedChild) {
	        if (clonedChild) {
	            clonedNode.appendChild(clonedChild);
	        }
	    }); }, Promise.resolve())
	        .then(function () { return clonedNode; });
	}
	function cloneCssStyle(nativeNode, clonedNode) {
	    var source = window.getComputedStyle(nativeNode);
	    var target = clonedNode.style;
	    if (source.cssText) {
	        target.cssText = source.cssText;
	    }
	    else {
	        utils.toArray(source).forEach(function (name) {
	            target.setProperty(name, source.getPropertyValue(name), source.getPropertyPriority(name));
	        });
	    }
	}
	function cloneInputValue(nativeNode, clonedNode) {
	    if (nativeNode instanceof HTMLTextAreaElement) {
	        clonedNode.innerHTML = nativeNode.value;
	    }
	    if (nativeNode instanceof HTMLInputElement) {
	        clonedNode.setAttribute('value', nativeNode.value);
	    }
	}
	function decorate(nativeNode, clonedNode) {
	    if (!(clonedNode instanceof Element)) {
	        return clonedNode;
	    }
	    return Promise.resolve()
	        .then(function () { return cloneCssStyle(nativeNode, clonedNode); })
	        .then(function () { return clonePseudoElements_1$1.default(nativeNode, clonedNode); })
	        .then(function () { return cloneInputValue(nativeNode, clonedNode); })
	        .then(function () { return clonedNode; });
	}
	function cloneNode(domNode, filter, isRoot) {
	    if (!isRoot && filter && !filter(domNode)) {
	        return Promise.resolve(null);
	    }
	    return Promise.resolve(domNode)
	        .then(cloneSingleNode)
	        .then(function (clonedNode) { return cloneChildren(domNode, clonedNode, filter); })
	        .then(function (clonedNode) { return decorate(domNode, clonedNode); });
	}
	exports.default = cloneNode;
	});

	unwrapExports(cloneNode_1);

	var getBlobFromURL_1 = createCommonjsModule(function (module, exports) {
	/* tslint:disable:max-line-length */
	Object.defineProperty(exports, "__esModule", { value: true });

	// KNOWN ISSUE
	// -----------
	// Can not handle redirect-url, such as when access 'http://something.com/avatar.png'
	// will redirect to 'http://something.com/65fc2ffcc8aea7ba65a1d1feda173540'
	var TIMEOUT = 30000;
	function getBlobFromURL(url, options) {
	    // cache bypass so we dont have CORS issues with cached images
	    // ref: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
	    if (options.cacheBust) {
	        url += ((/\?/).test(url) ? '&' : '?') + (new Date()).getTime(); // tslint:disable-line
	    }
	    var failed = function (reason) {
	        var placeholder = '';
	        if (options.imagePlaceholder) {
	            var split = options.imagePlaceholder.split(/,/);
	            if (split && split[1]) {
	                placeholder = split[1];
	            }
	        }
	        var msg = "Failed to fetch resource: " + url;
	        if (reason) {
	            msg = typeof reason === 'string' ? reason : reason.message;
	        }
	        if (msg) {
	            console.error(msg);
	        }
	        return placeholder;
	    };
	    var deferred = window.fetch
	        // fetch
	        ? window.fetch(url)
	            .then(function (response) { return response.blob(); })
	            .then(function (blob) { return new Promise(function (resolve, reject) {
	            var reader = new FileReader();
	            reader.onloadend = function () { return resolve(reader.result); };
	            reader.onerror = reject;
	            reader.readAsDataURL(blob);
	        }); })
	            .then(utils.getDataURLContent)
	            .catch(function () { return new Promise(function (resolve, reject) {
	            reject();
	        }); })
	        // xhr
	        : new Promise((function (resolve, reject) {
	            var req = new XMLHttpRequest();
	            var timeout = function () {
	                reject(new Error("Timeout of " + TIMEOUT + "ms occured while fetching resource: " + url));
	            };
	            var done = function () {
	                if (req.readyState !== 4) {
	                    return;
	                }
	                if (req.status !== 200) {
	                    reject(new Error("Failed to fetch resource: " + url + ", status: " + req.status));
	                    return;
	                }
	                var encoder = new FileReader();
	                encoder.onloadend = function () {
	                    resolve(utils.getDataURLContent(encoder.result));
	                };
	                encoder.readAsDataURL(req.response);
	            };
	            req.onreadystatechange = done;
	            req.ontimeout = timeout;
	            req.responseType = 'blob';
	            req.timeout = TIMEOUT;
	            req.open('GET', url, true);
	            req.send();
	        }));
	    return deferred.catch(failed);
	}
	exports.default = getBlobFromURL;
	});

	unwrapExports(getBlobFromURL_1);

	var embedResources_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var getBlobFromURL_1$1 = __importDefault(getBlobFromURL_1);

	var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
	function resolveUrl(url, baseUrl) {
	    // url is absolute already
	    if (url.match(/^[a-z]+:\/\//i)) {
	        return url;
	    }
	    // url is absolute already, without protocol
	    if (url.match(/^\/\//)) {
	        return window.location.protocol + url;
	    }
	    // dataURI, mailto:, tel:, etc.
	    if (url.match(/^[a-z]+:/i)) {
	        return url;
	    }
	    var doc = document.implementation.createHTMLDocument();
	    var base = doc.createElement('base');
	    var a = doc.createElement('a');
	    doc.head.appendChild(base);
	    doc.body.appendChild(a);
	    if (baseUrl) {
	        base.href = baseUrl;
	    }
	    a.href = url;
	    return a.href;
	}
	function escape(url) {
	    return url.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
	}
	function urlToRegex(url) {
	    return new RegExp("(url\\(['\"]?)(" + escape(url) + ")(['\"]?\\))", 'g');
	}
	function parseURLs(str) {
	    var result = [];
	    str.replace(URL_REGEX, function (raw, quotation, url) {
	        result.push(url);
	        return raw;
	    });
	    return result.filter(function (url) { return !utils.isDataUrl(url); });
	}
	function embed(cssString, resourceURL, baseURL, options) {
	    var resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
	    return Promise.resolve(resolvedURL)
	        .then(function (url) { return getBlobFromURL_1$1.default(url, options); })
	        .then(function (data) { return utils.toDataURL(data, utils.getMimeType(resourceURL)); })
	        .then(function (dataURL) { return cssString.replace(urlToRegex(resourceURL), "$1" + dataURL + "$3"); })
	        .then(function (content) { return content; }, function () { return resolvedURL; });
	}
	function shouldEmbed(string) {
	    return string.search(URL_REGEX) !== -1;
	}
	exports.shouldEmbed = shouldEmbed;
	function embedResources(cssString, baseUrl, options) {
	    if (!shouldEmbed(cssString)) {
	        return Promise.resolve(cssString);
	    }
	    return Promise.resolve(cssString)
	        .then(parseURLs)
	        .then(function (urls) { return urls.reduce(function (done, url) { return done.then(function (ret) { return embed(ret, url, baseUrl, options); }); }, Promise.resolve(cssString)); });
	}
	exports.default = embedResources;
	});

	unwrapExports(embedResources_1);
	var embedResources_2 = embedResources_1.shouldEmbed;

	var embedWebFonts_1 = createCommonjsModule(function (module, exports) {
	var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
	    if (mod && mod.__esModule) return mod;
	    var result = {};
	    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
	    result["default"] = mod;
	    return result;
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var embedResources_1$1 = __importStar(embedResources_1);
	function parseCSS(source) {
	    if (source === undefined) {
	        return [];
	    }
	    var cssText = source;
	    var css = [];
	    var cssKeyframeRegex = '((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})';
	    var combinedCSSRegex = '((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]'
	        + '*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})'; // to match css & media queries together
	    var cssCommentsRegex = new RegExp('(\\/\\*[\\s\\S]*?\\*\\/)', 'gi');
	    // strip out comments
	    cssText = cssText.replace(cssCommentsRegex, '');
	    var keyframesRegex = new RegExp(cssKeyframeRegex, 'gi');
	    var arr;
	    while (true) {
	        arr = keyframesRegex.exec(cssText);
	        if (arr === null) {
	            break;
	        }
	        css.push(arr[0]);
	    }
	    cssText = cssText.replace(keyframesRegex, '');
	    // unified regex
	    var unified = new RegExp(combinedCSSRegex, 'gi');
	    while (true) {
	        arr = unified.exec(cssText);
	        if (arr === null) {
	            break;
	        }
	        css.push(arr[0]);
	    }
	    return css;
	}
	function fetchCSS(url, sheet) {
	    return fetch(url).then(function (res) {
	        return {
	            url: url,
	            cssText: res.text(),
	        };
	    }, function (e) {
	        console.log('ERROR FETCHING CSS: ', e.toString());
	    });
	}
	function embedFonts(data) {
	    return data.cssText.then(function (resolved) {
	        var cssText = resolved;
	        var fontLocations = cssText.match(/url\([^)]+\)/g) || [];
	        var fontLoadedPromises = fontLocations.map(function (location) {
	            var url = location.replace(/url\(([^]+)\)/g, '$1');
	            if (!url.startsWith('https://')) {
	                var source = data.url;
	                url = new URL(url, source).href;
	            }
	            return new Promise(function (resolve, reject) {
	                fetch(url)
	                    .then(function (res) { return res.blob(); })
	                    .then(function (blob) {
	                    var reader = new FileReader();
	                    reader.addEventListener('load', function (res) {
	                        // Side Effect
	                        cssText = cssText.replace(location, "url(" + reader.result + ")");
	                        resolve([location, reader.result]);
	                    });
	                    reader.readAsDataURL(blob);
	                })
	                    .catch(reject);
	            });
	        });
	        return Promise.all(fontLoadedPromises).then(function () { return cssText; });
	    });
	}
	function getCssRules(styleSheets) {
	    var ret = [];
	    var promises = [];
	    // First loop inlines imports
	    styleSheets.forEach(function (sheet) {
	        if ('cssRules' in sheet) {
	            try {
	                utils.toArray(sheet.cssRules).forEach(function (item) {
	                    if (item.type === CSSRule.IMPORT_RULE) {
	                        promises.push(fetchCSS(item.href, sheet)
	                            .then(embedFonts)
	                            .then(function (cssText) {
	                            var parsed = parseCSS(cssText);
	                            parsed.forEach(function (rule) {
	                                sheet.insertRule(rule, sheet.cssRules.length);
	                            });
	                        })
	                            .catch(function (e) {
	                            console.log('Error loading remote css', e.toString());
	                        }));
	                    }
	                });
	            }
	            catch (e) {
	                var inline_1 = styleSheets.find(function (a) { return a.href === null; }) || document.styleSheets[0];
	                if (sheet.href != null) {
	                    promises.push(fetchCSS(sheet.href)
	                        .then(embedFonts)
	                        .then(function (cssText) {
	                        var parsed = parseCSS(cssText);
	                        parsed.forEach(function (rule) {
	                            inline_1.insertRule(rule, sheet.cssRules.length);
	                        });
	                    })
	                        .catch(function (e) {
	                        console.log('Error loading remote stylesheet', e.toString());
	                    }));
	                }
	                console.log('Error inlining remote css file', e.toString());
	            }
	        }
	    });
	    return Promise
	        .all(promises)
	        .then(function () {
	        // Second loop parses rules
	        styleSheets.forEach(function (sheet) {
	            if ('cssRules' in sheet) {
	                try {
	                    utils.toArray(sheet.cssRules).forEach(function (item) {
	                        ret.push(item);
	                    });
	                }
	                catch (e) {
	                    console.log("Error while reading CSS rules from " + sheet.href, e.toString());
	                }
	            }
	        });
	        return ret;
	    });
	}
	function getWebFontRules(cssRules) {
	    return cssRules
	        .filter(function (rule) { return rule.type === CSSRule.FONT_FACE_RULE; })
	        .filter(function (rule) { return embedResources_1$1.shouldEmbed(rule.style.getPropertyValue('src')); });
	}
	function parseWebFontRules(clonedNode) {
	    return new Promise(function (resolve, reject) {
	        if (!clonedNode.ownerDocument) {
	            reject(new Error('Provided element is not within a Document'));
	        }
	        resolve(utils.toArray(clonedNode.ownerDocument.styleSheets));
	    })
	        .then(getCssRules)
	        .then(getWebFontRules);
	}
	exports.parseWebFontRules = parseWebFontRules;
	function embedWebFonts(clonedNode, options) {
	    return parseWebFontRules(clonedNode)
	        .then(function (rules) { return Promise.all(rules.map(function (rule) {
	        var baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
	        return embedResources_1$1.default(rule.cssText, baseUrl, options);
	    })); })
	        .then(function (cssStrings) { return cssStrings.join('\n'); })
	        .then(function (cssString) {
	        var styleNode = document.createElement('style');
	        var sytleContent = document.createTextNode(cssString);
	        styleNode.appendChild(sytleContent);
	        if (clonedNode.firstChild) {
	            clonedNode.insertBefore(styleNode, clonedNode.firstChild);
	        }
	        else {
	            clonedNode.appendChild(styleNode);
	        }
	        return clonedNode;
	    });
	}
	exports.default = embedWebFonts;
	});

	unwrapExports(embedWebFonts_1);
	var embedWebFonts_2 = embedWebFonts_1.parseWebFontRules;

	var embedImages_1 = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });

	var getBlobFromURL_1$1 = __importDefault(getBlobFromURL_1);
	var embedResources_1$1 = __importDefault(embedResources_1);
	function embedBackground(clonedNode, options) {
	    var background = clonedNode.style.getPropertyValue('background');
	    if (!background) {
	        return Promise.resolve(clonedNode);
	    }
	    return Promise.resolve(background)
	        .then(function (cssString) { return embedResources_1$1.default(cssString, null, options); })
	        .then(function (cssString) {
	        clonedNode.style.setProperty('background', cssString, clonedNode.style.getPropertyPriority('background'));
	        return clonedNode;
	    });
	}
	function embedImageNode(clonedNode, options) {
	    if (!(clonedNode instanceof HTMLImageElement) || utils.isDataUrl(clonedNode.src)) {
	        return Promise.resolve(clonedNode);
	    }
	    return Promise.resolve(clonedNode.src)
	        .then(function (url) { return getBlobFromURL_1$1.default(url, options); })
	        .then(function (data) { return utils.toDataURL(data, utils.getMimeType(clonedNode.src)); })
	        .then(function (dataURL) { return new Promise((function (resolve, reject) {
	        clonedNode.onload = resolve;
	        clonedNode.onerror = reject;
	        clonedNode.src = dataURL;
	    })); })
	        .then(function () { return clonedNode; }, function () { return clonedNode; });
	}
	function embedChildren(clonedNode, options) {
	    var children = utils.toArray(clonedNode.childNodes);
	    var deferreds = children.map(function (child) { return embedImages(child, options); });
	    return Promise.all(deferreds).then(function () { return clonedNode; });
	}
	function embedImages(clonedNode, options) {
	    if (!(clonedNode instanceof Element)) {
	        return Promise.resolve(clonedNode);
	    }
	    return Promise.resolve(clonedNode)
	        .then(function (node) { return embedBackground(node, options); })
	        .then(function (node) { return embedImageNode(node, options); })
	        .then(function (node) { return embedChildren(node, options); });
	}
	exports.default = embedImages;
	});

	unwrapExports(embedImages_1);

	var createSvgDataURL_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });

	function createSvgDataURL(clonedNode, width, height) {
	    var xmlns = 'http://www.w3.org/2000/svg';
	    var svg = document.createElementNS(xmlns, 'svg');
	    var foreignObject = document.createElementNS(xmlns, 'foreignObject');
	    svg.setAttributeNS('', 'width', "" + width);
	    svg.setAttributeNS('', 'height', "" + height);
	    foreignObject.setAttributeNS('', 'width', '100%');
	    foreignObject.setAttributeNS('', 'height', '100%');
	    foreignObject.setAttributeNS('', 'x', '0');
	    foreignObject.setAttributeNS('', 'y', '0');
	    foreignObject.setAttributeNS('', 'externalResourcesRequired', 'true');
	    svg.appendChild(foreignObject);
	    foreignObject.appendChild(clonedNode);
	    return utils.svgToDataURL(svg);
	}
	exports.default = createSvgDataURL;
	});

	unwrapExports(createSvgDataURL_1);

	var applyStyleWithOptions_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function applyStyleWithOptions(clonedNode, options) {
	    var style = clonedNode.style;
	    if (options.backgroundColor) {
	        style.backgroundColor = options.backgroundColor;
	    }
	    if (options.width) {
	        style.width = options.width + "px";
	    }
	    if (options.height) {
	        style.height = options.height + "px";
	    }
	    if (options.style) {
	        Object.assign(style, options.style);
	    }
	    return clonedNode;
	}
	exports.default = applyStyleWithOptions;
	});

	unwrapExports(applyStyleWithOptions_1);

	var lib = createCommonjsModule(function (module, exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	var cloneNode_1$1 = __importDefault(cloneNode_1);
	var embedWebFonts_1$1 = __importDefault(embedWebFonts_1);
	var embedImages_1$1 = __importDefault(embedImages_1);
	var createSvgDataURL_1$1 = __importDefault(createSvgDataURL_1);
	var applyStyleWithOptions_1$1 = __importDefault(applyStyleWithOptions_1);

	function getImageSize(domNode, options) {
	    if (options === void 0) { options = {}; }
	    var width = options.width || utils.getNodeWidth(domNode);
	    var height = options.height || utils.getNodeHeight(domNode);
	    return { width: width, height: height };
	}
	function toSvgDataURL(domNode, options) {
	    if (options === void 0) { options = {}; }
	    var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
	    return cloneNode_1$1.default(domNode, options.filter, true)
	        .then(function (clonedNode) { return embedWebFonts_1$1.default(clonedNode, options); })
	        .then(function (clonedNode) { return embedImages_1$1.default(clonedNode, options); })
	        .then(function (clonedNode) { return applyStyleWithOptions_1$1.default(clonedNode, options); })
	        .then(function (clonedNode) { return createSvgDataURL_1$1.default(clonedNode, width, height); });
	}
	exports.toSvgDataURL = toSvgDataURL;
	function toCanvas(domNode, options) {
	    if (options === void 0) { options = {}; }
	    return toSvgDataURL(domNode, options)
	        .then(utils.createImage)
	        .then(utils.delay(100))
	        .then(function (image) {
	        var canvas = document.createElement('canvas');
	        var context = canvas.getContext('2d');
	        var ratio = utils.getPixelRatio();
	        var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
	        canvas.width = width * ratio;
	        canvas.height = height * ratio;
	        canvas.style.width = "" + width;
	        canvas.style.height = "" + height;
	        context.scale(ratio, ratio);
	        if (options.backgroundColor) {
	            context.fillStyle = options.backgroundColor;
	            context.fillRect(0, 0, canvas.width, canvas.height);
	        }
	        context.drawImage(image, 0, 0);
	        return canvas;
	    });
	}
	exports.toCanvas = toCanvas;
	function toPixelData(domNode, options) {
	    if (options === void 0) { options = {}; }
	    var _a = getImageSize(domNode, options), width = _a.width, height = _a.height;
	    return toCanvas(domNode, options)
	        .then(function (canvas) { return (canvas.getContext('2d').getImageData(0, 0, width, height).data); });
	}
	exports.toPixelData = toPixelData;
	function toPng(domNode, options) {
	    if (options === void 0) { options = {}; }
	    return toCanvas(domNode, options).then(function (canvas) { return (canvas.toDataURL()); });
	}
	exports.toPng = toPng;
	function toJpeg(domNode, options) {
	    if (options === void 0) { options = {}; }
	    return toCanvas(domNode, options).then(function (canvas) { return (canvas.toDataURL('image/jpeg', options.quality || 1)); });
	}
	exports.toJpeg = toJpeg;
	function toBlob(domNode, options) {
	    if (options === void 0) { options = {}; }
	    return toCanvas(domNode, options).then(utils.canvasToBlob);
	}
	exports.toBlob = toBlob;
	exports.default = {
	    toSvgDataURL: toSvgDataURL,
	    toCanvas: toCanvas,
	    toPixelData: toPixelData,
	    toPng: toPng,
	    toJpeg: toJpeg,
	    toBlob: toBlob,
	};
	});

	unwrapExports(lib);
	var lib_1 = lib.toSvgDataURL;
	var lib_2 = lib.toCanvas;
	var lib_3 = lib.toPixelData;
	var lib_4 = lib.toPng;
	var lib_5 = lib.toJpeg;
	var lib_6 = lib.toBlob;

	/**
	 * @returns HTMLElement
	 */
	const $ = document.querySelector.bind(document);

	/**
	 * @param {number} count
	 */
	function generateVulnerabilityFrames(count) {
	  const image = $('#image');

	  for (let i = 0; i < count; i++) {
	    const frame = document.createElement('div');
	    frame.className = 'frame vulnerability-frame';

	    image.appendChild(frame);
	  }
	}

	/**
	 * @param {number} count
	 * @param {number} startingFrame
	 */
	function generateAttackFrames(count, startingFrame) {
	  const image = $('#image');

	  const startingColumn = startingFrame + 1;
	  let currentColumn = startingColumn;

	  for (let i = 0; i < count; i++) {
	    const attackFrame = document.createElement('div');
	    attackFrame.className = 'frame active-frame';
	    attackFrame.style.gridColumn = `${currentColumn} / ${currentColumn + 1}`;
	    currentColumn++;

	    image.appendChild(attackFrame);
	  }
	}

	/**
	 * @param {number} totalLength
	 */
	function generateBorders(totalLength) {
	  const image = $('#image');
	  const borderCount = Math.floor(totalLength / 5);
	  const borderClasses = [
	    'first-border',
	    'second-border',
	    'third-border',
	    'fourth-border',
	    'fifth-border'
	  ];

	  // Starting at 1 here because we multiply by 5 to get the starting column
	  for (let i = 1; i <= borderCount; i++) {
	    // First column we want to have a border at is 7. This is the sixth frame
	    // We start at the sixth frame because this has a left border
	    const startingColumn = i * 5 + 2;

	    borderClasses.forEach(borderClass => {
	      const border = document.createElement('div');
	      border.className = `border ${borderClass}`;
	      border.style.gridColumn = `${startingColumn} / ${startingColumn + 1}`;

	      image.appendChild(border);
	    });
	  }
	}

	function generateStart() {
	  const image = $('#image');

	  const start = document.createElement('div');
	  start.className = 'start';

	  image.appendChild(start);
	}

	function clearImage() {
	  const image = $('#image');
	  var cNode = image.cloneNode(false);
	  image.parentNode.replaceChild(cNode, image);
	}

	async function createImage() {
	  const imageSource = $('#image');
	  const prevColor = imageSource.style.backgroundColor;

	  imageSource.style.backgroundColor = 'transparent';

	  const imageData = await lib_1(imageSource);
	  imageSource.style.backgroundColor = prevColor;
	  const image = new Image();
	  image.src = imageData;
	  document.body.appendChild(image);
	}

	function makePicture() {
	  const inputs = new FormData($('#inputs'));

	  clearImage();
	  generateStart();

	  const startup = parseInt(inputs.get('startup').toString());
	  const active = parseInt(inputs.get('active').toString());
	  const recovery = parseInt(inputs.get('recovery').toString());

	  const totalFrames = startup + active + recovery;
	  document.documentElement.style.setProperty('--total-frames', (totalFrames + 1).toString());

	  generateVulnerabilityFrames(totalFrames);
	  generateBorders(totalFrames);
	  generateAttackFrames(active, startup + 1);
	}

	exports.createImage = createImage;
	exports.makePicture = makePicture;

	return exports;

}({}));
//# sourceMappingURL=bundle.js.map
