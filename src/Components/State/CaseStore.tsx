import React, {useEffect, useState} from 'react';
import {Case, CaseStatus} from "../../Utils/Types";
import {CaseRepository} from "../../Server/fake-database";

interface CaseStore {
    cases: Case[],
    saveCase: (caseToSave: Case) => Promise<void>
    searchQuery: string | undefined,
    setSearchQuery: (newValue: string) => void,
    filters: CaseStatus[],
    setFilters: (caseStatus: CaseStatus, active: boolean) => void,
    clearFilters: () => void;
}
export const CaseStoreContext = React.createContext<CaseStore>(null as unknown as CaseStore);

export function CaseStoreProvider(props: {children: React.ReactNode}): JSX.Element {
    const {children} = props;
    const [cases, setCases] = useState<Case[]>([]);
    const [searchQuery, _setSearchQuery] = useState<string>();
    const [filters, _setFilters] = useState<CaseStatus[]>([])

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
    }

    const setSearchQuery = (newValue: string) => {
        _setSearchQuery(newValue);
    }

    const setFilters = (caseStatus: CaseStatus, active: boolean) => {
        if(active) {
            _setFilters(filters.concat(caseStatus))
        } else {
            _setFilters(filters.filter(filterStatus => filterStatus !== caseStatus))
        }
    }

    const clearFilters = () => {
        _setFilters([]);
    }
    const caseStore: CaseStore = {
        cases,
        saveCase,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        clearFilters
    }


    return(
        <CaseStoreContext.Provider value={caseStore}>
            {children}
        </CaseStoreContext.Provider>
    )
}