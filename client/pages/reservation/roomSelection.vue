<template>
    <div>
        <h1>Sélection de la salle de réunion</h1>
        <ul class="meeting-rooms-list">
            <li v-for="room in meetingRooms" :key="room.id">
                <RoomAttributes :room="room" @change="changeValue" :checked="room.id == roomId"/>
            </li>
        </ul>
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
.meeting-rooms-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
}
</style>