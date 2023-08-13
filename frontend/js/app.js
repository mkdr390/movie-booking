class ApiClient {
    constructor() {
        ['get', 'post', 'delete', 'put'].forEach(requestMethod => {
            this[requestMethod] = (endpoint, options) => new Promise((resolve, reject) => {
                const config = {
                    url: endpoint,
                    baseURL: 'http://localhost:4000/api',
                    method: requestMethod,
                    data: options.data || {},
                    params: options.params || {},
                    headers: {
                        authorization: 'Bearer ' + options.token || '',
                        ...(options.headers || {})
                    }
                };

                axios(config)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                })
            })
        })
    }
}

// Using this api machine, we can call all the APIs
const apiMachine = new ApiClient();

function onLogoutClick() {
    localStorage.setItem('user-token', '');
    window.location = 'ViewerLogin.html';
}

function renderLoginHolder(user) {
    const loginHolder = document.getElementById("login-holder");

    if (loginHolder) {

        if (user) {
            const profileHolder = document.createElement('div');
            profileHolder.innerHTML = "Hi, " + user.fullName;
    
            const logoutButton = document.createElement('button');
            logoutButton.innerHTML = 'Logout'
            logoutButton.onclick = onLogoutClick;
    
            loginHolder.appendChild(profileHolder);
            loginHolder.appendChild(logoutButton);
        } else {
            const loginAnchor = document.createElement("a");
            loginAnchor.href = 'ViewerLogin.html';
            loginAnchor.innerHTML = 'Login';
            loginAnchor.classList.add('login-link');
    
            loginHolder.appendChild(loginAnchor);
        }
    }

}



function verifyLoginToken() {
    const userToken = localStorage.getItem('user-token');

    if (userToken) {
        apiMachine
        .get('/user/verify', {
            token: userToken
        })
        .then((res) => {
            renderLoginHolder(res);
        }).catch(() => {})
    } else {
        renderLoginHolder();

        return Promise.resolve();
    }
}


verifyLoginToken();

function createAFilm(filmDetails) {
    return apiMachine.post('/film/create', {
        data: filmDetails
    })
}

function getAllFilms() {
    return apiMachine.get('/film/all', {});
}

function getTheaterToken() {
    return localStorage.getItem('theater-token') || '';
}

function getATheater() {
    return apiMachine.get('/theater/verify', {
        token: getTheaterToken()
    })
}

function addAMovieToTheater(movieId) {
    return apiMachine.put('/theater/update', {
        data: {
            filmId: movieId,
        },
        token: getTheaterToken()
    })
}

function getTheatersWithFilm(filmId) {
    return apiMachine.get('/theater/some', {
        params: {
            id: filmId
        }
    })
}

function bookAMovieNow(details) {
    const userToken = localStorage.getItem('user-token') || '';

    return apiMachine.post('/ticket/book', {
        data: details,
        token: userToken
    })
}


function updatePayment(ticketId) {
    return apiMachine.put('/ticket/update', {
        data: {
            ticketId
        }
    })
}

function getTicketDetails(ticketId) {
    return apiMachine.get('/ticket/details', {
        params: {
            id: ticketId
        }
    })
}

function getQueryParams(key) {
    const urlParams = new URLSearchParams(window.location.search);
    
    return urlParams.get(key);
}
