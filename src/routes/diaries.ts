import express from 'express';
import diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const diaryRouter = express.Router();

diaryRouter.get('/', (_req, res) => {
    res.json(diaryService.getNonSensitiveEntries());
});

diaryRouter.post('/', (req, res) => {
    try {
        const newEntry = toNewDiaryEntry(req.body);
        const addedEntry = diaryService.addEntry(newEntry);
        return res.json(addedEntry);
    } catch (error: unknown) {
        let errMsg = 'Error adding new diary entry.';
        if (error instanceof Error) {
            errMsg += ` Error: ${error.message}`;
        }
        return res.status(400).send(errMsg);
    }
});

diaryRouter.get('/:id', (req, res) => {
    const entry = diaryService.getEntryById(Number(req.params.id));
    if (entry) {
        res.json(entry);
    } else {
        res.status(404).end();
    }
});

export default diaryRouter;
