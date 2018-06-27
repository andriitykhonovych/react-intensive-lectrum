import { sum, delay, getUniqueID, getFullApiUrl } from './index';


describe('sum function', () => {
    test('should be a function', () => {
        expect(typeof sum).toBe('function');
    });

    test('should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('should add two numbers', () => {
        const a = 1;
        const b = 3;
        const result = a + b;

        expect(sum(a, b)).toBe(result);
    });

    test('should throw if first arg is not a number', () => {
        const result = () => sum('str', 2);

        expect(result).toThrow();
    });

    test('should throw if second arg is not a number', () => {
        const result = () => sum(2, 'str');

        expect(result).toThrow();
    });

    describe('delay function:', () => {
        test('should resolve a promise', () => {
            return expect(delay(2000)).resolves.toBe('success');
        });

        test('should resolve a promise of 1000ms as default parameter', async () => {
            await expect(delay()).resolves.toBe('success');
        });
    });

    describe('getUniqueID function:', () => {
        test('should not be a number', () => {
            const result = () => getUniqueID('str');

            expect(result).toThrow();
        });

        test('should be length = 15 symbols', () => {
            const lenghtId = getUniqueID();

            expect(lenghtId.length).toBe(15);
        });
    });

    describe('getFullApiUrl function:', () => {
        test('should not be a number', () => {
            const result = () => getFullApiUrl('str');

            expect(result).toThrow();
        });

        test('should be a string', () => {

            expect(getFullApiUrl('api', 'group_id')).toBe('api/group_id');
        });
    });
});
