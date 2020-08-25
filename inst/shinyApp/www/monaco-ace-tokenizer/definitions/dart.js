/*!
 * monaco-ace-tokenizer
 * Version - 0.2.1
 * Author - Brijesh Bittu <brijesh@bitwiser.in> (http://bitwiser.in/)
 */
/*!
 * For files in src/ace/
 * 
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("monaco-ace-tokenizer")):"function"==typeof define&&define.amd?define(["tokenizer/monaco-tokenizer"],t):"object"==typeof exports?exports.dartDefinition=t(require("monaco-ace-tokenizer")):(e.MonacoAceTokenizer=e.MonacoAceTokenizer||{},e.MonacoAceTokenizer.dartDefinition=t(e.MonacoAceTokenizer))}(self,(function(e){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}([function(t,r){t.exports=e},,,,function(e,t,r){"use strict";r.r(t);var o=r(0),n=o.oop,a=o.TextHighlightRules,i=o.DocCommentHighlightRules,c=function(){var e=this.createKeywordMapper({"constant.language.dart":"true|false|null","variable.language.dart":"this|super","keyword.control.dart":"try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new|deferred|async|await","keyword.declaration.dart":"abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with|enum","storage.modifier.dart":"static|final|const","storage.type.primitive.dart":"void|bool|num|int|double|dynamic|var|String"},"identifier"),t=[{token:"constant.language.escape",regex:/\\./},{token:"text",regex:/\$(?:\w+|{[^"'}]+})?/},{defaultToken:"string"}];this.$rules={start:[{token:"comment",regex:/\/\/.*$/},i.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:["meta.preprocessor.script.dart"],regex:"^(#!.*)$"},{token:"keyword.other.import.dart",regex:"(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"},{token:["keyword.other.import.dart","text"],regex:"(?:\\b)(prefix)(\\s*:)"},{regex:"\\bas\\b",token:"keyword.cast.dart"},{regex:"\\?|:",token:"keyword.control.ternary.dart"},{regex:"(?:\\b)(is\\!?)(?:\\b)",token:["keyword.operator.dart"]},{regex:"(<<|>>>?|~|\\^|\\||&)",token:["keyword.operator.bitwise.dart"]},{regex:"((?:&|\\^|\\||<<|>>>?)=)",token:["keyword.operator.assignment.bitwise.dart"]},{regex:"(===?|!==?|<=?|>=?)",token:["keyword.operator.comparison.dart"]},{regex:"((?:[+*/%-]|\\~)=)",token:["keyword.operator.assignment.arithmetic.dart"]},{regex:"=",token:"keyword.operator.assignment.dart"},{token:"string",regex:"'''",next:"qdoc"},{token:"string",regex:'"""',next:"qqdoc"},{token:"string",regex:"'",next:"qstring"},{token:"string",regex:'"',next:"qqstring"},{regex:"(\\-\\-|\\+\\+)",token:["keyword.operator.increment-decrement.dart"]},{regex:"(\\-|\\+|\\*|\\/|\\~\\/|%)",token:["keyword.operator.arithmetic.dart"]},{regex:"(!|&&|\\|\\|)",token:["keyword.operator.logical.dart"]},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qdoc:[{token:"string",regex:"'''",next:"start"}].concat(t),qqdoc:[{token:"string",regex:'"""',next:"start"}].concat(t),qstring:[{token:"string",regex:"'|$",next:"start"}].concat(t),qqstring:[{token:"string",regex:'"|$',next:"start"}].concat(t)},this.embedRules(i,"doc-",[i.getEndRule("start")])};n.inherits(c,a),t.default=c}])}));