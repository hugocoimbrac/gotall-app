import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppLanguage, ExitSession, GotAllItem } from '../types';
const K={items:'@gotall/items',onboarding:'@gotall/onboarding',sessions:'@gotall/sessions',language:'@gotall/language'};
export const saveItems=(v:GotAllItem[])=>AsyncStorage.setItem(K.items,JSON.stringify(v));
export async function loadItems(){const r=await AsyncStorage.getItem(K.items);return r?JSON.parse(r) as GotAllItem[]:null}
export const saveOnboarding=(v:boolean)=>AsyncStorage.setItem(K.onboarding,v?'1':'0');
export async function loadOnboarding(){return await AsyncStorage.getItem(K.onboarding)==='1'}
export const saveSessions=(v:ExitSession[])=>AsyncStorage.setItem(K.sessions,JSON.stringify(v.slice(0,50)));
export async function loadSessions(){const r=await AsyncStorage.getItem(K.sessions);return r?JSON.parse(r) as ExitSession[]:[]}
export const saveLanguage=(v:AppLanguage)=>AsyncStorage.setItem(K.language,v);
export async function loadLanguage(){return await AsyncStorage.getItem(K.language) as AppLanguage|null}
