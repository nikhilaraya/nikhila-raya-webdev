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
            var _user = userService.findUserByUsername(user.username);
            if(!_user) {
                var user = userService.createUser(user);
                $location.url("/user/"+user._id);
            } else {
                model.error = "User already exists";
            }
        }
    }
})();