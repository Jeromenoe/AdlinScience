import vuex from 'vuex';
import axios from 'axios';

// const url = 'http://localhost:3001/api/'
const url = 'https://heroku-adlin-science-api.herokuapp.com/api/'
const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: {},
			meetingRooms: [],
			reservationDate: new Date().toISOString().split('T')[0],
			slots: []
		}),
		mutations: {
			setMeetingRoom(state, room) {
				state.meetingRoom = room;
			},
			setMeetingRooms(state, rooms) {
				state.meetingRooms = rooms;
			},
			setReservationDate(state, date) {
				state.reservationDate = date;
			},
			setSlots(state, slots) {
				state.slots = slots;
			}
		},
		actions: {
			async nuxtServerInit({ commit }) {
				const meetingRooms = await axios.get(url + 'meetingRooms')
					.then(res => {
						const meetingRooms = [];
						for (const key in res.data.rooms) {
							meetingRooms.push({ ...res.data.rooms[key], id: parseInt(key) });
						}
						return meetingRooms;
					})
				commit('setMeetingRooms', meetingRooms);
				commit('setMeetingRoom', meetingRooms[0]);
				const slots = await axios.get(url + 'slotsMeetingRooms', { params: { name: meetingRooms[0].name } })
					.then(res => {
						const slotsMeetingRooms = [];
						if (res.data.slots) {
							return [];
						}
						for (const key in res.data) {
							slotsMeetingRooms.push({ ...res.data[key], id: parseInt(key) });
						}
						return slotsMeetingRooms;
					})
				commit('setSlots', slots);
			},
			addSlot(vuexContext, slot) {
				vuexContext.commit('setSlots', this.slots.concat(slot));
			},
			setMeetingRoom(vuexContext, room) {
				vuexContext.commit('setMeetingRoom', room);
				vuexContext.dispatch('setSlots', room.name);
			},
			setReservationDate(vuexContext, date) {
				vuexContext.commit('setReservationDate', date);
			},
			async setSlots(vuexContext, name) {
				const slots = await axios.get(url + 'slotsMeetingRooms', { params: { name } })
					.then(res => {
						const slotsMeetingRooms = [];
						if (res.data.slots) {
							return [];
						}
						for (const key in res.data) {
							slotsMeetingRooms.push({ ...res.data[key], id: parseInt(key) });
						}
						return slotsMeetingRooms;
					})
				vuexContext.commit('setSlots', slots);
			}
		},
		getters: {
			meetingRoom(state) {
				return state.meetingRoom;
			},
			meetingRooms(state) {
				return state.meetingRooms;
			},
			reservationDate(state) {
				return state.reservationDate;
			},
			slots(state) {
				return state.slots;
			}
		}
	})
}

export default createStore;