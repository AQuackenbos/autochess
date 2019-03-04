import Vue from 'vue'

import Unit from './components/unit.vue'
import Synergy from './components/synergy.vue'

import unitList from './units.json';
import synergyList from './synergies.json';

Vue.component('autochess-unit', Unit);
Vue.component('autochess-synergy', Synergy);


var app = new Vue({
	el: "#app",
	data: {
		units: unitList,
		synergies: synergyList,
		races: synergyList.filter((s) => s.type == "race"),
		classes: synergyList.filter((s) => s.type == "class")
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