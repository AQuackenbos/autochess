import Vue from 'vue'

import Unit from './components/unit.vue'
import Synergy from './components/synergy.vue'

import unitList from './units.json';
import synergyList from './synergies.json';

Vue.component('autochess-unit', Unit);
Vue.component('autochess-synergy', Synergy);

synergyList.sort(function compare(a,b) {
	if (a['type'] < b['type'])
		return -1;
	if (a['type'] > b['type'])
		return 1;
	return 0;
})

window.vueApp = new Vue({
	el: "#app",
	data: {
		allUnits: unitList,
		units: unitList,
		synergies: synergyList,
		races: synergyList.filter((s) => s.type == "race"),
		classes: synergyList.filter((s) => s.type == "class")
	},
	methods: {
		sortBy(prop, rev) {
			if(!rev) {
				rev = 1;
			} else {
				rev = -1;
			}
			this.units.sort(function compare(a,b) {
				if (a[prop] < b[prop])
					return -1 * rev;
				if (a[prop] > b[prop])
					return 1 * rev;
				return 0;
			})
		},
		updateFilters() {
			
		}
	}
});

window.vueApp.sortBy('name');