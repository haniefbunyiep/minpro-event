import {useMutation} from '@tanstack/react-query'
import axios from 'axios'

export const useCreateVoucherEventMutation = ({ onSuccess, onError }) => {
    const { mutate } = useMutation({
    mutationFn: async({name, code, stok, eventId, ticketId}) => {
        return await axios.post('http://localhost:8000/event-voucher/register',{
            name,
            code,
            stok,
            eventId,
            ticketId
        })
    },
    onSuccess,
    onError
    })
    return{
        mutate
    }
}