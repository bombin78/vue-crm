import firebase from 'firebase/app'

export default {
  actions: {
    async createRecord ({dispatch, commit}, record) {
      try {
        const uid = await dispatch('getUid');
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch(e) {
        commit('setError', e);
        throw e;
      }
    },
    async fetchRecords ({dispatch, commit}) {
      try {
        const uid = await dispatch('getUid');
        const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
        return Object.keys(records).map(key => ({
          id: key,
          ...records[key],
        }));
      } catch(e) {
        commit('setError', e);
        throw e;
      }
    },
    // Закомментировано как вариант запроса для создания нормальной пагинации
    // вместо кривой которая была добавлена в 17м уроке
    // async fetchRecordsRange ({dispatch, commit}, page=1, limit=2) {
    //   try {
    //     const uid = await dispatch('getUid');
    //     const records = (await firebase.database().ref(`/users/${uid}/records`).startAt(page).limitToFirst(limit).once('value')).val() || {};
    //     return Object.keys(records).map(key => ({
    //       id: key,
    //       ...records[key],
    //     }));
    //   } catch(e) {
    //     commit('setError', e);
    //     throw e;
    //   }
    // },
    async fetchRecordById ({dispatch, commit}, id) {
      try {
        const uid = await dispatch('getUid');
        const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {};
        return {id, ...record};
      } catch(e) {
        commit('setError', e);
        throw e;
      }
    }
  }
}
