import Vue from 'vue'
//* Main
import Unit from './components/unit.vue'
//import AutoChessClass from './components/class.vue'

import unitList from './units.json';

Vue.component('autochess-unit', Unit);
//Vue.component('autochess-class', AutoChessClass);


var app = new Vue({
	el: "#app",
	data: {
		units: unitList
	}
});