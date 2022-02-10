import vuex from 'vuex';
import axios from 'axios';

const url = 'http://localhost:3001/api/'
const createStore = () => {
	return new vuex.Store({
		state: () => ({
			meetingRoom: { },
			meetingRooms: []
		}),
		mutations: {
			setMeetingRoom(state, room) {
				state.meetingRoom = room;
			},
			setMeetingRooms(state, rooms) {
				state.meetingRooms = rooms;
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
		},
		getters: {
			meetingRoom(state) {
				return state.meetingRoom;
			},
			meetingRooms(state) {
				return state.meetingRooms;
			}
		}
	})
}

export default createStore;