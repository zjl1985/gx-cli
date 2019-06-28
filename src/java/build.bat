md release
call mvn clean install
cd  <%= dasherize(name) %>-ng\
yarn
yarn build
pause
