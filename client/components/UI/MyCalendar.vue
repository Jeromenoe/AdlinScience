<template>
    <div class='custom-calendar'>
		<div>
			<DayPicker @input="updateDate"/>
			<CalendarDaily class="calendar" :date="date"/>
		</div>
    </div>
</template>

<script>
import DayPicker from '@/components/UI/DayPicker';
import CalendarDaily from '@/components/UI/CalendarDaily';

export default {
	components: {
		DayPicker,
		CalendarDaily
	},
	data() {
		return {
			date: '',
		}
	},
	methods: {
		updateDate(value) {
			this.date = value;
			this.$store.dispatch("setReservationDate", value);
		}
	},
	created() {
        this.date = this.$store.getters.reservationDate;
    },
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