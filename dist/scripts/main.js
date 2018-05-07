"use strict";!function a(i,s,r){function c(n,e){if(!s[n]){if(!i[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(l)return l(n,!0);throw new Error("Cannot find module '"+n+"'")}var o=s[n]={exports:{}};i[n][0].call(o.exports,function(e){var t=i[n][1][e];return c(t||e)},o,o.exports,a,i,s,r)}return s[n].exports}for(var l="function"==typeof require&&require,e=0;e<r.length;e++)c(r[e]);return c}({1:[function(e,t,n){e("./utilities");var o={loadPage:function(){var e=document.getElementsByTagName("main"),t=document.getElementsByTagName("nav"),n=document.getElementsByClassName("load"),o=document.getElementsByClassName("nav-top__icon"),a=new TimelineMax({repeat:2,onComplete:function(){i.to($(document.getElementsByClassName("loader-container")),.5,{autoAlpha:0}).from(e,.4,{autoAlpha:0}).from(t,1,{x:-180,ease:Quad.easeInOut}).from(o,.1,{y:-20,autoAlpha:0,ease:Quad.easeInOut})}}),i=new TimelineMax;a.staggerFrom(n,.3,{scaleY:0,transformOrigin:"0% 0%",ease:Back.easeOut},.1).staggerFrom(n,.5,{scaleY:1,transformOrigin:"0% 100%",ease:Back.easeIn},.1)},changeSlideAnimation:function(){function t(e){var t=$("section:nth-child("+e+")"),n=$("section:nth-child("+(e-1)+")"),o=$("section:nth-child("+(e+1)+")");n.length&&(TweenMax.to(n.find(".bg-container"),.25,{y:100,rotation:.1}),TweenMax.to(n.find("h1"),.8,{y:-100,autoAlpha:0}),TweenMax.to(n.find(".hotspot"),.25,{y:-150,autoAlpha:0})),o.length&&(TweenMax.to(o.find(".bg-container"),.25,{y:-100,rotation:.1}),TweenMax.to(o.find("h1"),.8,{y:100,autoAlpha:0}),TweenMax.to(o.find(".hotspot"),.25,{y:150,autoAlpha:0})),TweenMax.to(".slides-container",1,{y:-$(".slides-container").height()*(e-1),rotation:0,ease:Power2.easeOut}),TweenMax.to(t.find(".bg-container"),1,{y:0,rotation:0}),TweenMax.to(t.find("h1"),.8,{y:0,autoAlpha:1,ease:Expo.ease}),TweenMax.staggerTo(t.find(".hotspot"),.75,{y:0,autoAlpha:1,delay:.5},.125,function(){a=!1})}$("section").each(function(){$(this).prepend('<div class="bg-container"><div class="bg-image" style=\'background-image: '+$(this).css("background-image")+";'></div></div>")}),TweenMax.set("section .bg-container",{y:-200,rotate:.1}),TweenMax.set("h1",{y:100,autoAlpha:1}),TweenMax.set(".hotspot",{y:150,autoAlpha:0}),t(1);var o=1,a=!1;$(".slides-container").on("mousewheel",function(e){a||(e.deltaY<-1&&o<$("section").length?(t(o+1),o++,a=!0,i()):1<e.deltaY&&1<o&&(t(o-1),o--,a=!0,i()))}),document.addEventListener("keydown",function(e){("39"==e.keyCode||"40"==e.keyCode)&&o<$("section").length?(t(o+1),o++,i()):("37"==e.keyCode||"38"==e.keyCode)&&1<o&&(t(o-1),o--,i())});var e=document.getElementsByClassName("nav-bottom__arrow-up")[0],n=document.getElementsByClassName("nav-bottom__arrow-down")[0];function i(){var e=document.getElementById("current-slide"),t=document.getElementsByClassName("nav-top__icon")[0],n=document.getElementById("line");e.innerHTML="0"+o,1==o?t.style.backgroundImage="url(img/icon-slide-1.png)":2==o?t.style.backgroundImage="url(img/icon-slide-2.png)":3==o&&(t.style.backgroundImage="url(img/icon-slide-3.png)"),(new TimelineMax).fromTo(e,.5,{x:-15,autoAlpha:0},{x:0,autoAlpha:1},0).from(n,.5,{width:0},0).from(n,.2,{left:35},.2)}e.addEventListener("click",function(e){1<o&&(t(o-1),o--,i())}),n.addEventListener("click",function(e){o<$("section").length&&(t(o+1),o++,i())})},showAndHidePopup:function(){for(var e=document.querySelectorAll(".hotspot"),t=0;t<e.length;t++)e[t].addEventListener("click",n),e[t].addEventListener("mouseenter",a),e[t].addEventListener("mouseleave",i);function n(e){e.stopPropagation(),this.classList.add("active"),(new TimelineMax).to($(this).find(".icon .group"),.2,{fill:"#fff",ease:Power3.easeIn,width:150},0).to($(this).find(".hotspot__circle"),.1,{autoAlpha:0},0).to($(this),.5,{width:420,height:140,borderRadius:20,backgroundColor:"hsla(0,0%,9%,.8)"}).to($(this).find(".hotspot__copy"),.2,{autoAlpha:1,ease:Power2.easeIn}),document.querySelector("body").addEventListener("click",o)}function o(e){e.stopPropagation(),(new TimelineMax).to($(this).find(".hotspot__copy"),.2,{autoAlpha:0,ease:Power2.easeIn},0).to($(this).find(".icon .group"),.5,{fill:"#000",stroke:"transparent",ease:Power3.easeIn},0).to($(this).find(".active"),.5,{width:120,height:120,borderRadius:100,backgroundColor:"rgba(255, 255, 255, 0.75)"}).to($(this).find(".hotspot__circle"),.3,{autoAlpha:1,scaleX:1,scaleY:1}),$(".hotspot").removeClass("active")}function a(e){this.classList.contains("active")||(new TimelineMax).to($(this),.5,{backgroundColor:"#fff"},0).to($(this).find(".hotspot__circle"),.5,{scaleX:1.1,scaleY:1.1},0)}function i(e){this.classList.contains("active")||(new TimelineMax).to($(this),.5,{backgroundColor:"rgba(255, 255, 255, 0.75)"}).to($(this).find(".hotspot__circle"),.5,{scaleX:1,scaleY:1},0)}},init:function(){o.loadPage(),o.changeSlideAnimation(),o.showAndHidePopup()}};t.exports={init:o.init}},{"./utilities":3}],2:[function(e,t,n){e("./animation").init()},{"./animation":1}],3:[function(e,t,n){var o={getClasses:function(e){for(var t=document.getElementsByClassName(e),n=t.length,o=new Array,a=0;a<n;a++)o.push(t[a].classList.item(0)+"-"+a),t[a].classList.add(t[a].classList.item(0)+"-"+a);return o}};t.exports={getClasses:o.getClasses}},{}]},{},[2]);