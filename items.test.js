process.env.NODE_ENV = "test";
const app = require('./app');

const request = require('supertest');

const items = require('./fakeDb');

let itemObjects = ({name: 'popsicle', price: 1.45});

beforeEach(async function(){
    items.push(itemObjects)
})

afterEach(async function(){
    items.length = 0;
})

describe('GET /items', function(){
    test('show contents of array', async function(){
        const resp = await request(app).get('/items');
        expect(resp.body).toEqual([{name: 'popsicle', price: 1.45}])
    })
})

describe('POST /items', function(){
    test('add itesm', async function(){
        const resp = await request(app).post('/items')
        .send({name: 'cheese', price: 2.00});
        expect(resp.body).toEqual({added: {name: 'cheese', price: 2.00}});
        expect(items).toContainEqual({name: 'cheese', price: 2.00})
    })
})

test('PATCH /items/:name', async function(){
    const resp = await request(app).patch('/items/popsicle')
    .send({ name : 'new popsicle', price : 2.45});
    expect(resp.body).toEqual({updated: {name: 'new popsicle', price: 2.45}})
})



test('DELETE /items/:name', async function(){
    const resp = await request(app).delete('/items/cheerios');
    expect(resp.body).toEqual({message: 'Deleted'});
    expect(items).not.toContain("{name:'cheerios', price: 3.40}")
})

//describe("DELETE /items/:name", async function () {
    // test("Deletes a single a item", async function () {
    //     const response = await request(app)
    //       .delete(`/items/${item.name}`);
    //     expect(response.statusCode).toBe(200);
    //     expect(response.body).toEqual({ message: "Deleted" });
    //   });
    // });