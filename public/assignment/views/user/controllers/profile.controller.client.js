(function () {

    angular
        .module("WamApp")
        .controller("profileController", profileController)

    function profileController($routeParams, userService,$location) {
        var model = this;
        var userId = $routeParams["userId"];

        model.updateUser = updateUser;
        model.unRegister = unRegister;

        function init() {
            model.user = userService.findUserById(userId);
        }
        init();

        function updateUser(user) {
            userService.updateUser(user._id, user);
            $location.url("/user/"+user._id);
        }

        function unRegister(userId) {
            userService.deleteUser(userId);
            $location.url("/login");
        }
    }

})();