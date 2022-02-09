<template>
    <div>
		<input type="radio" :id="room.id" name="rooms" :value="room.id" :checked="checked" @change="$emit('change', $event.target.value)">
		<label :for="room.id">room name : {{room.name}}</label>
    </div>
</template>

<script>
export default {
    name: "RoomAttributes",
    props: {
        room: {
            type: Object,
            default: {},
        },
		checked: {
			type: Boolean,
			required: true
		}
    },
};
</script>