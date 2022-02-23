<template>
	<div class='container'>
		<h1>Salles de réunion</h1>
		<v-data-table v-model="selected" :headers="headers" :items="rooms" :single-select="singleSelect" item-key="name" show-select class="elevation-1">
			<template v-slot:[`item.equipements`]="{ item }">
				<span v-for="equip in item.equipements" :key="equip.name">{{ equip.name }} <br></span>
			</template>
		</v-data-table>
		<div class="buttons">
            <CustomButton @click="validate()" btnStyle="validate">Valider</CustomButton>
            <CustomButton @click="cancel()" btnStyle="cancel">Retour</CustomButton>
        </div>
	</div>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";

export default {
	transition: "page",
    components: {
        CustomButton,
    },
    data() {
        return {
            singleSelect: true,
			selected: [],
            headers: [
                { text: "Nom", value: "name" },
                { text: "Description", value: "description" },
                { text: "Capacité", value: "capacity" },
                { text: "Équipements", value: "equipements" },
            ]
        };
    },
	created() {
        this.meetingRoom = this.$store.getters.meetingRoom;
        this.meetingRooms = this.$store.getters.meetingRooms;
		this.selected = [this.meetingRoom]
    },
	computed: {
		rooms() {
			return this.meetingRooms;
		},
	},
	methods: {
        validate() {
            this.$store.dispatch(
                "setMeetingRoom",
                this.meetingRooms[this.selected[0].id]
            );
            this.$router.push({
                path: "/",
            });
        },
        cancel() {
            this.$router.go(-1);
        }
	}
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container h1 {
    padding: 0px;
    margin: 20px 0px;
    color: #666;
}

.buttons {
    display: flex;
    justify-content: center;
	margin-top: 15px;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>