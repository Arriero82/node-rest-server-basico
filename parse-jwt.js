function parseJwt (token){
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_','/')
    return JSON.parse(window.atob(base64))
}

parseJwt('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NUFCQ0QwIiwibmFtZSI6IkdhYm8gQnVsbHVpZCIsImlhdCI6OTk5OTk5OTk5OTk5fQ.pGSMopLZEdOU120f3vbKNV3Wysfwl7Wmh3xyiSifxis')
;
//copiar y pegar todo en consola de navegador, token salido de jwt.io