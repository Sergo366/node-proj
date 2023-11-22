import request from "supertest"
import {app} from "../../src";

describe("/courses", () => {
    beforeAll(async () => {
        await request(app).delete("/__test__/data")
    })

    it('should return 200 and empty array', async function () {
        await request(app)
            .get('/courses')
            .expect(200, [])
    });

    it('should return 404 for not existing course', async function () {
        await request(app)
            .get('/courses/999')
            .expect(404)
    });

    it('should\'nt create course with incorrect input data', async () =>  {
        await request(app)
            .post("/courses")
            .send('')
            .expect(400)

        await request(app)
            .get('/courses')
            .expect(200, [])
    });

    let createdCourse: any = null;

    it('should create course with correct input data', async () =>  {
        const response = await request(app)
            .post("/courses")
            .send({title: "devops"})
            .expect(200)

        createdCourse = response.body;

        expect(createdCourse).toEqual({
            id: expect.any(Number),
            title: "devops"
        })

        await request(app)
            .get('/courses')
            .expect(200, [createdCourse])
    });

    it('should"nt update course with incorrect input data', async () =>  {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({title: ""})
            .expect(400)

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(200, createdCourse)
    });

    it('should"nt update course that not exist', async () =>  {
        await request(app)
            .put(`/courses/-100`)
            .send({title: "Java"})
            .expect(404)
    });

    it('should update course with correct input model', async () =>  {
        await request(app)
            .put(`/courses/${createdCourse.id}`)
            .send({title: "Node JS"})
            .expect(204)

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(200, {... createdCourse, title: "Node JS"})
    });

    it('should delete course', async () =>  {
        await request(app)
            .delete(`/courses/${createdCourse.id}`)
            .expect(204)

        await request(app)
            .get(`/courses/${createdCourse.id}`)
            .expect(404)

        await request(app)
            .get(`/courses`)
            .expect(200, [])
    });
})