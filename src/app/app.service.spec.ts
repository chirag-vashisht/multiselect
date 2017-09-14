import { AppState } from './app.service';

describe(`AppState`, () => {
    let appState: AppState;
    beforeAll(() => {
        appState = new AppState();
    });
    it('Should have a property for state', () => {
        expect(appState.state).toBeDefined();
    });
    it('Should throw error if state is mutated', () => {
        expect(() => { appState.state = {}; })
            .toThrow(new Error('do not mutate the `.state` directly'));
    });
    it('Should set value of property in state', () => {
        appState.set('myProp', 'test');
        expect(appState.state.myProp).toEqual('test');
    });
    it('Should get value of property in state', () => {
        appState.set('myProp', 'test');
        const value = appState.get('myProp');
        expect(value).toEqual('test');
    });
    it('Should get state if it doesn\'t exist', () => {
        const value = appState.get('xyz');
        expect(value).toEqual(appState.state);
    });
});
