<template>
	<div style="display:none">
		<div class="synergy card" v-bind:id="tooltipId">
			<div class="card-content">
				<div class="media">
					<div class="media-left">
						<figure class="image is-64x64">
							<img v-if="synergy.type == 'race'" v-bind:src="raceImageUrl"/>
							<img v-else v-bind:src="classImageUrl"/>
						</figure>
					</div>
					<div class="media-content">
						<div class="big-name">{{synergy.ability}}</div>
						<hr />
						<span v-if="synergy.show_n">When you send N <strong>different</strong> {{labelText(synergy.name)}} units into battle, </span>
						<span class="description" v-html="synergy.description"></span>
					</div>
				</div>
				<div class="content" v-if="synergy.combos && synergy.combos.length > 0">
					<table class="table is-bordered table is-striped is-vcentered">
						<thead>
							<tr>
								<th width="10%"><abbr title="Number of Different Units">N</abbr></th>
								<th width="90%" class="desc">Synergy Bonus</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="bonus in synergy.combos">
								<th>{{bonus.units}}</th>
								<td class="desc" v-html="bonus.bonus"></td>
							</tr>
						</tbody>
					</table>
				</div>
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