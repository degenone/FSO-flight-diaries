import diaryData from '../../diaryentries';
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
    return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaryData.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};

const getEntryById = (id: number): DiaryEntry | undefined => {
    const entry = diaryData.find((d) => d.id === id);
    return entry;
};

const addEntry = (entry: NewDiaryEntry): DiaryEntry => {
    const newEntry = {
        id: Math.max(...diaryData.map((d) => d.id)) + 1,
        ...entry,
    };
    diaryData.push(newEntry);
    return newEntry;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    getEntryById,
    addEntry,
};
