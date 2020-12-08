import { Server } from "miragejs";

const generateToken = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 50; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

export const onboardServer = new Server({

    seeds(server) {
        server.db.loadData({
            accounts: [
                {
                    firstName: "Abdulazeez",
                    lastName: "Abdulazeez",
                    email: "abdulazeeza180@gmail.com",
                    phoneNumber: "09013289338",
                    companyName: "Nova",
                    country: "Nigeria",
                    state: "lagos",
                    companyAddress: "ikoyi banana island",
                    password: "abdulazeez1",
                }
            ],
        })
    },

    routes() {
        this.timing = 3000

        //sign up
        this.post("/signup", (schema, request) => {

            const user = JSON.parse(request.requestBody);
            const userEmail = user.email
            const checkUser = schema.db.accounts.findBy({ email: userEmail });

            if (checkUser == null) {
                schema.db.accounts.insert(user)
                return {
                    status: "success",
                    email: userEmail,
                }
            } else {
                return {
                    status: "accountExist",
                    email: userEmail
                }
            }
        })

        // sign in
        this.post("/signin", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const email = user.email;
            const password = user.password;

            const checkUser = schema.db.accounts.findBy({ email: email });

            if (checkUser == null) {
                return {
                    status: "incorrectDetails",
                    token: null,
                }
            } else {
                if (checkUser.password === password) {
                    const token = generateToken();
                    schema.db.accounts.update(checkUser.id, { token: token })
                    const getToken = schema.db.accounts.findBy({ token: token })

                    return {
                        status: "success",
                        token: getToken.token,
                    }
                } else {
                    return {
                        status: "incorrectDetails",
                        token: null,
                    }
                }
            }
        })

        //verify email address 
        this.post("/verifyemail", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const email = user.email;
            const code = user.code;
            const checkUser = schema.db.accounts.findBy({ email: email });


            if (checkUser !== null && code == 11111) {
                return {
                    status: "success",
                    email: email
                }
            } else {
                return {
                    status: "incorrectCode",
                    email: email
                }
            }
        })

        // log out
        this.post("/logout", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const token = user.token;
            const checkUser = schema.db.accounts.findBy({ token: token });
            if (checkUser !== null) {
                schema.db.accounts.update(checkUser.id, { token: null })
                return {
                    token: null
                }
            }
        })
        // forgot password
        this.post("/forgotpassword", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const email = user.email;
            const checkUser = schema.db.accounts.findBy({ email: email });
            if (checkUser !== null) {

                return {
                    status: "success",
                    email: email
                }
            }
            else {
                return {
                    status: "noAccount",
                    email: email
                }
            }
        })
        // verify forgot password
        this.post("/verifyforgotpassword", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const email = user.email;
            const code = user.code;
            const checkUser = schema.db.accounts.findBy({ email: email });


            if (checkUser !== null && code == 11111) {
                return {
                    status: "success",
                    email: email
                }
            } else {
                return {
                    status: "incorrectCode",
                    email: email
                }
            }
        })
        // recover password
        this.post("/recoverpassword", (schema, request) => {
            const user = JSON.parse(request.requestBody);
            const email = user.email;
            const newPassword = user.newPassword;

            const checkUser = schema.db.accounts.findBy({ email: email });
            if (checkUser !== null) {
                schema.db.accounts.update(checkUser.id, { password: newPassword })
                return {
                    status: "success"
                }
            } else {
                return {
                    status: "failed"
                }
            }

        })
    }

})
