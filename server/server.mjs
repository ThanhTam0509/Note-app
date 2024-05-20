import express from 'express';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import { resolvers } from './resolvers/index.js';
import { typeDefs } from './schemas/index.js';

const app = express();
const httpServer = http.createServer(app);

// này là chỗ xử lý data để trả về cho client
// const resolvers

// GraphQL nắm 2 thg: resolver và schema

// schema: mô tả xem là data gồm những gì

// const typeDefs = `#graphql
// type Query { // truy vấn client, truy vấn dữ liệu
// name: String
// }
// type Mutation { // update hoặc delete
// }
// type Subscription { // phía client update dạng real-time
// }
// `;

// Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.b28tgtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const PORT = process.env.PORT || 4000;
const server = new ApolloServer({
	typeDefs,
	resolvers,
	plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// sửa đôi file thành mjs để chạy await mà k cần bỏ trong async
await server.start();

// cors dùng để k hiện lỗi lúc run server báo thiếu cors
app.use(cors(), bodyParser.json(), expressMiddleware(server));

mongoose.set('strictQuery', true);
mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(async () => {
		console.log('Connect to DB');
	});

// Lúc chạy thì port ngẫu nhiên chứ k có mặc định 4000 đâu
await new Promise((resolvers) => httpServer.listen({ port: PORT }, resolvers));
console.log('Server ready at http://localhost:4000');
