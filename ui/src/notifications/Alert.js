//import React from 'react';
import Swal from 'sweetalert2'
//import { ToastMessage } from "react-toastr";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});

export const alertsFunctions = {
    showAlertWarning
}


function showAlertWarning(message) {
    Toast.fire({
        icon: 'warning',
        title: message
    })
}


