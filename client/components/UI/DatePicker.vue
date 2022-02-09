
<template>
	<div class="date-select">
		<v-date-picker v-if="show" v-model="picker" elevation="24" class="date-picker"></v-date-picker>
		<v-calendar-daily v-if="!show" class="calendar"></v-calendar-daily>
		<button @click="print()">Print picker</button>
	</div>
</template>

<script>
  export default {
    data () {
      return {
        picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
		show: true
      }
    },
	methods: {
		print() {
			this.show = !this.show;
			console.log(this.picker);
		}
	}
  }
</script>

<style scoped>
.date-picker {
	border: 1px solid rgb(57, 113, 197);
	border-radius: 8px;
	width: 50%;
}

.date-select {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.date-select button {
	margin: 20px;
}

.calendar {
	height: 500px;
	width: 80%;
}
</style>