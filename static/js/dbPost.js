function login(name, password) {
    $.ajax({
        url: "/db",
        data: { 
            "query": "SELECT id FROM users WHERE name = ? AND password = ?", 
            "parameters": [name, password]
        },
        timeout: 0,
        cache: false,
        type: "POST",
        success: function(response) {
        response = response[0];

        if (response) {
            let userID = response["id"];
            let expirationDays;

            if (document.getElementById("flexCheckDefault").checked)
                expirationDays = 28;
            else
                expirationDays = 1;

            setCookie("userID", userID, expirationDays);
            location.href = "home";
        }
        else {
            document.getElementById("errorText").innerText = "Неверные данные";
        }
        },
        error: function(xhr) { }
    });
}

function signup(name, password) {
    $.ajax({
        url: "/db",
        data: { 
            "query": "SELECT id FROM users WHERE name = ?", 
            "parameters": [name, password]
        },
        timeout: 0,
        cache: false,
        type: "POST",
        success: function(response) {
            response = response[0];
            if (response) {
                document.getElementById("errorText").innerText = "Это имя занято";
                return;
            }
            
            $.ajax({
                url: "/db",
                data: { 
                    "query": "INSERT INTO users (name, password) VALUES (?, ?)", 
                    "parameters": [name, password]
                },
                cache: false,
                type: "POST",
                success: function(response) {
                    login(name, password);
                },
                error: function(xhr) { }
            });
        },
        error: function(xhr) { }
    });
}
