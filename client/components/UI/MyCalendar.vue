<template>
    <div class='custom-calendar'>
		<div>
			<DayPicker @input="updateDate"/>
			<v-calendar-daily class="calendar" :start="date"></v-calendar-daily>
		</div>
    </div>
</template>

<script>
import DayPicker from '@/components/UI/DayPicker'

export default {
	components: {
		DayPicker
	},
	data() {
		return {
			date: new Date().toISOString().split('T')[0],
		}
	},
	methods: {
		updateDate(value) {
			this.date = value;
		}
	}
}
</script>

<style scoped>

.custom-calendar {
	display: flex;
	justify-content: center;
	height: 500px;
	width: 100%;
	margin: 40px;
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