const fs = require('fs');
const flashcards = require('../flashcards.json');

const getAllCards = (req, res) => {
  res.json({ data: flashcards });
};
const getSingleCardById = (req, res) => {
  const id = req.params.id;
  const selectedCard = flashcards.find((card) => card.id == id);

  if (!selectedCard) {
    return res.status(404).json({
      message: 'No card found',
    });
  }

  res.json({
    card: selectedCard,
  });
};
const createCard = (req, res) => {
  // get the new card detail from the body
  const IdAndDateDetails = {
    id: (flashcards.length + 1).toString(),
    createdAt: new Date().toISOString(),
  };
  const newCard = Object.assign(req.body, IdAndDateDetails);

  // push them to the flashcards array
  flashcards.push(newCard);

  // rewrite the flashcard array using the fs package
  fs.writeFileSync('./flashcards.json', JSON.stringify(flashcards));

  res
    .status(201)
    .json({ message: 'Card added successfully', data: newCard });
};
const routeNotFount = (req, res) => {
  res
    .status(404)
    .json({ message: 'This route does not exist on this server' });
};

module.exports = {
  createCard,
  getAllCards,
  routeNotFount,
  getSingleCardById,
};
