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
		updateFilters(target) {
			if(target.classList.contains('active'))
				target.classList.remove('active');
			else
				target.classList.add('active');
			
			//Build lists
			let selectedRaces = [];
			let selectedClasses = [];
			
			let activeFilters = document.querySelectorAll('.filter.active');
			
			activeFilters.forEach((f) => {
				let t;
				if(t = f.getAttribute('data-class')) {
					selectedClasses.push(t);
				} else {
					t = f.getAttribute('data-race');
					selectedRaces.push(t);
				}
			});
			
			//Filter
			let filteredUnits = this.allUnits.slice(0);
			
			//Race
			filteredUnits = filteredUnits.filter((u) => {
				if(u.race.length > 2) {
					return (selectedRaces.includes(u.race));
				} else {
					let either = false;
					u.race.forEach((r) => {
						if(selectedRaces.includes(r))
							either = true;
					});
					return either;
				}
			});
			
			//Class
			filteredUnits = filteredUnits.filter((u) => {
				return (selectedClasses.includes(u.class));
			});
			
			this.units = filteredUnits;
		}
	}
});

window.vueApp.sortBy('name');