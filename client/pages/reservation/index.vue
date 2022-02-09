<template>
	<div class="reservation">
		<h1>Réservation des salles de réunion</h1>
		<h2>Ma room actuelle est : {{ meetingRoom.name }}</h2>
		<nuxt-link to="/reservation/roomSelection">Séctionner votre salle de réunion</nuxt-link>
	</div>
</template>

<script>
export default {
	data() {
		return {
			meetingRoom: {
				id: 0,
				name: ""
			}
		}
	},
	created() {
		this.meetingRoom = this.$store.getters.meetingRoom;
		// this.$store.dispatch('setMeetingRoom', this.meetingRoom);
	}
}
</script>