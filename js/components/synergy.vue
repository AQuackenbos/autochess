<template>
	<div class="synergy card" v-bind:id="tooltipId">
		<div class="card-content">
			<div class="media">
				<div class="media-left">
					<figure class="image is-64x64">
						<img v-if="{{synergy.type == 'race'}}" v-bind:src="raceImageUrl"/>
						<img v-else v-bind:src="classImageUrl"/>
					</figure>
				</div>
				<div class="media-content">
			</div>
			<div class="content" v-if="{{synergy.show_n}}">
				<table class="table is-bordered table is-striped is-vcentered">
					<thead>
						<tr>
							<th width="10%"><abbr title="Number of Different Units">N</abbr></th>
							<th width="90%">Synergy Bonus</th>
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
		</div>
	</div>
</template>

<script>
export default {
	name: 'autochess-synergy',
	props: ['synergy'],
	methods: {
		labelText(str) {
			return str.replace(/_/g,' ');
		}
	},
	computed: {
		raceImageUrl() {
			return 'images/races/'+ this.synergy.name.toLowerCase().replace(/ /g,'_')+'.png';
		},
		classImageUrl() {
			return 'images/classes/'+ this.synergy.name.toLowerCase().replace(/ /g,'_')+'.png';
		},
		tooltipId() {
			return this.synergy.type+"-"+this.synergy.name;
		}
	}
}
</script>