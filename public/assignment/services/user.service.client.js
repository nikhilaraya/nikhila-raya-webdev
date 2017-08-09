(function () {
    angular
        .module("WamApp")
        .factory("userService", userService);

    function userService($http) {

        var api = {
            "findUserByUsername": findUserByUsername,
            "findUserByUsernameAndPassword": findUserByUsernameAndPassword,
            "findUserById": findUserById,
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url,userId);
        }

        function updateUser(userId, user) {

            var url = "/api/user/" + userId;

            return $http.put(url, user);
        }

        function createUser(user) {
            var url = "/api/user";
            return $http.post(url, user);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }
        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByUsernameAndPassword(username, password) {

            var url = "/api/user?username="+username+"&password="+password;
            // /user?username=alice&password=alice

            return $http.get(url).then(function (response) {
                return response.data;
            });

        }

    }
})();