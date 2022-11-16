import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, delay, call, put } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import { push } from 'connected-react-router';

function* handleLogin(action: LoginPayload) {
    yield delay(1000);
    localStorage.setItem('access_token', 'fake_token');

    yield put(authActions.loginSuccess({id: 1, name: 'user' }))
    yield put(push('/admin'));
}

function* handleLogout() {
    yield delay(1000);
    localStorage.removeItem('access_token');
    yield put(push('/login'));
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