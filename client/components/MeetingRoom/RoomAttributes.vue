<template>
    <div class="meeting-room">
		<input type="radio" :id="room.id" name="rooms" :value="room.id" :checked="checked" @change="$emit('change', $event.target.value)">
        <label :for="room.id">
			<span class="mr-icon"></span>
            <span class="mr-title">Nom : {{ room.name }}</span>
            <span class="mr-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In semper quam nunc.</span>
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
	background-color: #ddd;
	margin: 10px 0;
	border-radius: 6px;
	border: 1px solid #ccc;
}

.meeting-room label {
	display: flex;
	flex-direction: column;
	padding: 10px;
}

.meeting-room label:hover {
	cursor: pointer;
}

.meeting-room input {
	display: none;
}

.meeting-room input:checked ~ label {
	background-color: #337ab7;
	border-radius: 6px;
	border: 1px solid #ccc;
}
</style>