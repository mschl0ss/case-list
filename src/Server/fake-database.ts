import {get, set, keys, createStore, getMany} from 'idb-keyval';
import {Case, CaseImage} from "../Utils/Types";

const caseStore = createStore("caseStore", "caseStore");
const caseImageStore = createStore("caseImageStore", "caseImageStore");

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

export const CaseImageRepository = {
    async save(caseImage: CaseImage): Promise<void> {
        return await set(caseImage.id, caseImage, caseImageStore)
    },
    async findMany(imageIds: string[]): Promise<CaseImage[]> {
        return await getMany(imageIds, caseImageStore)
    }
}