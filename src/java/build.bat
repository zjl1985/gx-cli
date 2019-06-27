md release
call mvn clean install
cd  <%= dasherize(name) %>-ng\
yarn build
pause
