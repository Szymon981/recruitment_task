const utils = require("../src/utils");


describe("Combining users data with posts data", () => {
    test("it should return users data combined with suiting them by id posts", () => {

        const posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "title 1",
                "body": "body 1"
            },
            {
                "userId": 2,
                "id": 2,
                "title": "title 2",
                "body": "body 2"
            },
            {
                "userId": 1,
                "id": 3,
                "title": "title 3",
                "body": "body 3"
            }
        ];

        const users = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "address": {
                    "street": "Kulas Light",
                    "suite": "Apt. 556",
                    "city": "Gwenborough",
                    "zipcode": "92998-3874",
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
                "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
                "address": {
                    "street": "Victor Plains",
                    "suite": "Suite 879",
                    "city": "Wisokyburgh",
                    "zipcode": "90566-7771",
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                },
                "phone": "010-692-6593 x09125",
                "website": "anastasia.net",
                "company": {
                    "name": "Deckow-Crist",
                    "catchPhrase": "Proactive didactic contingency",
                    "bs": "synergize scalable supply-chains"
                }
            }
        ];

        const expectedOutput = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "posts": [
                    {
                        "userId": 1,
                        "id": 1,
                        "title": "title 1",
                        "body": "body 1"
                    },
                    {
                        "userId": 1,
                        "id": 3,
                        "title": "title 3",
                        "body": "body 3"
                    }
                ]
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",
                "posts": [
                    {
                        "userId": 2,
                        "id": 2,
                        "title": "title 2",
                        "body": "body 2"
                    }
                ]
            }
        ];

        expect(utils.combineUsersWithPosts(users, posts)).toEqual(expectedOutput);

    });
});

describe("Printing user post amount", () => {
    test("it should return proper string", () => {

        const input = [
            {
                "name": "Michał",
                "posts": [{"id": 1},
                    {"id": 2}]
            },
            {
                "name": "Kamil",
                "posts": [{"id": 3}]
            }
        ];

        const expectedOutput = "Michał napisał(a) 2 postów.\nKamil napisał(a) 1 postów.\n";

        expect(utils.printUserPostsAmount(input)).toEqual(expectedOutput);

    });
});

describe("Calculating distance", () => {
    let cordDebica = [50.02731292316256, 21.382578285909023];
    test("it should return distance between points from the same country", () => {

        let cordKrakow = [50.08393270422372, 19.920952373656796];
        let expectedDistance = 105;
        let countedDistance = utils.getDistanceFromLatLonInKm(cordDebica[0], cordDebica[1], cordKrakow[0], cordKrakow[1]);
        let roundedDistance = Math.round(countedDistance);

        expect(roundedDistance).toEqual(expectedDistance);

    });

    test("it should return distance between different continents", () => {

        let cordBrazil = [-23.647132574685752, -46.60311925777606];
        let expectedDistance = 10561;
        let countedDistance = utils.getDistanceFromLatLonInKm(cordDebica[0], cordDebica[1], cordBrazil[0], cordBrazil[1]);
        let roundedDistance = Math.round(countedDistance);

        expect(roundedDistance).toEqual(expectedDistance);

    });

    test("it should return distance between the same points", () => {

        let expectedDistance = 0;
        let countedDistance = utils.getDistanceFromLatLonInKm(cordDebica[0], cordDebica[1], cordDebica[0], cordDebica[1]);
        let roundedDistance = Math.round(countedDistance);

        expect(roundedDistance).toEqual(expectedDistance);

    });

    test("it should return distance between the two close points", () => {

        let cordNearby = [50.0308771906027, 21.386873583653756];
        let expectedDistance = 0.501;
        let countedDistance = utils.getDistanceFromLatLonInKm(cordDebica[0], cordDebica[1], cordNearby[0], cordNearby[1]);
        let roundedDistance = parseFloat(countedDistance.toFixed(3));

        expect(roundedDistance).toEqual(expectedDistance);

    });

});

describe("Finding user", () => {
    test("it should return user, which id is given as an argument", () => {

        const users = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",

            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",

            }
        ];

        const expectedOutput = [
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "email": "Shanna@melissa.tv",

            }
        ];

        expect(utils.getUserById(users, 2)).toEqual(expectedOutput);

    });
});

describe("Searching for closest user", () => {
    test("it should return user, which is closest to the given one, test on array with 3 users", () => {

        const users = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "address": {
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                },
            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "address": {
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                }

            },
            {
                "id": 3,
                "name": "Clementine Bauch",
                "username": "Samantha",
                "address": {
                    "geo": {
                        "lat": "-68.6102",
                        "lng": "-47.0653"
                    }
                }
            }
        ];

        const expectedOutput = {
            "username1": "Bret",
            "username2": "Samantha",
            "distance": 7489.528
        };


        expect(utils.findClosestPerson(users, 1)).toEqual(expectedOutput);

    });

    test("it should return null, because there is only one given user", () => {

        const users = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "address": {
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                }
            }
        ];

        const expectedOutput = null;

        expect(utils.findClosestPerson(users, 1)).toEqual(expectedOutput);

    });

    test("it should return null, because there are no given users", () => {

        const users = [];

        const expectedOutput = null;

        expect(utils.findClosestPerson(users, 1)).toEqual(expectedOutput);

    });
});


describe("Printing names of user, closest user and distance between them", () => {
    test("it should return proper string", () => {

        const users = [
            {
                "id": 1,
                "name": "Leanne Graham",
                "username": "Bret",
                "address": {
                    "geo": {
                        "lat": "-37.3159",
                        "lng": "81.1496"
                    }
                }

            },
            {
                "id": 2,
                "name": "Ervin Howell",
                "username": "Antonette",
                "address": {
                    "geo": {
                        "lat": "-43.9509",
                        "lng": "-34.4618"
                    }
                }
            }
        ];

        const expectedOutput = "Najbliższa osoba dla Bret to Antonette w odległości 8898.279 km.\n" +
            "Najbliższa osoba dla Antonette to Bret w odległości 8898.279 km.\n";

        expect(utils.printDistanceBetweenTwoUsers(users)).toEqual(expectedOutput);

    });
});

describe("Finding non unique titles", () => {
    test("given an array of posts, it should return array, with titles which are non unique - 4 posts, 2 same titles", () => {

        const posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            },
            {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
            },
            {
                "userId": 1,
                "id": 3,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            },
            {
                "userId": 5,
                "id": 4,
                "title": "qui est esse",
            }
        ];

        const expectedOutput = [
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "qui est esse"
        ];

        expect(utils.findNonUniqueTitles(posts)).toEqual(expectedOutput);

    });

    test("given an array of posts, it should return array, with titles which are none unique -" +
        "4 posts, 4 same titles", () => {

        const posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "qui est esse",
            },
            {
                "userId": 1,
                "id": 2,
                "title": "qui est esse",
            },
            {
                "userId": 1,
                "id": 3,
                "title": "qui est esse",
            },
            {
                "userId": 5,
                "id": 4,
                "title": "qui est esse",
            }
        ];

        const expectedOutput = [
            "qui est esse"
        ];

        expect(utils.findNonUniqueTitles(posts)).toEqual(expectedOutput);

    });

    test("given an array of posts, it should return array, with titles which are none unique -" +
        "empty array as argument", () => {


        const posts = [];

        const expectedOutput = [];


        expect(utils.findNonUniqueTitles(posts)).toEqual(expectedOutput);

    });

    test("given an array of posts, it should return array, with titles which are none unique -" +
        "1 post as an argument", () => {

        const posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "qui est esse",
            }
        ];

        const expectedOutput = [];


        expect(utils.findNonUniqueTitles(posts)).toEqual(expectedOutput);

    });

    test("given an array of posts, it should return array, with titles which are none unique -" +
        "3 post, 3 different titles", () => {

        const posts = [
            {
                "userId": 1,
                "id": 1,
                "title": "qui est esse",
            },
            {
                "userId": 1,
                "id": 2,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            },
            {
                "userId": 1,
                "id": 3,
                "title": "quo et expedita modi cum officia vel magni",
            }
        ];

        const expectedOutput = [];


        expect(utils.findNonUniqueTitles(posts)).toEqual(expectedOutput);

    });

});

describe("Printing non unique titles", () => {
    test("given array of non unique titles, it should return string, with titles, which are non unique", () => {

        const titles = [
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "qui est esse"
        ];

        const expectedOutput = "Tytuły, którę się powtrzają to:\n" +
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit\n" +
            "qui est esse";

        expect(utils.printNonUniqueTitles(titles)).toEqual(expectedOutput);

    });

    test("given empty array, it should return string, which says there are no non unique titles", () => {

        const titles = [];

        const expectedOutput = "Brak tytułów, które się powtarzają.\n";

        expect(utils.printNonUniqueTitles(titles)).toEqual(expectedOutput);

    });

});




