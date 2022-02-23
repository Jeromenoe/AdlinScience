<template>
	<div class='container'>
		<v-card style="width:100%; min-width: 415px">
			<v-card-title style="margin-bottom: 10px">
			Salles de réunion
			<v-spacer></v-spacer>
			<v-text-field
				v-model="search"
				append-icon="mdi-magnify"
				label="Recherche par nom"
				single-line
				hide-details
			></v-text-field>
			</v-card-title>
			<v-data-table
			v-model="selected"
			:headers="headers"
			:items="rooms"
			:single-select="singleSelect"
			:page.sync="page"
			item-key="name"
			show-select
			class="elevation-1"
			:items-per-page="itemsPerPage"
			hide-default-footer
			@click:row="handleClick"
			@page-count="pageCount = $event">
				<template v-slot:[`item.equipements`]="{ item }">
					<span v-for="equip in item.equipements" :key="equip.name">{{ equip.name }} <br></span>
				</template>
				<template v-slot:[`body.append`]>
					<tr id="search">
						<td colspan="3"></td>
						<td style="width:130px">
							<div id="capacity-filter">
								<v-text-field 
								v-model="capacityMin"
								type="number"
								label="Min"
								style="margin-right:8px"
								:min="0"
								></v-text-field>
								<v-text-field 
								v-model="capacityMax"
								type="number"
								label="Max"
								:min="0"
								></v-text-field>
							</div>
						</td>
						<td style="width:240px">
							<v-select
							v-model="e6"
							:items="states"
							:menu-props="{ maxHeight: '400', offsetY: true, closeOnClick: true }"
							label="Équipements"
							multiple
							append-icon=''
							></v-select>
						</td>
					</tr>
			</template>
			</v-data-table>
			<div class="text-center pt-2">
				<v-pagination
					v-model="page"
					:length="pageCount"
				></v-pagination>
			</div>
		</v-card>
		<div class="buttons">
            <CustomButton @click="validate()" btnStyle="validate">Valider</CustomButton>
        </div>
	</div>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";

export default {
    components: {
        CustomButton,
    },
    data() {
        return {
            singleSelect: true,
			selected: [],
			page: 1,
			pageCount: 0,
			itemsPerPage: 5,
			capacityMin: 0,
			search: '',
			e6: [],
            headers: [
                { text: "Nom", value: "name" },
                { text: "Description", value: "description" },
                { text: "Capacité", value: "capacity", align: "center" },
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
		states() {
			var equipments = [];
			for (let room of this.meetingRooms) {
				for (let equipment of room.equipements) {
					if (!equipments.includes(equipment.name)) {
						equipments.push(equipment.name);
					}
				}
			}
			return equipments;
		},
		capacityMax: {
			get() {
				var capacityMax = 0;
				for (let room of this.meetingRooms) {
					if (room.capacity > capacityMax) {
						capacityMax = room.capacity;
					}
				}
				return capacityMax;
			},
			set(newCapacityMax) {
				return newCapacityMax;
			}
		}
	},
	methods: {
        validate() {
			if (this.selected.length) {
				this.$store.dispatch(
					"setMeetingRoom",
					this.meetingRooms[this.selected[0].id]
				);
			}
            this.$emit('cancel');
        },
		handleClick(row) {
			this.selected = [row];
		}
	}
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
	width: 62%;
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

#capacity-filter {
	display: flex;
	justify-content: space-between;
}

#search {
	background-color: transparent !important;
}

</style>