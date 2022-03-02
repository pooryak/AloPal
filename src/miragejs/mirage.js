// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' } = {}) {
    const server = createServer({
        environment,

        models: {
            movie: Model,
        },

        // eslint-disable-next-line no-shadow
        seeds(server) {
            server.create('movie', { name: 'Inception', year: 2010 });
            server.create('movie', { name: 'Interstellar', year: 2014 });
            server.create('movie', { name: 'Dunkirk', year: 2017 });
        },

        routes() {
            // this.namespace = '/';
            this.post('/base/services', (schema, request) => {
                const attrs = JSON.parse(request.requestBody);
                return {
                    service: {
                        title: attrs.lang === 'en' ? 'psychotherapy.title' : 'سایکوتراپی',
                        description: attrs.lang === 'en' ? 'physcotherapy.description' : 'دسکریپشن',
                    },
                };
            });
            this.post('/allUsers', () => ({
                people: [
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 1,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 2,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 3,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 4,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 5,
                        serviceProfileId: 1,
                    },

                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 6,
                        serviceProfileId: 1,
                    }, {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 7,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 8,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 9,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 10,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 11,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 12,
                        serviceProfileId: 1,
                    },
                    {
                        name: 'Asghar',
                        family: 'Maleki',
                        speciality: 'Psychiatrist',
                        description: 'Lorem ipsum dolor sit amet, tempor incididunt ut labore et.',
                        price: '$40.0',
                        duration: '50 Minutes',
                        star: 3,
                        pic: '/assets/image/avatar4.55833b54.svg',
                        id: 13,
                        serviceProfileId: 1,
                    },

                ],
            }));
            this.passthrough('http://80.241.214.236:8080/api/login/plain', '/_next/static/development/_devPagesManifest.json',
                'http://80.241.214.236:8080/api/profile/base/current',
                'http://80.241.214.236:8080/api/contactus/post',
                'http://80.241.214.236:8080/api/profile/service/time/get/available',
                'http://80.241.214.236:8080/api/meeting/list/active',
                'http://80.241.214.236:8080/api/meeting/type/list',
                'http://80.241.214.236:8080/api/user/all',
                'http://80.241.214.236:8080/api/profile/base/one',
                '/public/**',
                '/pages/**');
        },
    });

    return server;
}
