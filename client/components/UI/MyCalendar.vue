<template>
    <div class='custom-calendar'>
        <div class="box-calendar">
			<div class="custom-input">
           		<input id="date" />
				<v-date-picker class="date-picker" width="500"></v-date-picker>
			</div>
            <div class="hide"></div>
            <v-calendar-daily class="calendar"></v-calendar-daily>
        </div>
    </div>
</template>


<style scoped>
.box-calendar {
    position: relative;
    width: 80%;
    height: 600px;
}

.custom-calendar input {
    border: 1px solid #ccc;
    position: absolute;
    z-index: 22;
    left: 43%;
    margin-top: 20px;
    width: 14%;
    height: 40px;
}

.custom-calendar input:hover {
    background-color: blue;
}

.custom-calendar .date-picker {
	position: absolute;
	z-index: 23;
	height: 200px;
	/* display: none; */
}

.custom-calendar .calendar {
    z-index: 20;
}

.custom-calendar .hide {
    background-color: #fff;
    position: absolute;
    z-index: 21;
    left: 20%;
    margin-top: 5px;
    width: 60%;
    height: 70px;
    cursor: pointer;
}
</style>