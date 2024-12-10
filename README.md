# README.md

IMPORTANT: Once you've cloned this to your forked repository, ensure that you continuously update this document as you complete each task to demonstrate your ongoing progress.

Please include your shared repository link here:

Example:
Choiru's shared repository: https://github.com/choiruzain-latrobe/Assignment2.git


Make sure for **your case it is in Private**
## Access Database
1 **Plsql Cheat Sheet:**
You can refer to the PostgreSQL cheat sheet [here](https://www.postgresqltutorial.com/postgresql-cheat-sheet/).

2 **Know the Container ID:**
To find out the container ID, execute the following command:
   ```bash
   docker ps
    9958a3a534c9   testsystem-nginx           "/docker-entrypoint.…"   6 minutes ago   Up 6 minutes   0.0.0.0:80->80/tcp   testsystem-nginx-1
    53121618baa4   testsystem-frontend        "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   3000/tcp             testsystem-frontend-1
    c89e46ac94b0   testsystem-api             "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5000/tcp             testsystem-api-1
    9f4aea7cf538   postgres:15.3-alpine3.18   "docker-entrypoint.s…"   6 minutes ago   Up 6 minutes   5432/tcp             testsystem-db-1
   ```
3. Running the application

**docker compose command:**
   ```bash
   docker compose up --build
   ```

4 **Access postgreSQL in the container:**
Once you have the container ID, you can execute the container using the following command:
You will see the example of running the PostgreSQL inside the container.
   ```bash
   docker exec -it testsystem-db-1 psql -U postgres
   choiruzain@MacMarichoy TestSystem % docker exec -it testsystem-db-1 psql -U postgres                                       
   psql (15.3)
   Type "help" for help.
   
   postgres=# \dt
             List of relations
    Schema |   Name   | Type  |  Owner   
   --------+----------+-------+----------
    public | contacts | table | postgres
    public | phones   | table | postgres
   (2 rows)
  
    postgres=# select * from contacts;
    id |  name  |         createdAt         |         updatedAt         
   ----+--------+---------------------------+---------------------------
     1 | Helmut | 2024-08-08 11:57:57.88+00 | 2024-08-08 11:57:57.88+00
    (1 row)
    postgres=# select * from phones;
    id | phone_type |   number    | contactId |         createdAt          |         updatedAt          
   ----+------------+-------------+-----------+----------------------------+----------------------------
     1 | Work       | 081431      |         1 | 2024-08-08 11:59:04.386+00 | 2024-08-08 11:59:04.386+00


postgres=# select * from contacts;
   ```
Replace `container_ID` with the actual ID of the container you want to execute.

## Executing API

### Contact API


1. Add contacts API  (POST)
```bash
curl -X POST http://localhost/api/contacts
{"id":2,"name":null,"updatedAt":"2024-12-09T11:10:15.259Z","createdAt":"2024-12-09T11:10:15.259Z"}

```
2 Get contacts API  (GET)

```bash

A2-Sabrina-22081950 % curl -X GET http://localhost/api/contacts 
[{"id":1,"name":"Sabrina","createdAt":"2024-12-09T10:50:53.993Z","updatedAt":"2024-12-09T10:50:53.993Z"}]

```
3. Show/create the API commmand to delete the contacts (DELETE)

```bash

A2-Sabrina-22081950 % curl -X DELETE http://localhost/api/contacts/2
{"message":"Contact was deleted successfully!"}



```

4. Show/create the API command to edit the contacts (PUT)
```bash

A2-Sabrina-22081950 % curl -X POST http://localhost/api/contacts/ \-H "Content-Type: application/json" \-d '{"name": "Jane"}'    
{"id":4,"name":"Jane","updatedAt":"2024-12-09T11:14:36.427Z","createdAt":"2024-12-09T11:14:36.427Z"}

```

### Phone API

1. Add phon API  (POST)
```bash

A2-Sabrina-22081950 % curl -X POST http://localhost/api/contacts/1/phones \-H "Content-Type: application/json" \-d '{"name": "Work", "number": "555555555"}'

{"id":4,"name":"Work","number":"555555555","contactId":1,"updatedAt":"2024-12-09T11:26:39.879Z","createdAt":"2024-12-09T11:26:39.879Z"}

```
2 Get phone API  (GET)

```bash

A2-Sabrina-22081950 % curl -X GET http://localhost/api/contacts/1/phones
[{"id":3,"name":"Work","number":"555555555","contactId":1,"createdAt":"2024-12-09T11:23:47.404Z","updatedAt":"2024-12-09T11:24:36.360Z"}]


```
3. Show/create the API commmand to delete the phone (DELETE)

```bash

A2-Sabrina-22081950 % curl -X DELETE http://localhost/api/contacts/1/phones/2
{"message":"Phone was deleted successfully!"}


```

4. Show/create the API command to edit the phone (PUT)
```bash
A2-Sabrina-22081950 % curl -X PUT http://localhost/api/contacts/1/phones/3 \-H "Content-Type: application/json" \-d '{"name": "Work", "number": "555555555"}'       

{"message":"Phone was updated successfully."}


```