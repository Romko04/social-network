import profileReducer, { createActionAddPost, createActionChangePost, setProfileId, setUserStatus } from './profile-reducer';
let state = {
    postsList: [
        { likes: '5', message: 'Hello World' },
        { likes: '3', message: 'How are you' },
        { likes: '8', message: 'Hy' },
        { likes: '4', message: 'Hey Mister' }
    ],
    newPostText: '',
    profileId: null,
    status: ''
}
test('new post should be added', () => {
   let addPost = createActionAddPost()
  let NewState = profileReducer(state,addPost)
  expect(NewState.postsList.length).toBe(5)
});
test('newPostText should be changed', () => {
    let changePost = createActionChangePost('Hello')
   let NewState = profileReducer(state,changePost)
   expect(NewState.newPostText).toBe('Hello')
 });
 test('id should be set', () => {
    let setId = setProfileId(10)
   let NewState = profileReducer(state,setId)
   expect(NewState.profileId).toBe(10)
 });
 test('status should be set', () => {
    let setStatus = setUserStatus('hello')
   let NewState = profileReducer(state,setStatus)
   expect(NewState.status).toBe('hello')
 });
