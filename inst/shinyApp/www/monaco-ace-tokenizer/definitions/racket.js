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
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("monaco-ace-tokenizer")):"function"==typeof define&&define.amd?define(["tokenizer/monaco-tokenizer"],t):"object"==typeof exports?exports.racketDefinition=t(require("monaco-ace-tokenizer")):(e.MonacoAceTokenizer=e.MonacoAceTokenizer||{},e.MonacoAceTokenizer.racketDefinition=t(e.MonacoAceTokenizer))}(self,(function(e){return function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=12)}({0:function(t,r){t.exports=e},12:function(e,t,r){"use strict";r.r(t);var o=r(0),n=o.oop,c=o.TextHighlightRules,a=function(){this.$rules={start:[{token:["text","string.quoted.double.source.racket"],regex:/([^\\])(\"[^\"]*\")/},{token:["meta.variable.source.racket","keyword.source.racket","meta.variable.source.racket","entity.name.variable.source.racket","meta.variable.source.racket"],regex:/(\()(define)(\s+)([a-zA-Z0-9_\-?\+^]+)(\s*)/},{token:["meta.function.source.racket","keyword.source.racket","meta.function.source.racket","entity.name.function","meta.function.source.racket"],regex:/(\()(define)(\s+\()([a-zA-Z0-9_\-?\+^]+)(\s*)/},{token:["meta.struct.source.racket","keyword.source.racket","meta.struct.source.racket","entity.name.type","meta.struct.source.racket"],regex:/(\()(struct)(\s+)([a-zA-Z0-9_\-?\+^]+)(\s+)/},{token:["meta.keywords.source.racket","keyword.source.racket","meta.keywords.source.racket"],regex:/([\s\(])(if|lambda|cond|define|type-case|let|letrec|let!|\#lang|require|test|else|first|rest|define-type|define-type-alias|define-struct|not|local|error|lang)([\s\)])/},{token:["text","constant.language.source.racket","text"],regex:/([\s\(])(true|false|empty|null)([\s\)])/},{token:["text","constant.language.source.racket","text"],regex:/([\s\(])(#t|#f)([\s\)])/},{token:"constant.language.source.racket",regex:/#\\[a-zA-Z0-9_\-?\+\.\!\"]+/},{token:"constant.numeric.integer.source.racket",regex:/\b(?:0|[1-9][0-9_]*)\b/},{token:"comment.line.documentation.source.racket",regex:/;/,push:[{token:"comment.line.documentation.source.racket",regex:/$/,next:"pop"},{defaultToken:"comment.line.documentation.source.racket"}]},{token:"comment.block.source.racket",regex:/#\|/,push:[{token:"comment.block.source.racket",regex:/\|#/,next:"pop"},{defaultToken:"comment.block.source.racket"}]}]},this.normalizeRules()};a.metaData={fileTypes:["rkt"],name:"Racket",scopeName:"source.racket"},n.inherits(a,c),t.default=a}})}));