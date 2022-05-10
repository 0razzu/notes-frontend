import {SET_LOCALE} from './actionTypes'


const setLocale = localeCode => ({
    type: SET_LOCALE,
    payload: localeCode,
})


export {setLocale}
