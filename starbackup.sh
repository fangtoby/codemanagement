#start mysql.server

mysql.server start

#backup database

cd /Users/toby/Documents/Developer/nodejs/learn/codemanagement
DT=`date "+%Y-%m-%d %H:%M:%S"`  
mysqldump -u root -proot --database codem > $DT".sql"

#login mysql

mysql -u root -proot
