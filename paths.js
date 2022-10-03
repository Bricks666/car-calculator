const path = require('path');

const root = __dirname;
const src = path.resolve(root, 'src');
const public = path.resolve(root, 'public');
const build = path.resolve(public, 'build');

module.exports = {
	root,
	src,
	public,
	build,
};
