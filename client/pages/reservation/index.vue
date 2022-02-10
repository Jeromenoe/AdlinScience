<template>
	<div class="reservation">
		<h1>Réservation des salles de réunion</h1>
		<h2>Ma room actuelle est : {{ meetingRoom.name }}</h2>
		<nuxt-link to="/reservation/roomSelection">Séctionner votre salle de réunion</nuxt-link>
		<br><br>
		<!-- <DatePicker /> -->
		<MyCalendar />
	</div>
</template>

<script>
import DatePicker from '@/components/UI/DatePicker'
import MyCalendar from '@/components/UI/MyCalendar'
export default {
	components: {
		DatePicker,
		MyCalendar
	},
	created() {
		this.meetingRoom = this.$store.getters.meetingRoom;
	}
}
</script>
