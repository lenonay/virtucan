export class LoginController {
    static async Login(req, res) {
        res.send(req.body);
    }
}