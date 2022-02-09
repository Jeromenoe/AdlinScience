import vuex from 'vuex';

const createStore = () => {
	return new vuex.Store({
		state: {
			meetingRoom: {
				id: 0,
				name: "room0"
			},
			meetingRooms: [
				{
					id: 0,
					name: "room0"
				},
				{
					id: 1,
					name: "room1"
				},
				{
					id: 2,
					name: "room2"
				},
				{
					id: 3,
					name: "room3"
				}
			]
		},
		mutations: {
			setMeetingRoom(state, room) {
				state.meetingRoom = room;
			}
		},
		actions: {
			// nuxtServerInit(vuexContext, context) {

			// },
			setMeetingRoom(vuexContext, room) {
				vuexContext.commit('setMeetingRoom', room);
			}
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