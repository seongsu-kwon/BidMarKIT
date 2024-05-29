import { FormControl, Grid, NativeSelect } from '@mui/material';
import React from 'react';
import SortList from 'constants/Sort';

export default function SortSelect(props) {
    const { setSearchSort } = props;
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
                    setSearchSort(e.target.value);
                }}
            >
                {SortList.map((sort) => (
                    <option value={sort.code}>{sort.name}</option>
                ))}
            </NativeSelect>
        </FormControl>
    );
}
