import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, takeEvery, takeLatest, delay, call, put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(action: LoginPayload) {
    yield delay(2000);
    console.log('login')
    localStorage.setItem('access_token', 'fake_token');
}

function* handleLogout() {
    yield delay(3000);
    console.log('logout')
    localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
    while(true) {
        console.log('watch login')
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));

        if(!isLoggedIn) {
            const action:PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload)
        }

        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow)
}