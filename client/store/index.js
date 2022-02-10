import vuex from 'vuex';
import axios from 'axios';

const url = 'http://localhost:3001/api/'
const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: { },
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
			// nuxtServerInit(vuexContext, context) {
			// 	return axios.get(url + 'meetingRooms')
			// 	.then(res => {
			// 		const meetingRooms = [];
			// 		for (const key in res.data.rooms) {
			// 			meetingRooms.push({ ...res.data.rooms[key], id: parseInt(key) });
			// 		}
			// 		vuexContext.commit('setMeetingRooms', meetingRooms)
			// 		vuexContext.commit('setMeetingRoom', meetingRooms[0])
			// 	})
			// 	.catch(e => context.error(e))
			// },
			// nuxtServerInit(vuexContext, context) {
			// 	return axios.get(url + 'slotsMeetingRooms')
			// 	.then(res => {
			// 		const slots = [];
			// 		for (const key in res.data.slots) {
			// 			meetingRooms.push({ ...res.data.slots[key], id: parseInt(key) });
			// 		}
			// 		vuexContext.commit('setSlots', slots)
			// 	})
			// 	.catch(e => context.error(e))
			// },
			async nuxtServerInit ({ commit }) {
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
				const slots = await axios.get(url + 'slotsMeetingRooms')
				.then(res => {
					const slotsMeetingRooms = [];
					for (const key in res.data.slots) {
						slotsMeetingRooms.push({ ...res.data.slots[key], id: parseInt(key) });
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
			},
			setReservationDate(vuexContext, date) {
				vuexContext.commit('setReservationDate', date);
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