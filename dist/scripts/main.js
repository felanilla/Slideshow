"use strict";!function a(i,s,r){function l(t,e){if(!s[t]){if(!i[t]){var n="function"==typeof require&&require;if(!e&&n)return n(t,!0);if(u)return u(t,!0);throw new Error("Cannot find module '"+t+"'")}var o=s[t]={exports:{}};i[t][0].call(o.exports,function(e){var n=i[t][1][e];return l(n||e)},o,o.exports,a,i,s,r)}return s[t].exports}for(var u="function"==typeof require&&require,e=0;e<r.length;e++)l(r[e]);return l}({1:[function(e,n,t){e("./utilities");var o={loadPage:function(){var e=$("main"),n=$("nav"),t=$(".load"),o=$(".nav-top__icon"),a=new TimelineMax({repeat:2,onComplete:function(){i.to($(".loader-container"),.5,{autoAlpha:0}).from(e,.5,{autoAlpha:0}).from(n,.4,{y:-50,autoAlpha:0,ease:Expo.ease}).from(o,.1,{x:-10,autoAlpha:0,ease:Expo.ease})}}),i=new TimelineMax;a.staggerFrom(t,.3,{scaleY:0,transformOrigin:"0% 0%",ease:Back.easeOut},.1).staggerFrom(t,.5,{scaleY:1,transformOrigin:"0% 100%",ease:Back.easeIn},.1)},changeSlideAnimation:function(){function n(e){var n=$("section:nth-child("+e+")"),t=$("section:nth-child("+(e-1)+")"),o=$("section:nth-child("+(e+1)+")");t.length&&(TweenMax.to(t.find(".bg-container"),.25,{y:100,rotation:.1}),TweenMax.to(t.find("h1"),.8,{y:-100,autoAlpha:0}),TweenMax.to(t.find(".hotspot"),.25,{y:-150,autoAlpha:0})),o.length&&(TweenMax.to(o.find(".bg-container"),.25,{y:-100,rotation:.1}),TweenMax.to(o.find("h1"),.8,{y:100,autoAlpha:0}),TweenMax.to(o.find(".hotspot"),.25,{y:150,autoAlpha:0})),TweenMax.to(".slides-container",1,{y:-$(".slides-container").height()*(e-1),rotation:0,ease:Power2.easeOut}),TweenMax.to(n.find(".bg-container"),1,{y:0,rotation:0}),TweenMax.to(n.find("h1"),.8,{y:0,autoAlpha:1,ease:Expo.ease}),TweenMax.staggerTo(n.find(".hotspot"),.75,{y:0,autoAlpha:1,delay:.5},.125,function(){a=!1})}$("section").each(function(){$(this).prepend('<div class="bg-container"><div class="bg" style=\'background-image: '+$(this).css("background-image")+";'></div></div>")}),TweenMax.set("section .bg-container",{y:-200,rotate:.1}),TweenMax.set("h1",{y:100,autoAlpha:1}),TweenMax.set(".hotspot",{y:150,autoAlpha:0}),n(1);var o=1,a=!1;function t(){var e=document.getElementById("current-slide"),n=document.getElementsByClassName("nav-top__icon")[0],t=document.getElementById("line");e.innerHTML="0"+o,1==o?n.style.backgroundImage="url(../../img/icon-slide-1.png)":2==o?n.style.backgroundImage="url(../../img/icon-slide-2.png)":3==o&&(n.style.backgroundImage="url(../../img/icon-slide-3.png)"),(new TimelineMax).fromTo(e,.5,{x:-15,autoAlpha:0},{x:0,autoAlpha:1},0).from(t,.5,{width:0},0).from(t,.2,{left:35},.2)}$(".slides-container").on("mousewheel",function(e){a||(e.deltaY<-1&&o<$("section").length?(n(o+1),o++,a=!0,t()):1<e.deltaY&&1<o&&(n(o-1),o--,a=!0,t()))}),$(document).on("keydown",function(e){("39"==e.keyCode||"40"==e.keyCode)&&o<$("section").length?(n(o+1),o++,t()):("37"==e.keyCode||"38"==e.keyCode)&&1<o&&(n(o-1),o--,t())}),$(".nav-bottom__arrow-up").on("click",function(e){1<o&&(n(o-1),o--,t())}),$(".nav-bottom__arrow-down").on("click",function(e){o<$("section").length&&(n(o+1),o++,t())})},showAndHidePopup:function(){$(".hotspot").hover(function(){(new TimelineMax).to($(this).find(".icon .group"),.3,{fill:"#fff",ease:Power3.easeIn}).to($(this).find(".popup"),.3,{autoAlpha:1,ease:Power4.easeIn}).fromTo($(this).find(".copy"),.3,{y:-20,autoAlpha:0},{y:0,autoAlpha:1})},function(){(new TimelineMax).to($(this).find(".copy"),.3,{y:20,autoAlpha:0}).to($(this).find(".icon .group"),.3,{fill:"#000",stroke:"transparent",ease:Power3.easeIn}).to($(this).find(".popup"),.3,{autoAlpha:0,ease:Power4.easeIn})}),TweenMax.set(".popup",{autoAlpha:0})},init:function(){o.loadPage(),o.changeSlideAnimation(),o.showAndHidePopup()}};n.exports={init:o.init}},{"./utilities":3}],2:[function(e,n,t){e("./animation").init()},{"./animation":1}],3:[function(e,n,t){var o={getClasses:function(e){for(var n=document.getElementsByClassName(e),t=n.length,o=new Array,a=0;a<t;a++)o.push(n[a].classList.item(0)+"-"+a),n[a].classList.add(n[a].classList.item(0)+"-"+a);return o}};n.exports={getClasses:o.getClasses}},{}]},{},[2]);