(function () {
    angular
        .module("WamApp")
        .controller("registerController", registerController);

    function registerController(userService, $location) {
        var model = this;

        model.createUser = createUser;

        function init() {

        }
        init();

        function createUser(user) {

            if(user.username === null || user.username === ''||typeof user.username === 'undefined'){
                model.error ='username is required';
                return;
            }
            if(user.password!== user.password2 || user.password === null || typeof user.password === 'undefined'){
                model.error = "passwords must match";
                return;
            }
            userService
                .findUserByUsername(user.username)
                .then(function () {
                    model.error = "sorry,that username is taken";
                },
                function () {
                    var newUser ={
                        username: user.username,
                        password: user.password
                };
                    return userService
                        .createUser(newUser);
                })
                .then(function (response) {
                    _user = response.data;
                    $location.url("/user/" + _user._id);
                });
        }
    }
})();