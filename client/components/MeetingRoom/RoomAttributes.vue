<template>
    <div>
		<input type="radio" :id="roomId" name="rooms" :value="roomId" :checked="checked" @change="$emit('change', $event.target.value)">
		<label :for="roomId">room numero : {{roomId}}</label>
    </div>
</template>

<script>
export default {
    name: "RoomAttributes",
    props: {
        roomId: {
            type: Number,
            default: 0,
        },
		checked: {
			type: Boolean,
			required: true
		}
    },
};
</script>