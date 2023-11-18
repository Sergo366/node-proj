import request from "supertest"
import {app} from "../../src";

describe("/courses", () => {
    it('should return 200 and empty array', async function () {
        await request(app)
            .get('/courses')
            .expect(200, [])
    });
})