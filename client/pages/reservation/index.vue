<template>
	<div class="reservation">
		<h1>Réservation des salles de réunion</h1>
		<h2>Ma room actuelle est : {{ meetingRoom.name }}</h2>
		<nuxt-link to="/reservation/roomSelection">Séctionner votre salle de réunion</nuxt-link>
		<br><br>
		<DatePicker />
	</div>
</template>

<script>
import DatePicker from '@/components/UI/DatePicker'
export default {
	components: {
		DatePicker
	},
	created() {
		this.meetingRoom = this.$store.getters.meetingRoom;
	}
}
</script>
