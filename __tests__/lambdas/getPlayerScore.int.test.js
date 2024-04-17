const getPlayerScoreHandle = require("./../../lambdas/endpoints/getPlayerScore");
const eventGenerators = require("../../testUtils/eventGenerator");
const validators = require("../../testUtils/validators");
const Dynamo = require("../../lambdas/common/Dynamo");

const validTableName = 'player-points-table';

describe('Get Player Score Integration test', () => {
    test('It should take a ID and return and API gateway response', async () => {
        const event = eventGenerators({
            pathParameterObject: {
                ID: 33,
            }
        });
        const res = await getPlayerScoreHandle.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(false);
    });

    test('It should return a 400 when a player ID is invalid', async () => {
        const event = eventGenerators({});
        const res = await getPlayerScoreHandle.handler(event);
    
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(400);
    });

    test('It should return 200 when player data is valid', async () => {
        const validTableName = 'player-points-table';
        const data = {
            ID: '123',
            score: 22,
            name: 'David'
        };
        
        await Dynamo.write(data, validTableName);

        const event = eventGenerators({
            pathParameterObject: {
                ID: '123',
            }
        });

        const res = await getPlayerScoreHandle.handler(event);

        expect(res).toBeDefined();
        expect(res.statusCode).toBe(200);
    });
});