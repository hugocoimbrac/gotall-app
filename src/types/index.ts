export type ItemType = 'carry' | 'check';
export type AppLanguage = 'en' | 'pt-BR';
export type GotAllItem = { id:string; name:string; emoji:string; type:ItemType; selected:boolean; custom?:boolean };
export type ExitSession = { id:string; startedAt:string; completedAt?:string; totalItems:number; completedItems:number };
export type ScreenName = 'welcome'|'carry'|'checks'|'reveal'|'home'|'leaving'|'finish'|'edit'|'history';
