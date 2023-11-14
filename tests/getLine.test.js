import {expect} from 'chai';
import { getLineContent } from '../src/services/readFileService.js';

describe('Get line', () => {
    it('Index 1', (done) => {
        expect(getLineContent(1)).to.be.equal('8PvwGfVOEDHmYmGlZ3jvDaILfahxYBlQ8rVnntaD!T6?DplN35WyyI!Yu1vIiIK9BUl .tKjDnz62X,?rB7u?iseXpwzOSei Xr,5f0tYSWLE7cx2aJczpFjiRTRanyk2jxQrTu?rBaOboYRwRc9N2Y39gPAhupoQUL3JwKfMS rl?ta!1uHee3T5L!TfNjKMR42LMMQy3usW1AyyLBNgsZ dOBXv1X86OP3XyXhhN1 F7TW6a6oGZEiCzm4VSsI 7OgD8NBKE42dxdt4dX1Od.RZlB70PvMu.u7o99FVup1us1AKe.2kBKu982LfrVmG?rO mpMD4VvEXsX6?8uJSTBAn05C lNWTepGdB.ap9ECkTW4T5hk6qRDg4V8KyW?Z,sLKGsOi4q26QBTm');
        done();
    });

    it('Index 100', (done) => {
        expect(getLineContent(100)).to.be.equal('29g51WJnri4cXS5aQXN3TQSK8qn');
        done();
    });

    it('Index 101', (done) => {
        expect(getLineContent(101)).to.be.equal('9LSrfXI7d2FmL2O,,0PrZJ');
        done();
    });

    it('Index 134055', (done) => {
        expect(getLineContent(134055)).to.be.equal('z0Dr');
        done();
    });

    it('Index 200574', (done) => {
        expect(getLineContent(200574)).to.be.equal('VsMZ');
        done();
    });
    
    it('Index 36088', (done) => {
        expect(getLineContent(36088)).to.be.equal('');
        done();
    });

    it('Index 500000', (done) => {
        expect(getLineContent(500000)).to.be.equal('Gz');
        done();
    });

    it('Index 500001', (done) => {
        expect(getLineContent(500001)).to.be.equal('l f3YIx4dT.4TYp5eGDeadz5kxxQ0z9D7rvzvJchLfvNwEJJfZKDZsT.JnXTmbsOpQmM0,r?g0TPtVIjUYCs.hjehSL 3R');
        done();
    });

    it('Index 502599', (done) => {
        expect(getLineContent(502599)).to.be.equal('pCEvY4aRx.2,eQwSZ8BAontH');
        done();
    });

    it('Index 538686', (done) => {
        expect(getLineContent(538686)).to.be.equal('4TPsUpM7HFl5I7?EB6QjF.vur6FTCmCbuAvdJ!,cAgQDFC8HCXjeir5UbromoknHBCpLygwGfOnhZQfKR5IJtcj9?3P7H.k0eeYN7iW38vNCovp9NwA7kL846fty7 15e5?nTpkPAvHGg K!XvizZORKg85BUOEJKqilUYMdBkF,wEwtxurHQAck V.5JGrNZ?WTD.QwdDrTfF');
        done();
    });

    it('Index 538687', (done) => {
        expect(getLineContent(538687)).to.be.equal(null);
        done();
    });

    it('Index 600000', (done) => {
        expect(getLineContent(600000)).to.be.equal(null);
        done();
    });
});