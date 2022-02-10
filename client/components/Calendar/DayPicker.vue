<template>
    <div class="day-picker">
        <v-layout>
            <v-menu 
			v-model="fromDateMenu" 
			:close-on-content-click="false" 
			:nudge-right="40" 
			offset-y transition="scale-transition" 
			max-width="290px" 
			min-width="290px">
                <template v-slot:activator="{ on }">
                    <v-text-field label="Date de réservation" 
					readonly 
					:value="fromDateDisp" 
					v-on="on"></v-text-field>
                </template>
                <v-date-picker 
				locale="en-in" 
				v-model="fromDateVal" 
				no-title 
				@input="fromDateMenu = false" 
				v-on:input="$emit('input', $event)">
				</v-date-picker>
            </v-menu>
        </v-layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fromDateMenu: false,
            fromDateVal: "",
        };
    },
    computed: {
        fromDateDisp() {
            return this.fromDateVal;
        },
    },
    created() {
        this.fromDateVal = this.$store.getters.reservationDate;
    },
};
</script>


<style scoped>
.day-picker {
    width: 150px;
}
</style>