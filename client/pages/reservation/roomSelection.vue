<template>
	<div class="container">
        <h3>Salles de réunion</h3>
		<div class="meeting-rooms">
            <RoomAttributes v-for="room in meetingRooms" :key="room.id" :room="room" @change="changeValue" :checked="room.id == roomId"/>
		</div>
		<div class="rooms-selection-buttons">
            <button @click="validate()">Valider</button>
            <button @click="cancel()">Retour</button>
        </div> 
    </div>
</template>

<script>
import RoomAttributes from "@/components/MeetingRoom/RoomAttributes";

export default {
    components: {
        RoomAttributes,
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

.meeting-rooms {
	padding: 10px;
}

.rooms-selection-buttons button {
	cursor: pointer;
}
</style>