import { App } from '../../src/app';

describe('the App module', () => {
 
    it('not to be null', () => {
        expect(App).toBeDefined();
    });
    
    it('uses should', () => {
        expect(App.should.exist);
    });

});


