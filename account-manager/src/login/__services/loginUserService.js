export const userService = {
    login/* ,
    logout,
    register */
};

function login(user,password){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "user" : user, "password" : password })
    };

    return fetch('/api/authentication/sing-in', requestOptions)
        .then(handleResponse)
        .then(responseData => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            //localStorage.setItem('user', JSON.stringify(user));
            //console.log("status");
            //console.log(status)
            //Unwrap response
            return responseData.response;
        });

}


function handleResponse(response) {
    return response.json().then(json => {
        const data = json ;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}