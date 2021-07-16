import React, {useEffect, useState} from 'react';
import {Case} from "../../Utils/Types";
import {CaseRepository} from "../../Server/fake-database";

interface CaseStore {
    cases: Case[],
    saveCase: (caseToSave: Case) => Promise<void>
    // searchQuery: string,
}
export const CaseStoreContext = React.createContext<CaseStore>(null as unknown as CaseStore);

export function CaseStoreProvider(props: {children: React.ReactNode}): JSX.Element {
    const {children} = props;
    const [cases, setCases] = useState<Case[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>();

    useEffect(() => {
        async function getAllCases() {
            const allCases = await CaseRepository.findAll();
            setCases(allCases);
        }

        getAllCases();
    }, []);

    const saveCase = async (caseToSave: Case): Promise<void> => {
        await CaseRepository.save(caseToSave);
        const allCases = await CaseRepository.findAll();
        setCases(allCases);
        // setCases(cases.concat(caseToSave));
    }

    const caseStore: CaseStore = {
        cases,
        saveCase,
    }

    return(
        <CaseStoreContext.Provider value={caseStore}>
            {children}
        </CaseStoreContext.Provider>
    )
}