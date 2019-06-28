mkdir release
mvn clean install
cd <%= dasherize(name) %>-ng\
yarn
yarn build

