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

function repoInformationHTML(repos) {
    //repo data is returned as an array, so standard array indexing will work
    //the array is an array of repo names
    //repos is the repoData parameter passed in by the function call
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">This user has no public repositories</div>`
    }

    var listItemsHTML = repos.map(function(repo) {//the map method works like a forEach , but instead returns an array
        return `
        <li>
            <a href="${repo.html_url} target="_blank"">${repo.name}</a>
        </li>`
        //repo here is the singular variable of the repos parameter
    })

    return `
    <div class="clearfix repo-list">
        <p><strong>Repository list </strong></p>
        <ul>
            ${listItemsHTML.join('\n')}
        </ul>
    </div>`
    //uses the join method with a new line command to create a list of repositories of that user
    //This is a way of dynamically inserting list items
}


function fetchGitHubInformation(event) {
    $('#gh-user-data').html('') //sets user data to an empty string, so that user profile data does not linger when the input box is empty
    $('#gh-repo-data').html('') //the same as above

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
        $.getJSON(`https://api.github.com/users/${username}`),//this is the URL of the Github API, which is a list of users
        $.getJSON(`https://api.github.com/users/${username}/repos`) //this is a list of a selected user's repositories
        ).then( //what happens when a promise is fulfilled
            function(firstResponse, secondResponse) {
                var userData = firstResponse[0]; 
                var repoData = secondResponse[0]
                //array indexing is necessary here because when two calls are made, the when() method packs up the 
                //responses into arrays. Each response is the first element of the arrays
                $('#gh-user-data').html(userInformationHTML(userData)) //function to be called in response to the first call
                $('#gh-repo-data').html(repoInformationHTML(repoData)) //function to be called in response to the second call
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
}

$(document).ready(fetchGitHubInformation); //executes fetchGitHubInformation function when the DOM is fully loaded
//Uses the default value of Octocat, which is GitHub's profile, so that a user is loaded immediately

