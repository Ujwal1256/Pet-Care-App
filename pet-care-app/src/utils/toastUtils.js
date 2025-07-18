import { toast } from 'react-toastify'

export const showSuccess = (message) => {
toast.success(message, {
    position: 'top-right',
    autoClose: 1000,
    className: 'bg-green-500 text-white font-bold',
})
}

export const showError = (message) => {
toast.error(message, {
    position: 'top-right',
    autoClose: 1000,
    className: 'bg-red-500 text-white font-bold',
})
}

export const showInfo = (message) => {
toast.info(message, {
    position: 'top-right',
    autoClose: 1000,
    className: 'bg-blue-500 text-white font-bold',
})
}
