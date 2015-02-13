# yelp-express

# Install

    $ npm install


# Run

    $ node app.js

# View
    Available at http://localhost:3000/list/restaurants

# Resolving search issues
```
    git checkout -B mongo
    rm search.js
    git rm search.js
    git commit -m ‘temporarily remove search’
    git pull https://github.com/briannewsom/yelp-express master
    git add search.js
    git commit -m ‘Resolve conflict’
    git push origin mongo
```
