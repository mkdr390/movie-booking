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