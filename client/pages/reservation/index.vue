<template>
    <div class="reservation" tabindex="0" @keydown.esc="cancel">
        <h1>Réservation de salles</h1>
        <div>
            <span class="current-room">Réservation pour {{ meetingRoom.name }}</span>
			<button @click="showRoomPage = !showRoomPage">Salles</button>
        </div>
        <MyCalendar :slots="slots" :roomName="meetingRoom.name"/>
		<div  id="room-page" :style="{ visibility: visibility, opacity: + showRoomPage}" @click="cancelOnLeftButton">
			<RoomPage id="room" v-if="showRoomPage" v-on:cancel="cancel"/>
		</div>
    </div>
</template>

<script>
import MyCalendar from "@/components/Calendar/MyCalendar";
import RoomPage from "@/components/Reservation/RoomPage";

export default {
    name: "IndexPage",
	transition: 'page',
	middleware: 'auth',
    components: {
        MyCalendar,
		RoomPage,
    },
	data() {
		return {
			showRoomPage: false,
		}
	},
    computed: {
		meetingRoom() {
			return  this.$store.getters.meetingRoom;
		},
		slots() {
			return this.$store.getters.slots;
		},
		visibility() {
			if (this.showRoomPage) {
				return 'visible';
			}
			return 'hidden';
		}
    },
	created() {
	},
	methods: {
		cancel() {
            this.showRoomPage = false;
        },
		cancelOnLeftButton(event) {
			var ignoreClickOnMeElement = document.getElementById('room');
			if (ignoreClickOnMeElement && !ignoreClickOnMeElement.contains(event.target)) {
				this.cancel();
			}
		}
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

.reservation button {
    padding: 3px;
    background-color: white;
    color: #0070ba;
    border: 1px solid #0070ba;
    border-radius: 2px;
    transition-duration: 0.4s;
}

.reservation button:hover {
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


#room-page {
	transition:visibility 0.2s linear,opacity 0.2s linear;
	background-color: rgba(0, 0, 0, 0.7);
	position: absolute;
	left: 0; 
	top: 0; 
	width: 100%; 
	height:100%;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 110;
}

</style>