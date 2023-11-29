import diaryData from '../../diaryentries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';


const getEntries = (): DiaryEntry[] => {
    return diaryData;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
    return diaryData.map(({ id, date, weather, visibility }) => ({ id, date, weather, visibility }));
};

const addEntry = () => {
    return null;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addEntry,
};
