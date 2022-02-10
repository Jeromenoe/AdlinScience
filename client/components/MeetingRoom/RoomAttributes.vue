<template>
    <div class="meeting-room">
        <input type="radio" 
		:id="room.id" 
		name="rooms" 
		:value="room.id" 
		:checked="checked" 
		@change="$emit('change', $event.target.value)">
        <label :for="room.id">
            <span class="mr-icon"></span>
            <span class="mr-name">Nom : {{ room.name }}</span>
            <span class="mr-description">Description : {{ room.description }}</span>
            <span class="mr-capacity">Capacité : {{ room.capacity }}</span>
            <span v-if="room.equipements.length" class="mr-equipements">Equipements :
                <ul>
                    <li v-for="elem in room.equipements" :key="elem.name + room.id">{{ elem.name }}</li>
                </ul>
            </span>
        </label>
    </div>
</template>

<script>
export default {
    name: "RoomAttributes",
    props: {
        room: {
            type: Object,
            required: true,
        },
        checked: {
            type: Boolean,
            required: true,
        },
    },
};
</script>

<style scoped>
.meeting-room {
    margin: 6px 0;
    width: 100%;
}

.meeting-room label {
    display: flex;
    flex-direction: column;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: rgb(228, 228, 228);
}

.meeting-room label:hover {
    cursor: pointer;
}

.meeting-room input {
    display: none;
}

.meeting-room input:checked ~ label {
    background-color: #337ab7;
    border-radius: 4px;
    border: 1px solid #ccc;
    color: #eee;
}

.mr-equipements ul {
    padding: 0px 0px 0px 20px;
    margin: 0;
    list-style-type: circle;
    font-size: 14px;
    color: #555;
}

.meeting-room input:checked ~ label .mr-equipements ul {
    color: #eee;
}
</style>