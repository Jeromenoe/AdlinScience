<template>
    <div class="reservation">
        <h1>Réservation de salles</h1>
        <div>
			<span class="current-room">Réservation pour {{ meetingRoom.name }}</span>
			<nuxt-link to="/reservation">Salles</nuxt-link>
		</div>
        <MyCalendar />
    </div>
</template>

<script>
import MyCalendar from "@/components/UI/MyCalendar";
export default {
	name: 'IndexPage',
    components: {
        MyCalendar,
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
	margin: 20px 0;
}

.reservation a {
	text-decoration: none;
	padding: 3px;
	background-color: white; 
	color: #0070BA; 
	border: 1px solid #0070BA;
	border-radius: 2px;
	transition-duration: 0.4s;
}

.reservation a:hover {
  background-color: #0070BA;
  color: white;
}

.reservation .current-room {
	margin-right: 10px;
}

</style>