"use strict";!function a(s,i,r){function l(n,e){if(!i[n]){if(!s[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(u)return u(n,!0);throw new Error("Cannot find module '"+n+"'")}var o=i[n]={exports:{}};s[n][0].call(o.exports,function(e){var t=s[n][1][e];return l(t||e)},o,o.exports,a,s,i,r)}return i[n].exports}for(var u="function"==typeof require&&require,e=0;e<r.length;e++)l(r[e]);return l}({1:[function(e,t,n){e("./utilities");var o={loadPage:function(){var e=document.getElementsByTagName("main"),t=document.getElementsByTagName("nav"),n=document.getElementsByClassName("load"),o=document.getElementsByClassName("nav-top__icon"),a=new TimelineMax({repeat:2,onComplete:function(){s.to($(document.getElementsByClassName("loader-container")),.5,{autoAlpha:0}).from(e,.5,{autoAlpha:0}).from(t,1,{x:-200,ease:Quad.easeInOut}).from(o,.2,{y:-20,autoAlpha:0,ease:Quad.easeInOut})}}),s=new TimelineMax;a.staggerFrom(n,.3,{scaleY:0,transformOrigin:"0% 0%",ease:Back.easeOut},.1).staggerFrom(n,.5,{scaleY:1,transformOrigin:"0% 100%",ease:Back.easeIn},.1)},changeSlideAnimation:function(){function t(e){var t=$("section:nth-child("+e+")"),n=$("section:nth-child("+(e-1)+")"),o=$("section:nth-child("+(e+1)+")");n.length&&(TweenMax.to(n.find(".bg-container"),.25,{y:100,rotation:.1}),TweenMax.to(n.find("h1"),.8,{y:-100,autoAlpha:0}),TweenMax.to(n.find(".hotspot"),.25,{y:-150,autoAlpha:0})),o.length&&(TweenMax.to(o.find(".bg-container"),.25,{y:-100,rotation:.1}),TweenMax.to(o.find("h1"),.8,{y:100,autoAlpha:0}),TweenMax.to(o.find(".hotspot"),.25,{y:150,autoAlpha:0})),TweenMax.to(".slides-container",1,{y:-$(".slides-container").height()*(e-1),rotation:0,ease:Power2.easeOut}),TweenMax.to(t.find(".bg-container"),1,{y:0,rotation:0}),TweenMax.to(t.find("h1"),.8,{y:0,autoAlpha:1,ease:Expo.ease}),TweenMax.staggerTo(t.find(".hotspot"),.75,{y:0,autoAlpha:1,delay:.5},.125,function(){a=!1})}$("section").each(function(){$(this).prepend('<div class="bg-container"><div class="bg-image" style=\'background-image: '+$(this).css("background-image")+";'></div></div>")}),TweenMax.set("section .bg-container",{y:-200,rotate:.1}),TweenMax.set("h1",{y:100,autoAlpha:1}),TweenMax.set(".hotspot",{y:150,autoAlpha:0}),t(1);var o=1,a=!1;$(".slides-container").on("mousewheel",function(e){a||(e.deltaY<-1&&o<$("section").length?(t(o+1),o++,a=!0,s()):1<e.deltaY&&1<o&&(t(o-1),o--,a=!0,s()))}),document.addEventListener("keydown",function(e){("39"==e.keyCode||"40"==e.keyCode)&&o<$("section").length?(t(o+1),o++,s()):("37"==e.keyCode||"38"==e.keyCode)&&1<o&&(t(o-1),o--,s())});var e=document.getElementsByClassName("nav-bottom__arrow-up")[0],n=document.getElementsByClassName("nav-bottom__arrow-down")[0];function s(){var e=document.getElementById("current-slide"),t=document.getElementsByClassName("nav-top__icon")[0],n=document.getElementById("line");e.innerHTML="0"+o,1==o?t.style.backgroundImage="url(img/icon-slide-1.png)":2==o?t.style.backgroundImage="url(img/icon-slide-2.png)":3==o&&(t.style.backgroundImage="url(img/icon-slide-3.png)"),(new TimelineMax).fromTo(e,.5,{x:-15,autoAlpha:0},{x:0,autoAlpha:1},0).from(n,.5,{width:0},0).from(n,.2,{left:35},.2)}e.addEventListener("click",function(e){1<o&&(t(o-1),o--,s())}),n.addEventListener("click",function(e){o<$("section").length&&(t(o+1),o++,s())})},showAndHidePopup:function(){document.getElementsByClassName("hotspot");function t(){var e=new TimelineMax;$(this).hasClass("hotspot--up")&&e.to($(this),.5,{y:20,ease:Power2.easeIn}),$(this).hasClass("hotspot--down")&&e.to($(this),.5,{y:-20,ease:Power2.easeIn}),$(this).hasClass("hotspot--left")&&e.to($(this),.5,{x:20,ease:Power2.easeIn}),$(this).hasClass("hotspot--right")&&e.to($(this),.5,{x:-20,ease:Power2.easeIn}),e.to($(this).find(".copy"),.3,{y:20,autoAlpha:0}),e.to($(this).find(".icon .group"),.1,{fill:"#000",stroke:"transparent",ease:Power3.easeIn}),e.to($(this).find(".popup"),.2,{autoAlpha:0,ease:Power4.easeIn})}$(".hotspot").click(function(){var e=new TimelineMax;$(this).hasClass("hotspot--up")&&e.to($(this),.5,{y:-40,ease:Power2.easeIn});$(this).hasClass("hotspot--down")&&e.to($(this),.5,{y:40,ease:Power2.easeIn});$(this).hasClass("hotspot--left")&&e.to($(this),.5,{x:-40,ease:Power2.easeIn});$(this).hasClass("hotspot--right")&&e.to($(this),.5,{x:40,ease:Power2.easeIn});e.to($(this).find(".icon .group"),.1,{fill:"#fff",ease:Power3.easeIn}),e.to($(this).find(".popup"),.2,{autoAlpha:1,ease:Power4.easeIn}),e.fromTo($(this).find(".copy"),.3,{y:-20,autoAlpha:0},{y:0,autoAlpha:1}),$("body").click(t)}),TweenMax.set(".popup",{autoAlpha:0})},init:function(){o.loadPage(),o.changeSlideAnimation(),o.showAndHidePopup()}};t.exports={init:o.init}},{"./utilities":3}],2:[function(e,t,n){e("./animation").init()},{"./animation":1}],3:[function(e,t,n){var o={getClasses:function(e){for(var t=document.getElementsByClassName(e),n=t.length,o=new Array,a=0;a<n;a++)o.push(t[a].classList.item(0)+"-"+a),t[a].classList.add(t[a].classList.item(0)+"-"+a);return o}};t.exports={getClasses:o.getClasses}},{}]},{},[2]);