const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const Ideas = require('../models/Ideas')
const {body, validationResult} = require('express-validator')

//Get all the ideas
router.get('/fetchAllIdeas',fetchUser,  async (req,res)=>{
        try {
                const ideas = await Ideas.find({user : req.user.id})
                res.json(ideas)   
        } catch (error) {
                console.error(error.message);
                res.status(500).send('Internal Server error');   
        }
         
})


//GET total no. of ideas of a particular user
router.get('/getTotalIdeasCount', fetchUser, async (req, res) => {
    try {
      const totalIdeasCount = await Ideas.countDocuments({ user: req.user.id });
  
      res.json({ totalIdeasCount });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

//Add an idea
router.post('/addIdea', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be at least 5 characters in length').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, cover, amount, contact, ideasDesc } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const idea = new Ideas({
            title,
            description,
            cover,
            amount,
            contact,
            ideasDesc,
            user: req.user.id
        });
        const savedIdea = await idea.save();
        res.json(savedIdea);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error');
    }
});

//DELETE THE IDEA
router.delete('/deleteIdea/:id', fetchUser, [], async (req, res) => {
        
    
    try {
        // Find the note to be updated
        let idea = await Ideas.findById(req.params.id);
 
        if (!idea) {
            return res.status(404).send('Idea not found');
        }

        if (idea.user.toString() !== req.user.id) {
            return res.status(400).send('Not allowed'); 
        }

        // Delete the note
        idea = await Ideas.findByIdAndDelete(req.params.id);
        res.status(200).send('Idea has been deleted')
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server error');
    }
});

module.exports = router