<template>
    <div class="reservation">
        <h1>Réservation de salles</h1>
        <div>
            <span class="current-room">Réservation pour {{ meetingRoom.name }}</span>
            <nuxt-link to="/reservation">Salles</nuxt-link>
        </div>
        <MyCalendar :slots="slots" :roomName="meetingRoom.name"/>
    </div>
</template>

<script>
import MyCalendar from "@/components/Calendar/MyCalendar";
export default {
    name: "IndexPage",
	transition: 'page',
    components: {
        MyCalendar,
    },
    computed: {
		meetingRoom() {
			return  this.$store.getters.meetingRoom;
		},
		slots() {
			return this.$store.getters.slots;
		}
    },
	created() {
	}
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
    color: #0070ba;
    border: 1px solid #0070ba;
    border-radius: 2px;
    transition-duration: 0.4s;
}

.reservation a:hover {
    background-color: #0070ba;
    color: white;
}

.reservation .current-room {
    margin-right: 10px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}

</style>