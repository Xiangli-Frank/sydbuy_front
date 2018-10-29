import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store/'
import {routerMode} from './config/env'
import './config/rem'
import FastClick from 'fastclick'
import axios from "axios"
import $ from 'jquery'
import ElementUI from 'element-ui'	
import '../node_modules/element-ui/lib/theme-chalk/index.css'	
import echarts from 'echarts'
import promise from 'es6-promise'


Vue.prototype.$echarts = echarts 
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

promise.polyfill()
Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehavior (to, from, savedPosition) {
	    if (savedPosition) {
		    return savedPosition
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPosition = document.body.scrollTop;
			}
		    return { x: 0, y: to.meta.savedPosition || 0 }
		}
	}
})
Vue.prototype.$axios = axios;
new Vue({
	router,
	store,
	axios,
}).$mount('#app')

