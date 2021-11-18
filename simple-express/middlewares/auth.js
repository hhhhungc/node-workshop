// 中間件就是個函式，寫好再放在你需要使用的地方
module.exports = {
    loginCheckMiddleware: function (req, res, next) {
        // 要登入後才可以看
        if (!req.session.member) {
            // session 裡面有沒有 member (有=登入)
            return next({
                message: "要登入才可以看唷",
                status: 401,
            });
        } else {
            // 如果session裡面有member
            // 已經登入過
            next();
        }
    },

    // 授權
    isAdminMiddleware: function (req, res, next) {
        if (!req.session.member.idAdmin) {
            return next({
                message: "你沒有管理員權限唷",
                status: 403,
            });
        } else {
            next();
        }
    },
};

//return module.exports
