function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    let R = 6371;
    let dLat = deg2rad(lat2 - lat1);
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
        .then(function (response) {
            return response.text();
        }).then(function (text) {
        let users = JSON.parse(text);
        return getPostsAndProcessResults(users, combineUsersWithPosts);
    })
}

function getPostsAndProcessResults(users, combineUsersWithPostCallBack) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
        .then(function (response) {
            return response.text();
        }).then(function (text) {
        let posts = JSON.parse(text);
        let combine = combineUsersWithPostCallBack(users, posts);
        let usersWithPosts = printUserPostsAmount(combine);
        document.write(usersWithPosts + "<br>");
        let distanceBetweenUsers = printDistanceBetweenTwoUsers(users);
        document.write(distanceBetweenUsers + "<br>");
        let nonUniqueTitles = printNonUniqueTitles(findNonUniqueTitles(posts));
        document.write(nonUniqueTitles + "<br>");

    })
}

function combineUsersWithPosts(users, posts) {
    let result = [];
    for (let i = 0; i < users.length; i++) {
        result.push({
            "id": users[i]["id"],
            "name": users[i]["name"],
            "username": users[i]["username"],
            "email": users[i]["email"],
            "posts": posts.filter(post => post.userId === users[i]["id"])
        });
    }
    return result;
}

function printUserPostsAmount(data) {
    let output = "";
    for (let i = 0; i < data.length; i++) {
        let currentValue = data[i];
        output = output + (currentValue.name +
            " napisał(a) " + currentValue.posts.length + " postów.\n");
    }
    return output;
}

function printDistanceBetweenTwoUsers(users){
    let output = "";
    for(let i = 0; i < users.length; i++){
        let currentValue = findClosestPerson(users, users[i].id);
        output = output + ("Najbliższa osoba dla " + currentValue.username1 + " to "
            + currentValue.username2 + " w odległości " + currentValue.distance + " km.\n");
    }
    return output;
}

function printNonUniqueTitles(titles){
    let output = "Tytuły, którę się powtrzają to:\n";
    output += titles.join("\n");
    if(output === "Tytuły, którę się powtrzają to:\n"){
        output = "Brak tytułów, które się powtarzają.\n"
    }
    return output;
}

function printAll() {
    getUsers();
}

function getUserById(users, userId) {
    return users.filter(user => user.id === userId);
}

function findClosestPerson(users, userId) {
    let currentUser = getUserById(users, userId);
    if(currentUser === []){
        return null;
    }
    let shortestDistance = null;
    let closestPerson = null;
    for (let i = 0; i < users.length; i++) {
        if (userId !== users[i].id) {
            let currentDistance = getDistanceFromLatLonInKm(currentUser[0].address.geo.lat, currentUser[0].address.geo.lng,
                users[i].address.geo.lat, users[i].address.geo.lng);
            if (shortestDistance === null || currentDistance < shortestDistance) {
                shortestDistance = currentDistance;
                closestPerson = users[i];
            }
        }
    }
    if(closestPerson === null || shortestDistance === null){
        return null;
    }
    let closestPersonData = {
        "username1": currentUser[0].username,
        "username2": closestPerson.username,
        "distance": parseFloat(shortestDistance.toFixed(3))
        }
    return closestPersonData;
}

function findNonUniqueTitles(posts){

    let output = [];
    for(let i = 0; i < posts.length; i++) {
        let currentPost = posts[i];
        if(checkTitleUniqueness(posts, currentPost, output)){
            output.push(currentPost.title);
        }
    }
    return output;
}

function checkTitleUniqueness(posts, currentPost, output){
    for (let i = 0; i < posts.length; i++) {
        if(currentPost.title === posts[i].title && currentPost.id !== posts[i].id &&
            !output.includes(currentPost.title)) {
            return true;
        }
    }
    return false;
}

try {
    exports.combineUsersWithPosts = combineUsersWithPosts;
    exports.printUserPostsAmount = printUserPostsAmount;
    exports.printAll = printAll;
    exports.getDistanceFromLatLonInKm = getDistanceFromLatLonInKm;
    exports.getUserById = getUserById;
    exports.findClosestPerson = findClosestPerson;
    exports.printDistanceBetweenTwoUsers = printDistanceBetweenTwoUsers;
    exports.findNonUniqueTitles = findNonUniqueTitles;
    exports.printNonUniqueTitles = printNonUniqueTitles;
}
catch(e){}


