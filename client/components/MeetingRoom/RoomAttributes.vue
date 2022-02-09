<template>
	<div>
		room numero : {{roomId}}
	</div>
</template>

<script>
export default {
	name: "RoomAttributes",
	props: {
		roomId: {
			type: Number,
			default: 0
		}
	}
}
</script>