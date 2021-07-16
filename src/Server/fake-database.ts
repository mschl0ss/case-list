import { get, set, keys, createStore} from 'idb-keyval';
import { v4 as uuidv4 } from 'uuid'
import {Case} from "../Utils/Types";

const userStore = createStore("case-list-db", "user");
const imageStore = createStore("case-list-db", "image");
const caseStore = createStore("case-list-db", "case");

export const CaseRepository = {
    async save(caseToSave: Case): Promise<void> {
        const idToSave = caseToSave.id ? caseToSave.id : uuidv4();
        return await set(idToSave, caseToSave, caseStore)
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