function userInformationHTML(user) {
    return `
    <h2>${user.name}
        <span class='small-name'>
            (@<a href="${user.html_url}" target="_blank">${user.login}</a>)    
        </span>
    </h2>
    <div class="gh-content">
        <div class="gh-avatar">
            <a href="${user.html_url}" target="_blank">
                <img src="${user.avatar_url} width="80" height="80" alt="${user.login}">
            </a>
        </div>
        <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`
}
//the Github API returns an object with many key - value pairs. the html_url is a link to the user's profile
//the avatar_url is the user's profile picture, like an Xbox Avatar
//user.followers is a numerical count of the number of people the user is being followed by
//user.following is a numerical count of the number of people the user is following
//user.public_repos is a count of the number of public repositories the user has

function fetchGitHubInformation(event) {
    var username = $('#gh-username').val() //uses jQuery to grab the value of the username

    if (!username) { //checks to see if the input is empty, and if so, displays the h2 text
        $('#gh-user-data').html(`<h2>Please enter a Github username</h2>`)
        return
    }

    $('#gh-user-data').html( //inserts loading gif
        `<div id='loader>
            <img src='assets/css/loader.gif' alt="loading..."/>
            <p>loading</p>
        </div>`
    )//the gif is currently inoperative

    $.when( //a jQuery promise
        $.getJSON(`https://api.github.com/users/${username}`//this is the URL of the Github API
        ).then( //what happens when a promise is fulfilled
            function(response) {
                var userData = response;
                $('#gh-user-data').html(userInformationHTML(userData))
            }, 
            function(errorResponse) { //triggers if a error status code is returned
                if (errorResponse.status === 404) { //triggers if the status code is 404, page not found
                    $('#gh-user-data').html(`<h2>No information found for user ${username}</h2>`)
                }
                else {
                    console.log(errorResponse) //triggers if another error code is returned
                    $('#gh-user-data').html(
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`)
                }
            }
        )
    )
}

