To run the server

- Open a new terminal

```
cd ./server
npx json-server db.json
```

Then:

```
- cd ./client
- npx http-server -c 1
```

So

```
const response = await axios.get('http://localhost:3000/bugs');
const bugs = response.data;
console.table(bugs);

id  name                            isClosed    createdAt
2	'User access denied'	        false	    '2022-10-09T09:19:26.660Z'
3	'Application not responding'	false	    '2022-10-09T09:19:29.087Z'
4	'Data integrity checks failed'	false	    '2022-10-09T09:19:33.517Z'
5	'Test Bug'	                    false	    '2023-02-16T11:59:24.979Z'
Array(4)
```
