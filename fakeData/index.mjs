export default {
	author: [
		{
			id: 123,
			name: 'ThanhTam',
		},
	],
	folders: [
		{ id: '1', name: 'Folder A', createdAt: '2022-09-18T03:42:13Z', authorId: 123 },
		{ id: '2', name: 'Folder B', createdAt: '2022-11-09T03:42:13Z', authorId: 123 },
		{ id: '3', name: 'Folder C', createdAt: '2022-12-09T03:42:13Z', authorId: 300 },
		{ id: '4', name: 'Folder D', createdAt: '2023-11-05T03:42:13Z', authorId: 100 },
		{ id: '5', name: 'Folder E', createdAt: '2022-11-02T03:42:13Z', authorId: 200 },
	],
	notes: [
		{
			id: '123',
			content: '<p>Go to market</p>',
			folderId: '1',
		},
		{
			id: '1234',
			content: '<p>Go to market 2</p>',
			folderId: '2',
		},
		{
			id: '12345',
			content: '<p>Go to market 3</p>',
			folderId: '3',
		},
	],
};
