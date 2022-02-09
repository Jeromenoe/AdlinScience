<template>
	<div>
		<h1>Sélection de la salle de réunion</h1>
		<ul>
			<li v-for="n in 5" :key="n"><RoomAttributes :roomId="n"/></li>
		</ul>
	</div>
</template>

<script>
import RoomAttributes from '@/components/MeetingRoom/RoomAttributes'

export default {
	components: {
		RoomAttributes,
	}
}
</script>