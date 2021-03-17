import express from 'express';
import Event from '../models/EventModel';

export const getEvents = async (req: express.Request, res = express.response) => {
    try {
        const events = await Event.find().populate('user', 'name');
        return res.json({
            ok: true,
            msg: 'Events',
            events
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error at get events',
            error
        });
    }
};

export const createEvent = async (req: express.Request, res = express.response) => {
    try {
        const event = new Event(req.body);
        event.user = req.body.uid;
        await event.save();
        res.status(201).json({
            ok: true,
            msg: 'event created',
            event
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'An error has occured at create event',
        });
    }
};

export const updateEvent = async (req: express.Request, res = express.response) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event not finded',
            });
        }

        if (event.user.toString() !== req.body.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User is not allowed to modify this event',
            });
        }

        const newEvent = {
            ...req.body,
            user: req.body.uid
        }
        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        return res.json({
            ok: true,
            msg: 'Event updated',
            event: eventUpdate
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error at update event',
        });
    }
};

export const deleteEvent = async (req: express.Request, res = express.response) => {
    const eventId = req.params.id;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(400).json({
                ok: false,
                msg: 'Event not finded',
            });
        }

        if (event.user.toString() !== req.body.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'User is not allowed to delete this event',
            });
        }

        const eventDeleted = await Event.findByIdAndDelete(eventId);
        return res.json({
            ok: true,
            msg: 'Event deleted',
            event: eventDeleted
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error at delete event',
            error
        });
    }
};

