import { Storage } from 'ef.lms365';

export class LocalStorage implements Storage {
    private readonly _useSerialization: boolean;

    public constructor(useSerialization: boolean = false) {
        this._useSerialization = useSerialization;
    }

    public static setItem(key: string, data: string) {
        try {
            if (window.localStorage) {
                window.localStorage.setItem(key, data);
            }
        } catch (exception) {
            console.log(exception);
        }
    }

    public static getItem(key: string): string {
        try {
            return window.localStorage ? window.localStorage.getItem(key) : null;
        }
        catch (exception) {
            console.log(exception);

            return null;
        }
    }

    public get(key: string): any {
        const result = LocalStorage.getItem(key);

        try {
            return (result && this._useSerialization) ? JSON.parse(result) : result;
        } catch (error) {
            return null;
        }
    }

    public set(key: string, value: string) {
        const resultValue = value && this._useSerialization
            ? JSON.stringify(value)
            : value;

        LocalStorage.setItem(key, resultValue);
    }
}