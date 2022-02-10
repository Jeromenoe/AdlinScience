<template>
    <div class='custom-calendar'>
		<div>
			<DayPicker/>
			<v-calendar-daily class="calendar"></v-calendar-daily>
		</div>
    </div>
</template>

<script>
import DayPicker from '@/components/UI/DayPicker'

export default {
	components: {
		DayPicker
	}
}
</script>

<style scoped>

.custom-calendar {
	display: flex;
	justify-content: center;
	height: 500px;
}

.custom-calendar div {
	width: 70%;
}

.custom-calendar .calendar {
	width: 100%;
}

.custom-calendar .day-picker {
	width: 150px;
}

</style>