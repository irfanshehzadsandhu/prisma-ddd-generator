---
to: App/HTTP/Bootstrap/app.ts
---
import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as logger from 'morgan';
import {createServer} from "http";
import {Server} from "socket.io";
import container from "../../Infrastructure/IocContainer/container";
import('../../Infrastructure/Database/Models');

<%for(let i=0;i<names.length;i++){-%>
<%- `import ${names[i]} from "../Routes/Api/V1/${names[i]}/${names[i]}";` %>
<% } -%>

const app = express();

app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 100000, extended: true}));
app.use(bodyParser.json());
app.use('/static', express.static(__dirname + '../../../../static'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(logger('dev'));

<%for(let i=0;i<names.length;i++){-%>
<%- `app.use('/api/v1', ${names[i]});` %>
<% } -%>

const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {origin: '*'}});

export {httpServer, io}