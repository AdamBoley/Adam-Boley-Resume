function sendMail(contactForm) {
    //discussuin - I'm supposing that when the form is submitted, an object is created. This is the contactForm variable
    //This object's keys seem to be the attribute values of the name attributes of each of the input and textarea elements
    //the corresponding keys of this value may be accessed with .value
    //This is why name attributes are important
    emailjs.send('Gmail', 'template_qyu38io', {//these keys must be the same as the parameter names in the emailJS template
        'from_name': contactForm.name.value, //accesses the sender's name from the contactForm object, it is the attribute value of the name attribute
        'from_email': contactForm.emailaddress.value, //accesses the email address of the sender, the value of the name attribute
        'message': contactForm.message.value //accesses the message 
    })
    .then(
        function(response) {
            console.log(`Email successfully sent, status code: ${response.status}, text: ${response.text}`)
        },
        function(error) {
            console.log(`Email not sent, status code: ${error.status}, text: ${error.text}`)
        }
    ) 
    //Gmail is the service established in emailJS
    //template_qyu38io is the template name being used to send emails
    //The object contains the parameters - the sender's email address, name and message
    return false
}