import { FormControl, Grid, NativeSelect } from '@mui/material';
import React from 'react';
import StateList from 'constants/State';

export default function StateSelect(props) {
    const { setSearchState } = props;
    return (
        <FormControl fullWidth>
            <NativeSelect
                inputProps={{
                    name: 'category',
                    id: 'uncontrolled-native',
                }}
                sx={{
                    mt: 2,
                    mb: 2,
                    // position: 'fixed',
                    // width: '70%',
                }}
                onChange={(e) => {
                    setSearchState(e.target.value);
                }}
            >
                {StateList.map((sort) => (
                    <option value={sort.code}>{sort.name}</option>
                ))}
                <option value="4">전체</option>
            </NativeSelect>
        </FormControl>
    );
}
