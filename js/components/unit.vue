<template>
	<div :class="costClasses">
		<div class="column is-2 name">
			<img :src="unitImageUrl" @error="hideImage"/><br />
			<strong class="big-name">{{unit.name}}</strong>
			<hr />
			<span class="tag is-dark is-large">${{unit.cost}}</span><br />
			<span v-if="unit.nickname.length > 0">"{{unit.nickname.join('", "')}}"</span>
		</div>
		<div class="column is-1 race-class">
			<div class="columns is-centered is-vcentered is-multiline">
				<div class="column is-12 race" v-if="unit.race.length > 2" :data-template="'race-'+unit.race">
					<img :src="raceImageUrl(0)"/>
					<h3>{{labelText(unit.race)}}</h3>
				</div>
				<div class="column is-12" v-else>
					<div v-for="(r,i) in unit.race" class="race" :data-template="'race-'+r">
						<img :src="raceImageUrl(i)"/>
						<h3>{{labelText(r)}}</h3>
					</div>
				</div>
				<div class="column is-12 class" :data-template="'class-'+unit.class">
					<img :src="classImageUrl"/>
					<h3>{{labelText(unit.class)}}</h3>
				</div>
			</div>
		</div>
		<div class="column is-4">
			<table class="table is-bordered table is-striped">
				<thead>
					<tr>
						<th width="28%">&nbsp;</th>
						<th width="24%">&#9733;</th>
						<th width="24%">&#9733;&#9733;</th>
						<th width="24%">&#9733;&#9733;&#9733;</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Health</th>
						<td>{{unit.stats.health[0]}}</td>
						<td>{{unit.stats.health[1]}}</td>
						<td>{{unit.stats.health[2]}}</td>
					</tr>
					<tr>
						<th>Damage</th>
						<td><abbr :title="avgDamageString(0)">{{unit.stats.damage[0][0]}}-{{unit.stats.damage[0][1]}}</abbr></td>
						<td><abbr :title="avgDamageString(1)">{{unit.stats.damage[1][0]}}-{{unit.stats.damage[1][1]}}</abbr></td>
						<td><abbr :title="avgDamageString(2)">{{unit.stats.damage[2][0]}}-{{unit.stats.damage[2][1]}}</abbr></td>
					</tr>
					<tr>
						<th><abbr title="Attacks once per this number of seconds (without bonus attack speed)">Attack Rate</abbr></th>
						<td colspan="3">{{unit.stats.speed}}</td>
					</tr>
					<tr v-if="unit.stats.armor.length == 1">
						<th><abbr title="Physical Damage Reduction">Armor</abbr></th>
						<td colspan="3">{{unit.stats.armor[0]}}</td>
					</tr>
					<tr v-else>
						<th><abbr title="Physical Damage Reduction">Armor</abbr></th>
						<td>{{unit.stats.armor[0]}}</td>
						<td>{{unit.stats.armor[1]}}</td>
						<td>{{unit.stats.armor[2]}}</td>
					</tr>
					<tr v-if="unit.stats.resist.length == 1">
						<th><abbr title="Magic Damage Reduction">Resistance</abbr></th>
						<td colspan="3">{{unit.stats.resist[0]}}%</td>
					</tr>
					<tr v-else>
						<th><abbr title="Magic Damage Reduction">Resistance</abbr></th>
						<td>{{unit.stats.resist[0]}}%</td>
						<td>{{unit.stats.resist[1]}}%</td>
						<td>{{unit.stats.resist[2]}}%</td>
					</tr>
					<tr>
						<th><abbr title="Melee, Medium, High, or Very High">Range</abbr></th>
						<td colspan="3"><abbr :title="rangeDescription">{{unit.stats.range}}</abbr></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="column is-5">
			<div class="columns is-vcentered is-centered">
				<div class="ability column is-2">
					<img :src="abilityImageUrl" style="width:64px"/>
				</div>
				<div class="description column is-10" v-html="abilityDesc"></div>
			</div>
			<table class="table is-bordered table is-striped is-vcentered">
				<thead>
					<tr>
						<th width="10%">&nbsp;</th>
						<th width="10%"><abbr title="Cooldown">CD</abbr></th>
						<th width="80%">Spell Level Details</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>&#9733;</th>
						<td v-if="unit.ability.passive" rowspan="3" class="is-vcentered"><abbr title="Always On - No Mana Cost">Passive</abbr></td>
						<td v-else-if="unit.ability.cooldown.length == 1" rowspan="3" class="is-vcentered">{{unit.ability.cooldown[0]}}</td>
						<td v-else>{{unit.ability.cooldown[0]}}</td>
						<td>{{unit.ability.desc_levels[0]}}</td>
					</tr>
					<tr>
						<th>&#9733;&#9733;</th>
						<td v-if="!unit.ability.passive && unit.ability.cooldown.length > 1">{{unit.ability.cooldown[1]}}</td>
						<td>{{unit.ability.desc_levels[1]}}</td>
					</tr>
					<tr>
						<th>&#9733;&#9733;&#9733;</th>
						<td v-if="!unit.ability.passive && unit.ability.cooldown.length > 1">{{unit.ability.cooldown[2]}}</td>
						<td>{{unit.ability.desc_levels[2]}}</td>
					</tr>
				</tbody>
			</table>
		</div>
		{{ applyTippyTips() }}
	</div>
</template>

<script>
import tippy from 'tippy.js';

export default {
	name: 'autochess-unit',
	props: ['unit'],
	methods: {
		applyTippyTips() {
			window.setTimeout(() => {
				tippy('.class, .race',{
					arrow: false,
					interactive: true,
					placement: "right",
					content(reference) {
						const id = reference.getAttribute('data-template')
						const container = document.createElement('div')
						container.className = "card synergy";
						const linkedTemplate = document.getElementById(id)
						if(linkedTemplate) {
							const node = document.importNode(linkedTemplate.childNodes[0], true)
							container.appendChild(node)
						} else {
							console.log('Missing data: '+id);
							console.log(reference);
						}
						return container
					},
				});
			},100);
		},
		hideImage(event) {
			event.target.src = this.noImageUrl;
		},
		labelText(str) {
			return str.replace(/_/g,' ');
		},
		avgDamage(lvl) {
			let min = this.unit.stats.damage[lvl][0];
			let max = this.unit.stats.damage[lvl][1];
			let avg = Math.round((min + max)/2);
			
			return avg;
			
		},
		dps(lvl) {
			let avg = this.avgDamage(lvl);
			let dps = Math.round(avg / this.unit.stats.speed);
			
			return dps;
		},
		avgDamageString(lvl) {
			let avg = this.avgDamage(lvl);
			let dps = this.dps(lvl);
			
			return "Average: "+avg+' / Average Base DPS: '+dps;
		
		},
		raceImageUrl(idx) {
			if(this.unit.race.length > 2)
				return 'images/races/'+ this.unit.race.toLowerCase().replace(/ /g,'_')+'.png';
			else
				return 'images/races/'+ this.unit.race[idx].toLowerCase().replace(/ /g,'_')+'.png';
		}
	},
	computed: {
		abilityDesc() {
			return "<strong class=\"big-name\">"+this.unit.ability.name+"</strong><hr />"+this.unit.ability.description;
		},
		costClasses() {
			return "autochess-unit columns is-vcentered is-centered cost-"+this.unit.cost;
		},
		rangeDescription() {
			switch(this.unit.stats.range) {
				case "Melee":
					return "Attacks units in cardinal directions to it.";
				case "Medium":
					return "Attacks up to 3-4 squares away (Dota range: 300-500)";
				case "High":
					return "Attacks up to 5-6 squares away (Dota range: 600-700)";
				case "Very High":
					return "Attacks almost any square (Dota range: 800+)";
			}
			return "";
		},
		unitImageUrl() {
			return 'images/units/' + this.unit.name.toLowerCase().replace(/ /g,'_')+'.png';
		},
		abilityImageUrl() {
			return 'images/abilities/'+ this.unit.ability.name.toLowerCase().replace(/ /g,'_').replace(/'/g,'')+'.png';
		},
		classImageUrl() {
			return 'images/classes/'+ this.unit.class.toLowerCase().replace(/ /g,'_')+'.png';
		},
		noImageUrl() {
			return 'images/none.png';
		}
	}
}
</script>