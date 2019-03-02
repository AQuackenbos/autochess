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
	},
	methods: {
		sortBy(prop) {
			this.units.sort(function compare(a,b) {
				if (a[prop] < b[prop])
					return -1;
				if (a[prop] > b[prop])
					return 1;
				return 0;
			})
		}
	}
});

app.sortBy('name');