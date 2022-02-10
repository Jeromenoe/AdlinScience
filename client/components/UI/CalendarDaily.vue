<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="600" style="display:flex; flex-direction: column; align-content: center;">
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
		  style="border: 1px solid #eee"
        >
          <template v-slot:event="{ event, timed, eventSummary }">
            <div
              class="v-event-draggable"
              v-html="eventSummary()"
            ></div>
            <div
              v-if="timed && event.movable == true"
              class="v-event-drag-bottom"
              @mousedown.stop="extendBottom(event)"
            ></div>
          </template>
        </v-calendar>
        <CustomButton @click="validate()" btnStyle="validate" style="margin-top: 20px">Valider</CustomButton>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import CustomButton from '@/components/UI/CustomButton';

  export default {
	components: {
		CustomButton
	},
    data: () => ({
      value: '',
      events: [{
		   name: 'Créneau indisponible',
            color: "#ff0000",
            start: 1644477300000,
            end: 1644479100000,
            timed: true,
			movable: false,
	  },
	  {
		   name: 'Créneau indisponible',
            color: "#ff0000",
            start: 1644487300000,
            end: 1644489100000,
            timed: true,
			movable: false,
	  }],
      dragEvent: null,
      dragStart: null,
      createEvent: null,
      createStart: null,
      extendOriginal: null,
    }),
	props: {
		date: {
			type: String,
			required: true
		}
	},
    methods: {
      startDrag ({ event, timed }) {
        if (event && timed) {
          this.dragEvent = event
          this.dragTime = null
          this.extendOriginal = null
        }
      },
      startTime (tms) {
		  var currentDate = new Date().toISOString().split('T')[0];
		  if (currentDate.localeCompare(this.date) == 1) {
			  return ;
		  }
        const mouse = this.toTime(tms)
        if (this.dragEvent && this.dragTime === null) {
			if (this.dragEvent.movable == false) {
				return ;
			}
          const start = this.dragEvent.start
          this.dragTime = mouse - start
        } else {
			if (this.events.length - 1 >= 0 && this.events[this.events.length - 1].movable == true) {
				this.events.pop();
			}
          this.createStart = this.roundTime(mouse)
          this.createEvent = {
            name: 'Créneau actuel',
            color: '#0000ff',
            start: this.createStart,
            end: this.createStart,
            timed: true,
			movable: true,
          }
          this.events.push(this.createEvent)
        }
      },
      extendBottom (event) {
        this.createEvent = event
        this.createStart = event.start
        this.extendOriginal = event.end
      },
      mouseMove (tms) {
        const mouse = this.toTime(tms)
		
        if (this.dragEvent && this.dragTime !== null) {
          const start = this.dragEvent.start
          const end = this.dragEvent.end
          const duration = end - start
          const newStartTime = mouse - this.dragTime
          var newStart = this.roundTime(newStartTime)
          var newEnd = newStart + duration
		  for (var i = 0; i < this.events.length - 1; i++) {
			  if (newStart <= this.events[i].end && newStart > this.events[i].start - duration) {
				  newStart =  this.events[i].end;
          		 newEnd = newStart + duration;
			  }
			}
          this.dragEvent.start = newStart
          this.dragEvent.end = newEnd
        } else if (this.createEvent && this.createStart !== null) {
          const mouseRounded = this.roundTime(mouse, false)
          var min = Math.min(mouseRounded, this.createStart)
          var max = Math.max(mouseRounded, this.createStart)
		  var newMin = 0;
		  var newMax = Infinity;
		  for (var i = 0; i < this.events.length - 1; i++) {
			  if (min == mouseRounded) {
				  if (min < this.events[i].end && max > this.events[i].end) {
					  if (newMin < this.events[i].end) {
						  newMin = this.events[i].end;
					  }
				  }
			  }
			  if (max == mouseRounded) {
				  if (max > this.events[i].start && min < this.events[i].start) {
					  if (newMax > this.events[i].start) {
						  newMax = this.events[i].start;
					  }
				  }
			  }
			}
          this.createEvent.start = (newMin > min) ? newMin : min;
          this.createEvent.end = (newMax < max) ? newMax : max;
        }
      },
      endDrag () {
        this.dragTime = null
        this.dragEvent = null
        this.createEvent = null
        this.createStart = null
        this.extendOriginal = null
      },
      cancelDrag () {
        if (this.createEvent) {
          if (this.extendOriginal) {
            this.createEvent.end = this.extendOriginal
          } else {
            const i = this.events.indexOf(this.createEvent)
            if (i !== -1) {
              this.events.splice(i, 1)
            }
          }
        }
        this.createEvent = null
        this.createStart = null
        this.dragTime = null
        this.dragEvent = null
      },
      roundTime (time, down = true) {
        const roundTo = 15 // minutes
        const roundDownTime = roundTo * 60 * 1000
        return down
          ? time - time % roundDownTime
          : time + (roundDownTime - (time % roundDownTime))
      },
      toTime (tms) {
        return new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
      },

      getEvents ({ start, end }) {
        // const events = []
        // const min = new Date(`${start.date}T00:00:00`).getTime()
        // const max = new Date(`${end.date}T23:59:59`).getTime()
        // const days = (max - min) / 86400000
        // const eventCount = this.rnd(days, days + 20)
        // for (let i = 0; i < eventCount; i++) {
        //   const timed = this.rnd(0, 3) !== 0
        //   const firstTimestamp = this.rnd(min, max)
        //   const secondTimestamp = this.rnd(2, timed ? 8 : 288) * 900000
        //   const start = firstTimestamp - (firstTimestamp % 900000)
        //   const end = start + secondTimestamp
        //   events.push({
        //     name: this.rndElement(this.names),
        //     color: this.rndElement(this.colors),
        //     start,
        //     end,
        //     timed,
        //   })
        // }
        // this.events = events
      },
	  validate() {
		  if (this.events.length > 0 && this.events[this.events.length - 1].movable == true) {
			  this.events[this.events.length - 1].movable = false;
			  this.events[this.events.length - 1].name = "Créneau validé";
			  this.events[this.events.length - 1].color = "#27be62";
		  }
	  }
    },
  }
</script>

<style scoped lang="scss">
.v-event-draggable {
  padding-left: 6px;
}
.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
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
    content: '';
  }
  &:hover::after {
    display: block;
  }
}
</style>