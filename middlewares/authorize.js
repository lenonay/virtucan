export function authorize(req, res, next) {

    const URI = req.originalUrl

    // Si tiene sesion que continue
    if (req.session) {
        next();
        return
    }

    if(URI.includes("files")){
        res.status(401).send("Unauthorized");
        return;
    }

    // Si el metodo es get redirigimos
    if (req.method === "GET") {
        res.redirect("login");
        return;
    }

    // Cualquier otro le metemos un 401
    res.status(401).send("Unauthorized");
    return;
}