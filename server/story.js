const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const storySchema = new mongoose.Schema({
	title: String,
	text: String,
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	paths: [
		{
			type: mongoose.Schema.ObjectId,
			ref: 'Story',
		},	
	],
});

const Story = mongoose.model('Story', storySchema);
//get all of a user's stories
/*
router.get('/', async (req, res) => {
	try {
		let stories = Story.find({
			user: req.user
		}).sort({
			created: -1,
		}).populate('user');
		return res.send(stories);
	} catch(error) {
		console.log(error);
		return res.sendStatus(500);
	}
});
*/

//get a single story
router.get('/:id', async (req, res) => {
	let id = req.params['id'];
	try {
		if (id === 'all') {
			let stories = await Story.find({
				user: req.user
			}).sort({
				created: -1,
			}).populate('user');
			return res.send(stories);
		} else {
			let story = await Story.findOne({
				_id: id,
			}).populate('user').populate('paths');
			return res.send(story);
		}
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

router.post('/', async (req, res) => {
	const story = new Story({
		user: req.user,
		text: req.body.text,
		title: req.body.title,
		paths: [],
	});
	try {
		await story.save();
		console.log(story);
		return res.send(story);
	} catch(error) {
		console.log(error);
		return res.sendStatus(500);
	}
});

router.put('/', async (req, res) => {
	try {
		await Story.updateOne(
			{_id: req.body.id}, 
			{'$set': {'title': req.body.title, 'text': req.body.text}},	
			{'upsert': false},
		);
		return res.sendStatus(200);
	} catch(error) {
		return res.sendStatus(500);
	}
});

router.put('/path', async(req, res) => {
	try {
		let updated = await Story.findOneAndUpdate(
			{_id: req.body.id, paths: {$ne: req.body.path}},
			{'$push': {'paths': req.body.path}},
			{new: true},
		).populate('paths');
		return res.send(updated);
	} catch(error) {
		return res.sendStatus(500);
	}
});
		
router.delete('/path', async(req, res) => {
	try {
		let updated = await Story.findOneAndUpdate(
			{_id: req.body.id},
			{'$pull': {'paths': {$in: [req.body.path]}}},
			{new: true},
		).populate('paths');
		console.log(updated);
		return res.send(updated);
	} catch(error) {
		return res.sendStatus(500);
	}
});


module.exports = {
	model: Story,
	routes: router,
}
