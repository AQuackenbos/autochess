<template>
	<div class="autochess-unit columns">
		<div class="column is-1">
			<img v-bind:src="unitImageUrl"/>
		</div>
		<div class="column is-2">
			{{unit.name}}
			<br />
			"{{unit.nickname}}"
		</div>
		<div class="column is-3">
			Attack Rate: {{unit.stats.speed}}<br />
			Health: &#9733; {{unit.stats.health[0]}} &#9733;&#9733; {{unit.stats.health[1]}} &#9733;&#9733;&#9733; {{unit.stats.health[2]}}
			
		</div>
		<div class="column is-1">
			<img v-bind:src="raceImageUrl"/><br />
			{{unit.race}}
		</div>
		<div class="column is-1">
			<img v-bind:src="classImageUrl"/><br />
			{{unit.class}}
		</div>
		<div class="column is-1">
			<img v-bind:src="abilityImageUrl"/><br />
			<strong>{{unit.ability.name}}</strong><br />
		</div>
		<div class="column is-3">
			<div class="description" v-html="unit.ability.description"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'autochess-unit',
	props: ['unit'],
	computed: {
		unitImageUrl() {
			return 'images/units/' + this.unit.name.toLowerCase().replace(' ','_')+'.png';
		},
		abilityImageUrl() {
			return 'images/abilities/'+ this.unit.ability.name.toLowerCase().replace(' ','_')+'.png';
		},
		raceImageUrl() {
			return 'images/races/'+ this.unit.race.toLowerCase().replace(' ','_')+'.png';
		},
		classImageUrl() {
			return 'images/classes/'+ this.unit.class.toLowerCase().replace(' ','_')+'.png';
		}
	}
}
</script>