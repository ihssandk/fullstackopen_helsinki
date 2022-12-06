sequenceDiagram
    browser->>+server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
    note over server: server asks browser to do new HTTP GET to header's Location - the address notes
    server-->>+browser: URL Redirect = HTTP status code 302
    browser->>+server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server-->>+browser: HTML-code
    browser->>+server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>+browser: main.css
    browser->>+server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>+browser: main.js
    note over browser:browser starts executing js-code that requests JSON data from server 
    browser->>+server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>+browser: [{ content: "new note", date: "2022-06-12" }, ...]
    note over browser: browser executes event handler = renders notes  wth new addition to display