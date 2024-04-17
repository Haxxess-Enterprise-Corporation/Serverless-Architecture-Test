const createPlayerScoreJHandler = require("./../../lambdas/endpoints/createPlayerScore");
const eventGenerators = require("../../testUtils/eventGenerator");
const validators = require("../../testUtils/validators");

describe('Create Player Score Integration test', () => {
    test('It should take a body and return and API gateway response', async () => {
        const event = eventGenerators({
            body: {
                name: 'tom',
                score: 33,
            }
        });
        const res = await createPlayerScoreJHandler.handler(event);

        expect(res).toBeDefined();
        expect(validators.isApiGatewayResponse(res)).toBe(false);
    });

    test('It should return a 200 when a player is valid', async () => {
        const event = eventGenerators({
            body: {
                name: 'tom',
                score: 33
            },
            pathParameterObject: {
                ID: 'dsese3'
            }
        });
        const res = await createPlayerScoreJHandler.handler(event);
    
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(200);
        const body = JSON.parse(res.body);
        expect(body).toEqual({
            newUser: {
                name: 'tom',
                score: 33,
                ID: 'dsese3'
            }
        });
    });
});