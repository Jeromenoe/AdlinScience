<template>
    <div class="reservation">
        <h1>Réservation de salles</h1>
        <div>
			<span class="current-room">Réservation pour {{ meetingRoom.name }}</span>
			<nuxt-link to="/reservation">Salles</nuxt-link>
		</div>
        <!-- <MyCalendar /> -->
		<div style="width:80%; margin-top: 40px">
			<CalendarDaily />
		</div>
    </div>
</template>

<script>
import MyCalendar from "@/components/UI/MyCalendar";
import CalendarDaily from "@/components/UI/CalendarDaily"
export default {
	name: 'IndexPage',
    components: {
        MyCalendar,
		CalendarDaily
    },
    created() {
        this.meetingRoom = this.$store.getters.meetingRoom;
    },
};
</script>

<style scoped>

.reservation {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.reservation h1 {
	color: #666;
	margin-bottom: 30px;
}

.reservation a {
	text-decoration: none;
	padding: 3px;
	background-color: white; 
	color: #008CBA; 
	border: 1px solid #008CBA;
	border-radius: 2px;
	transition-duration: 0.4s;
}

.reservation a:hover {
  background-color: #008CBA;
  color: white;
}

.reservation .current-room {
	margin-right: 10px;
}

</style>