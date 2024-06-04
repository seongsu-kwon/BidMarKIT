import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import React, { useState } from 'react';

export default function Permission(props) {
    const { show, setShow } = props;

    const handlePermission = async () => {
        try {
            const permission = await Notification.requestPermission();

            console.log('permission', permission);

            setShow(false);
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    return (
        <Dialog open={show} onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">알림 허용</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
                <Button onClick={handlePermission}>허용</Button>
            </DialogActions>
        </Dialog>
    );
}
