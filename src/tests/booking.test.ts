import request from 'supertest';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';

const baseURL = 'http://localhost:3001';

describe('Booking API Tests', () => {
    let bookingId: number;
    let token: string;

    beforeAll(async () => {
        // Get auth token and store for use as a cookie
        const authPayload = {
            username: 'admin',
            password: 'password123'
        };
        const res = await request(baseURL)
            .post('/auth')
            .set('Content-Type', 'application/json')
            .send(authPayload);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
        console.log('Auth token being used in tests:', token);
    });

    afterAll(async () => {
        // Clean up created booking if it exists
        if (bookingId) {
            const response = await request(baseURL)
                .delete(`/booking/${bookingId}`)
                .set('Cookie', `token=${token}`);
        }
    });

    test('POST /booking should create a new booking', async () => {
        const newBooking = {
            firstname: 'Nacho',
            lastname: 'Test',
            totalprice: 350,
            depositpaid: true,
            bookingdates: {
                checkin: '2025-10-01',
                checkout: '2025-11-01'
            },
            additionalneeds: 'Breakfast'
        };
        const response = await request(baseURL)
            .post('/booking')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', `token=${token}`)
            .send(newBooking);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('bookingid');
        bookingId = response.body.bookingid;
    });

    test('PUT /booking/:id should update the booking', async () => {
        const updatedBooking = {
            firstname: 'NachoUpdated',
            lastname: 'TestUpdated',
            totalprice: 400,
            depositpaid: false,
            bookingdates: {
                checkin: '2025-01-10',
                checkout: '2025-12-10'
            },
            additionalneeds: 'Lunch'
        };

        const response = await request(baseURL)
            .put(`/booking/${bookingId}`)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Cookie', `token=${token}`)
            .send(updatedBooking)

        expect(response.status).toBe(200);

        if (response.body.booking) {
            expect(response.body.booking).toMatchObject(updatedBooking);
        } else {
            expect(response.body).toMatchObject(updatedBooking);
        }
    });

    test('GET /booking should return all bookings', async () => {
        const response = await request(baseURL).get('/booking');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /booking/:id should return a booking by ID', async () => {
        const response = await request(baseURL)
        .get(`/booking/${bookingId}`)
        .set('Accept', 'application/json')        
        .set('Cookie', `token=${token}`)
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('firstname');
        expect(response.body).toHaveProperty('lastname');
        expect(response.body).toHaveProperty('totalprice');
        expect(response.body).toHaveProperty('depositpaid');
        expect(response.body).toHaveProperty('bookingdates');
    });

    test('DELETE /booking/:id should delete a booking by ID', async () => {
        const response = await request(baseURL)
            .delete(`/booking/${bookingId}`)
            .set('Cookie', `token=${token}`);
        expect([200, 201, 204]).toContain(response.status);
    });
});