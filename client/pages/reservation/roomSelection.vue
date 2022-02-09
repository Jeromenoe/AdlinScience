<template>
	<div class="container">
        <h3>Salles de réunion</h3>
		<div class="meeting-rooms">
            <RoomAttributes v-for="room in meetingRooms" :key="room.id" :room="room" @change="changeValue" :checked="room.id == roomId"/>
		</div>
		<div class="mr-buttons">
            <CustomButton @click="validate()" btnStyle="validate">Valider</CustomButton>
            <CustomButton @click="cancel()" btnStyle="cancel">Retour</CustomButton>
        </div> 
    </div>
</template>

<script>
import RoomAttributes from "@/components/MeetingRoom/RoomAttributes";
import CustomButton from "@/components/UI/CustomButton"

export default {
    components: {
        RoomAttributes,
		CustomButton
    },
    methods: {
        validate() {
            this.$store.dispatch("setMeetingRoom", this.meetingRooms[this.roomId]);
            this.$router.push({
                path: "/reservation",
            });
        },
		cancel() {
			this.$router.go(-1);
		},
        changeValue(roomId) {
			this.roomId = roomId;
        },
    },
    created() {
        this.meetingRoom = this.$store.getters.meetingRoom;
        this.meetingRooms = this.$store.getters.meetingRooms;
		this.roomId = this.meetingRoom.id;
    },
};
</script>

<style scoped>
.container {
    padding: 10px;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.container h3 {
	padding: 0px;
	margin: 10px 0px 0px 0px;
}

.meeting-rooms {
	padding: 10px;
	width: 60%;
	display: flex;
	flex-direction: column;
	align-items: center;
}

.mr-buttons {
	display: flex;
	justify-content: center;
}


@media (max-width: 400px) {
    .meeting-room {
        width: 220px;
    }
	.mr-buttons {
		width: 220px;
	}
}

@media (min-width: 800px) {
    .meeting-room {
        width: 450px;
    }
}

</style>