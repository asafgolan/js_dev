
## Setup

    npm install
    npm install -g bower
    cd /public
    bower install jquery backbone underscore bootstrap 

## Testing

    npm test

## Start app

    DEBUG=main bin/www

## Examples

1. Login:
<ul>
    <li>Go to localhost:9999</li>
    <li>Log in  with username (admin) and password (admin)</li>
</ul>
    
2. Create & List users:
    <ul>
        <li>Use client UI</li>
    </ul>
    
##Comments
<ul>
  <li>This task was done for everyplay-js-developer-assigment</li>
  <li>The backend ACL functionality is not fully understood</li>
  <li>Login and such was not required, however done to test the ACL when logging with different users</li>
</ul>

##Errors
  <ul>
  <li>ACL is not fully functional</li>
  <li>When logged in as an admin, passwords are passed to frontend</li>
  <li>When using UI to create users, only users created by admin will be allowed to log in</li>
  </ul>
