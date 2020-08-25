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
!function(e,E){"object"==typeof exports&&"object"==typeof module?module.exports=E(require("monaco-ace-tokenizer")):"function"==typeof define&&define.amd?define(["tokenizer/monaco-tokenizer"],E):"object"==typeof exports?exports.cobolDefinition=E(require("monaco-ace-tokenizer")):(e.MonacoAceTokenizer=e.MonacoAceTokenizer||{},e.MonacoAceTokenizer.cobolDefinition=E(e.MonacoAceTokenizer))}(self,(function(e){return function(e){var E={};function n(t){if(E[t])return E[t].exports;var o=E[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=E,n.d=function(e,E,t){n.o(e,E)||Object.defineProperty(e,E,{enumerable:!0,get:t})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,E){if(1&E&&(e=n(e)),8&E)return e;if(4&E&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(n.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&E&&"string"!=typeof e)for(var o in e)n.d(t,o,function(E){return e[E]}.bind(null,o));return t},n.n=function(e){var E=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(E,"a",E),E},n.o=function(e,E){return Object.prototype.hasOwnProperty.call(e,E)},n.p="",n(n.s=2)}([function(E,n){E.exports=e},,function(e,E,n){"use strict";n.r(E);var t=n(0),o=t.oop,r=t.TextHighlightRules,T=function(){var e=this.createKeywordMapper({"support.function":"count|min|max|avg|sum|rank|now|coalesce|main",keyword:"ACCEPT|MERGE|SUM|ADD||MESSAGE|TABLE|ADVANCING|MODE|TAPE|AFTER|MULTIPLY|TEST|ALL|NEGATIVE|TEXT|ALPHABET|NEXT|THAN|ALSO|NO|THEN|ALTERNATE|NOT|THROUGH|AND|NUMBER|THRU|ANY|OCCURS|TIME|ARE|OF|TO|AREA|OFF|TOP||ASCENDING|OMITTED|TRUE|ASSIGN|ON|TYPE|AT|OPEN|UNIT|AUTHOR|OR|UNTIL|BEFORE|OTHER|UP|BLANK|OUTPUT|USE|BLOCK|PAGE|USING|BOTTOM|PERFORM|VALUE|BY|PIC|VALUES|CALL|PICTURE|WHEN|CANCEL|PLUS|WITH|CD|POINTER|WRITE|CHARACTER|POSITION||ZERO|CLOSE|POSITIVE|ZEROS|COLUMN|PROCEDURE|ZEROES|COMMA|PROGRAM|COMMON|PROGRAM-ID|COMMUNICATION|QUOTE|COMP|RANDOM|COMPUTE|READ|CONTAINS|RECEIVE|CONFIGURATION|RECORD|CONTINUE|REDEFINES|CONTROL|REFERENCE|COPY|REMAINDER|COUNT|REPLACE|DATA|REPORT|DATE|RESERVE|DAY|RESET|DELETE|RETURN|DESTINATION|REWIND|DISABLE|REWRITE|DISPLAY|RIGHT|DIVIDE|RUN|DOWN|SAME|ELSE|SEARCH|ENABLE|SECTION|END|SELECT|ENVIRONMENT|SENTENCE|EQUAL|SET|ERROR|SIGN|EXIT|SEQUENTIAL|EXTERNAL|SIZE|FLASE|SORT|FILE|SOURCE|LENGTH|SPACE|LESS|STANDARD|LIMIT|START|LINE|STOP|LOCK|STRING|LOW-VALUE|SUBTRACT","constant.language":"true|false|null"},"identifier",!0);this.$rules={start:[{token:"comment",regex:"\\*.*$"},{token:"string",regex:'".*?"'},{token:"string",regex:"'.*?'"},{token:"constant.numeric",regex:"[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"},{token:e,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\(]"},{token:"paren.rparen",regex:"[\\)]"},{token:"text",regex:"\\s+"}]}};o.inherits(T,r),E.default=T}])}));