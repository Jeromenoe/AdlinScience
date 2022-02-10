<template>
	<div class="mr-container">
        <h1>Salles de réunion</h1>
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
                path: "/",
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
.mr-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.container h1 {
	padding: 0px;
	margin: 20px 0px;
	color: #666;
}

.meeting-rooms {
	/* margin: 20px; */
	width: 80%;
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow: auto;
	height: 600px;
}

.mr-buttons {
	display: flex;
	justify-content: center;
}


@media (min-width: 600px) {
    .meeting-rooms {
        width: 450px;
    }
}

</style>