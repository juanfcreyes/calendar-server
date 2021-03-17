import express from 'express';
import { check } from 'express-validator';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/events';
import { validateJWT } from '../middlewares/validate-jwt';
import { fieldsValidator } from '../middlewares/fields-validator';
import { isDate } from '../helpers/isDate';

const eventsRouter = express.Router();

eventsRouter.use(validateJWT);

eventsRouter.get('/', getEvents);

eventsRouter.post('/', [
    check('title', 'Title is required').notEmpty(),
    check('start', 'Start event time is required and it must be a valid Date').custom(isDate),
    check('end', 'End event time is required and it must be a valid Date').custom(isDate),
    fieldsValidator
], createEvent);

eventsRouter.put('/:id', updateEvent);

eventsRouter.delete('/:id', deleteEvent);

export default eventsRouter;
