# Output

![Screen Recording 2023-02-23 at 9 02 11 PM](https://user-images.githubusercontent.com/96381221/220900587-1a87819e-04c6-4b55-8975-408115fa6a57.gif)

```
docker run -p 3306:3306 --name cs15 -e MYSQL_ROOT_PASSWORD='root' -d mysql

docker exec -it cs15 mysql -u root -p

// mysql

grant all privileges on *.* to 'root'@'%';

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```
