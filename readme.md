### How to use asymmetric jwt for authentication and authorization

In this demo we have two servers one is auth server which is responsible for jwt token generation and signing and another is resource server that will use the jwt token issued by auth server for authorization of user.

#### To run auth_server

```
cd auth_server
npm i
generate public and private key pair
store the jwks in jwks.json
npm run dev
```

To generate private key

```
create a certs folder
cd certs
openssl genrsa -out private.pem 3072   // 3072 is keys bit size. 2048 can also be used
```

To generate public key of above private key

```
openssl rsa -in private.pem -pubout -out public.pem
```

To create json web key-set

```
node jwkpem.js  //store the generated key set in public/jwks.json folder under keys section
```

#### To run the resource server

```
cd resource_server
npm i
npm run dev

```
