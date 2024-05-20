import fakeData from '../../fakeData/index.mjs';
import { FolderModel } from '../models/index.js';

//args từ client gửi lên server
export const resolvers = {
	Query: {
		folders: async () => {
			const folders = await FolderModel.find();
			console.log('folder', folders);
			return folders;
		},
		folder: async (parent, args) => {
			const folderId = args.folderId;
			console.log({ folderId });
			const foundFolder = await FolderModel.findOne({
				_id: folderId,
			});
			return foundFolder;
		},
		note: (parent, args) => {
			const noteId = args.noteId;
			return fakeData.notes.find((note) => note.id === noteId);
		},
	},
	Folder: {
		author: (parent, args) => {
			console.log({ parent, args });
			const authorID = parent.authorId;
			return fakeData.author.find((author) => author.id === authorID);
		},
		notes: (parent, args) => {
			return fakeData.notes.filter((note) => note.folderId === parent.id);
		},
	},
	Mutation: {
		addFolder: async (parent, args) => {
			const newFolder = new FolderModel({ ...args, authorId: '123' });
			console.log('newFolder', newFolder);
			await newFolder.save();
			return newFolder;
		},
	},
};
