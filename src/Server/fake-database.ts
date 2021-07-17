import { get, set, keys, createStore} from 'idb-keyval';
import {Case} from "../Utils/Types";

const caseStore = createStore("caseStore", "caseStore");

export const CaseRepository = {
    async save(caseToSave: Case): Promise<void> {
        return await set(caseToSave.id, caseToSave, caseStore)
    },
    async findById(id: string): Promise<Case | undefined> {
        return await get(id, caseStore);
    },
    async findAll(): Promise<Case[]> {
        const cases = (await keys(caseStore)).map(key =>
            get(key, caseStore)
        );
        return Promise.all(cases as Promise<Case>[])
    }
};