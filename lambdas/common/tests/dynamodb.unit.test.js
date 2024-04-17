const Dynamo = require("../Dynamo");

test('Dynamo is a object', () => {
    expect(typeof Dynamo).toBe('object')
});

test('dynamo has the get and write function', () => {
    expect(typeof Dynamo.get).toBe('function');
    expect(typeof Dynamo.write).toBe('function');
});

const validTableName = 'player-points-table';
const data = {
    ID: '123',
    score: 22,
    name: 'David'
}

test('Dynamo write works', async () => {
    // this expect there to be at least one assertions by the end of the function
    // its neccessary because there is a promise here, and we need our test to be able to observe abd wait for the promise to be resolved
    expect.assertions(1);
    try {
        const res = await Dynamo.write(data, validTableName);

        expect(res).toBe(data);
    } catch (error) {
        console.log(error)
    }
});

test('Dynamo gets works', async () => {
    expect.assertions(1);
    try {
        const res = await Dynamo.get(data.ID, validTableName);
        expect(res).toEqual(data)
    } catch (error) {
        console.log(error)
    }
});
