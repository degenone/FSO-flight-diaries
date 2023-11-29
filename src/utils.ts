import { NewDiaryEntry, Visibility, Weather } from './types';

const isString = (text: unknown): text is string =>
    typeof text === 'string' || text instanceof String;

const parseComment = (comment: unknown): string => {
    if (!comment || !isString(comment)) {
        throw new Error(`Unable to parse comment: ${comment}`);
    }
    return comment;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Unable to parse date: ${date}`);
    }
    return date;
};

const isWeather = (param: string): param is Weather =>
    Object.values(Weather)
        .map((w) => w.toString())
        .includes(param);

const parseWeather = (weather: unknown): Weather => {
    if (!weather || !isString(weather) || !isWeather(weather)) {
        throw new Error(`Unable to parse weather: ${weather}`);
    }
    return weather;
};

const isVisibility = (param: string): param is Visibility =>
    Object.values(Visibility)
        .map((v) => v.toString())
        .includes(param);

const parseVisibility = (visibility: unknown): Visibility => {
    if (!visibility || !isString(visibility) || !isVisibility(visibility)) {
        throw new Error(`Unable to parse visibility: ${visibility}`);
    }
    return visibility;
};

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (!('date' in object)) throw new Error('Missing "date" filed');
    if (!('weather' in object)) throw new Error('Missing "weather" filed');
    if (!('visibility' in object))
        throw new Error('Missing "visibility" filed');
    const newEntry: NewDiaryEntry = {
        date: parseDate(object.date),
        weather: parseWeather(object.weather),
        visibility: parseVisibility(object.visibility),
    };
    if ('comment' in object) {
        newEntry.comment = parseComment(object.comment);
    }
    return newEntry;
};
