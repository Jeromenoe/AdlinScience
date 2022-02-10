import vuex from 'vuex';
import axios from 'axios';

const url = 'http://localhost:3001/api/'
const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: { },
			meetingRooms: [],
			reservationDate: new Date().toISOString().split('T')[0],
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
			}
		},
		actions: {
			nuxtServerInit(vuexContext, context) {
				return axios.get(url + 'meetingRooms')
				.then(res => {
					const meetingRooms = [];
					for (const key in res.data.rooms) {
						meetingRooms.push({ ...res.data.rooms[key], id: parseInt(key) });
					}
					vuexContext.commit('setMeetingRooms', meetingRooms)
					vuexContext.commit('setMeetingRoom', meetingRooms[0])
				})
				.catch(e => context.error(e))
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
			}
		}
	})
}

export default createStore;