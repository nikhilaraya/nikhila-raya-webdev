(function () {

    angular
        .module("WamApp")
        .controller("loginController", loginController);

    function loginController($location, userService) {
        var model = this;

        model.login = login;

        function init() {

        }
        init();

        function login(user) {

            var promise = userService.findUserByUsernameAndPassword(user.username, user.password);
            promise
                .then(function (found) {
                    if(found !== null) {
                        $location.url("/user/"+found._id);

                    } else {
                        model.errorMessage = "User not found";
                    }
                });
        }
    }
})();