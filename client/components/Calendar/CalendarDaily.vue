<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet 
			height="600" 
			style="display:flex; flex-direction: column; align-content: center;">
                <v-calendar 
				:start="date" 
				ref="calendar" 
				v-model="value" 
				color="primary" 
				type="day" 
				:events="events" 
				:event-ripple="false" 
				@mousedown:event="startDrag" 
				@mousedown:time="startTime" 
				@mousemove:time="mouseMove" 
				@mouseup:time="endDrag" 
				@mouseleave.native="cancelDrag" 
				style="border: 1px solid #eee">
                    <template v-slot:event="{ event, timed, eventSummary }">
                        <div class="v-event-draggable" v-html="eventSummary()"></div>
						<button
						id="delete-btn"
						title="Delete slot"
						v-if="event.owned || !user.role.localeCompare('admin')"
						@click="deleteSlot(event.slotId)">x</button>
                        <div 
						v-if="timed && event.movable == true" 
						class="v-event-drag-bottom" 
						@mousedown.stop="extendBottom(event)"></div>
                    </template>
                </v-calendar>
                <CustomButton @click="validate()" 
				btnStyle="validate" 
				style="margin-top: 20px;">Valider</CustomButton>
            </v-sheet>
        </v-col>
		<v-snackbar v-model="snackbar" :timeout="timeout" top right style="top:80px;">
			{{ text }}
			<template v-slot:action="{ attrs }">
				<v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
    </v-row>
</template>

<script>
import CustomButton from "@/components/UI/CustomButton";

export default {
    components: {
        CustomButton,
    },
    data: () => ({
        value: "",
        events: [],
        dragEvent: null,
        dragStart: null,
        createEvent: null,
        createStart: null,
        extendOriginal: null,
        previousTime: 0,
		user: null,
		snackbar: false,
		text: 'My timeout is set to 2000.',
		timeout: 2000,
    }),
    props: {
        date: {
            type: String,
            required: true,
        },
        slots: {
            type: Array,
            required: true,
        },
        roomName: {
            type: String,
            required: true,
        },
    },
    watch: {
        slots(slots) {
            this.initEvents(slots);
        },
    },
    methods: {
        startDrag({ event, timed }) {
            if (event && timed) {
                this.dragEvent = event;
                this.dragTime = null;
                this.extendOriginal = null;
            }
        },
        startTime(tms) {
            var currentDate = new Date().toISOString().split("T")[0];
            if (currentDate.localeCompare(this.date) == 1) {
                return;
            }
            const mouse = this.toTime(tms);
            if (this.dragEvent && this.dragTime === null) {
                if (this.dragEvent.movable == false) {
                    return;
                }
                const start = this.dragEvent.start;
                this.dragTime = mouse - start;
            } else {
                if (
                    this.events.length - 1 >= 0 &&
                    this.events[this.events.length - 1].movable == true
                ) {
                    this.events.pop();
                }
                this.createStart = this.roundTime(mouse);
                this.createEvent = {
                    name: "Créneau actuel",
                    color: "#60409A",
                    start: this.createStart,
                    end: this.createStart + 15 * 60 * 1000,
                    timed: true,
                    movable: true,
                };
                this.events.push(this.createEvent);
            }
        },
        extendBottom(event) {
            this.createEvent = event;
            this.createStart = event.start;
            this.extendOriginal = event.end;
        },
        mouseMove(tms) {
            if (this.previousTime == this.roundTime(this.toTime(tms))) {
                return;
            }
            this.previousTime = this.roundTime(this.toTime(tms));

            this.realMouseMove(tms);
        },
        realMouseMove(tms) {
            const mouse = this.toTime(tms);
            if (this.dragEvent && this.dragTime !== null) {
                const start = this.dragEvent.start;
                const end = this.dragEvent.end;
                const duration = end - start;
                const newStartTime = mouse - this.dragTime;
                var newStart = this.roundTime(newStartTime);
                var newEnd = newStart + duration;
                for (var i = 0; i < this.events.length - 1; i++) {
                    if (
                        newStart <= this.events[i].end &&
                        newStart > this.events[i].start - duration
                    ) {
                        newStart = this.events[i].end;
                        newEnd = newStart + duration;
                    }
                }
				for (var j = 0; j < this.events.length - 1; j++) {
					if (newStart <= this.events[j].start && newEnd > this.events[j].start) {
						return ;
					}
				}
                this.dragEvent.start = newStart;
                this.dragEvent.end = newEnd;
            } else if (this.createEvent && this.createStart !== null) {
                const mouseRounded = this.roundTime(mouse, false);
                var min = Math.min(mouseRounded, this.createStart);
                var max = Math.max(mouseRounded, this.createStart);
                var newMin = 0;
                var newMax = Infinity;
                for (var i = 0; i < this.events.length - 1; i++) {
                    if (min == mouseRounded) {
                        if (
                            min < this.events[i].end &&
                            max >= this.events[i].end
                        ) {
                            if (newMin < this.events[i].end) {
                                newMin = this.events[i].end;
                            }
                        }
                    }
                    if (max == mouseRounded) {
                        if (
                            max > this.events[i].start &&
                            min < this.events[i].start
                        ) {
                            if (newMax > this.events[i].start) {
                                newMax = this.events[i].start;
                            }
                        }
                    }
                }
                this.createEvent.start = newMin > min ? newMin : min;
                newMax = newMax < max ? newMax : max;
                this.createEvent.end =
                    newMax == this.createEvent.start
                        ? newMax + 15 * 60 * 1000
                        : newMax;
            }
        },
        endDrag() {
            this.dragTime = null;
            this.dragEvent = null;
            this.createEvent = null;
            this.createStart = null;
            this.extendOriginal = null;
        },
        cancelDrag() {
            if (this.createEvent) {
                if (this.extendOriginal) {
                    this.createEvent.end = this.extendOriginal;
                } else {
                    const i = this.events.indexOf(this.createEvent);
                    if (i !== -1) {
                        this.events.splice(i, 1);
                    }
                }
            }
            this.createEvent = null;
            this.createStart = null;
            this.dragTime = null;
            this.dragEvent = null;
        },
        roundTime(time, down = true) {
            const roundTo = 15; // minutes
            const roundDownTime = roundTo * 60 * 1000;
            return down
                ? time - (time % roundDownTime)
                : time + (roundDownTime - (time % roundDownTime));
        },
        toTime(tms) {
            return new Date(
                tms.year,
                tms.month - 1,
                tms.day,
                tms.hour,
                tms.minute
            ).getTime();
        },
        validate() {
            if (
                this.events.length > 0 &&
                this.events[this.events.length - 1].movable == true
            ) {
                this.events[this.events.length - 1].movable = false;
                this.events[this.events.length - 1].name = "Créneau validé";
                this.events[this.events.length - 1].color = "#096A09";
                const { start: dateStart, end: dateEnd } =
                    this.events[this.events.length - 1];
                const newEvent = { name: this.roomName, dateStart, dateEnd };
				const data = Object.keys(newEvent)
					.map((key, index) => key + '=' + encodeURIComponent(newEvent[key]))
					.join('&');
                this.$axios.$post(
                        'slotsMeetingRooms',
                        data,
						{
							headers: {
								"Content-Type": 'application/x-www-form-urlencoded',
								"Authorization": this.$store.getters.token,
							}
						}
                    )
                    .then(() => {
						setTimeout(() => {
							this.$store.dispatch('setSlots', this.roomName)
						}, 500)
					})
					.then(() => {
						this.text = "Slot ajouté"
						this.snackbar = true
					});
            }
        },
        initEvents(slots) {
            const events = [];
            for (const slot of slots) {
				let name;
				let color;
				if (slot.owned) {
					name = "Mon créneau";
					color = "#0070BA";
				} else {
					name = "Créneau indisponible";
					color = "#ff0000";
				}
                events.push({
                    name,
                    color,
                    start: parseInt(slot.dateStart),
                    end: parseInt(slot.dateEnd),
                    timed: true,
                    movable: false,
					owned: slot.owned,
					slotId: slot._id,
                });
            }
            this.events = events;
        },
		deleteSlot(slotId) {
			let params = {
				roomName: this.roomName,
				slotId
			}
			const data = Object.keys(params)
				.map((key, index) => key + '=' + encodeURIComponent(params[key]))
				.join('&');
			this.$axios.$delete(
					'slotsMeetingRooms',
					{
						data: data,
						headers: {
							"Content-Type": 'application/x-www-form-urlencoded',
							"Authorization": this.$store.getters.token,
						}
					}
				)
				.then(() => this.$store.dispatch('setSlots', this.roomName))
				.then(() => {
					this.text = "Slot supprimé"
					this.snackbar = true
				});
		}
    },
    created() {
        this.initEvents(this.slots);
		this.user = this.$store.getters.user;
    },
	
};
</script>

<style  lang="scss">
.v-event-draggable {
    padding-left: 6px;
}
.v-event-timed {
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
.v-event-drag-bottom {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 4px;
    height: 4px;
    cursor: ns-resize;
    &::after {
        display: none;
        position: absolute;
        left: 50%;
        height: 4px;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        width: 16px;
        margin-left: -8px;
        opacity: 0.8;
        content: "";
    }
    &:hover::after {
        display: block;
    }
}

#delete-btn {
	position: absolute;
	top: -3px;
	right: 10px;
	width: 20px;
	font-size: 1.3em;
}
</style>